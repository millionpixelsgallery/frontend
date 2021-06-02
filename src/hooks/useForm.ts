/* eslint-disable */
import {
  FormikConfig,
  FormikErrors,
  FormikHandlers,
  FormikHelpers,
  FormikState,
  useFormik,
} from 'formik'
import { FormikComputedProps, FormikValues } from 'formik/dist/types'
import useFormErrorGetter from 'hooks/useFormErrorGetter'
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useWindowListener from 'hooks/useWindowListener'
import { get } from 'lodash-es'
import useLink from 'hooks/useLink'

export type FormType<Values> = FormikState<Values> &
  FormikHelpers<Values> &
  FormikComputedProps<Values> &
  FormikHandlers & {
    getError: (name: keyof Values) => FormikErrors<Values>[keyof Values]
    processing: boolean
    submitError: Error | undefined
  }

export type FormSubType<Values> = FormikState<Values> &
  Omit<FormikHelpers<Values>, 'setValues' | 'resetForm' | 'setFormikState'> &
  FormikHandlers & {
    getError: (name: keyof Values) => any
    processing: boolean
    submitError: Error | undefined
  }

interface AutosaveSettings<Values extends FormikValues = FormikValues> {
  delay?: number
  customDelays?: {
    [p in keyof Values]?: number
  }
  ignore?: Array<keyof Values>
}

export default function useForm<Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values> & { autosave?: boolean | number | AutosaveSettings }
): FormType<Values> {
  const [submitError, setSubmitError] = useState<Error>()
  const formik = useFormik<Values>({
    ...config,
    onSubmit: useCallback(
      async (...args: Parameters<typeof config.onSubmit>) => {
        try {
          await config.onSubmit(...args)
          if (submitError) setSubmitError(undefined)
        } catch (e) {
          console.error(e)
          setSubmitError(e)
        }
      },
      [config.onSubmit, submitError]
    ),
  })

  const autosave = useAutosaveSettings(config.autosave)
  if (autosave) {
    const timerRef = useRef<any>()
    const formikRef = useLink(formik)

    formik.submitForm = useSubmitQueue(formikRef)
    formik.setFieldValue = useAutosaveCallback(
      formik.setFieldValue,
      timerRef,
      formikRef,
      autosave,
      true
    )
    formik.handleChange = useAutosaveCallback(formik.handleChange, timerRef, formikRef, autosave)
    formik.setValues = useAutosaveCallback(formik.setValues, timerRef, formikRef, autosave)

    useEffect(
      () => () => {
        clearTimeout(timerRef.current)
        if (timerRef.current != null) formikRef.current.submitForm()
      },
      []
    )

    useWindowListener('beforeunload', () => {
      clearTimeout(timerRef.current)
      if (timerRef.current != null) formikRef.current.submitForm()
    })
  }

  return {
    ...formik, // formik always creates a new object so no need memo here
    getError: useFormErrorGetter<Values>(formik),
    processing: !formik.isValidating && formik.isSubmitting,
    submitError,
  }
}

function useAutosaveSettings(
  autosave?: boolean | number | AutosaveSettings
): AutosaveSettings | undefined {
  return useMemo(() => {
    if (!autosave) return undefined

    const defaultAutosave = {
      delay: 3000,
    }
    if (typeof autosave === 'object') {
      return {
        ...defaultAutosave,
        ...autosave,
      }
    } else {
      return {
        delay: typeof autosave === 'boolean' ? defaultAutosave.delay : autosave,
      }
    }
  }, [])
}

function useSubmitQueue({ current: formik }: MutableRefObject<FormikHelpers<any>>) {
  const submitFormCbRef = useLink(formik.submitForm)
  const submittingRef = useRef(false)
  const submitQueueRef: MutableRefObject<
    Array<{ resolve: (value: any) => void; reject: (err: any) => void }>
  > = useRef([])

  return useCallback(async () => {
    if (submittingRef.current) {
      return new Promise<ReturnType<typeof submitFormCbRef.current>>((resolve, reject) =>
        submitQueueRef.current.push({ resolve, reject })
      )
    } else {
      submittingRef.current = true
      return submitFormCbRef.current().finally(handleSubmitQueue)
    }

    function handleSubmitQueue() {
      if (submitQueueRef.current.length) {
        const queue = submitQueueRef.current
        submitQueueRef.current = []
        submitFormCbRef
          .current()
          .then(
            (result) => queue.forEach(({ resolve }) => resolve(result)),
            (err) => queue.forEach(({ reject }) => reject(err))
          )
          .finally(handleSubmitQueue)
      } else {
        submittingRef.current = false
      }
    }
  }, [formik.submitForm])
}

function useAutosaveCallback(
  func: Function,
  timerRef: MutableRefObject<any>,
  formikRef: MutableRefObject<FormikHelpers<any>>,
  autosave: AutosaveSettings,
  checkCustom?: boolean
) {
  return useCallback(
    function (this: any, ...args: any[]) {
      if (autosave.ignore) {
        const name: string | undefined =
          typeof args[0] === 'string' ? args[0] : get(args, '0.currentTarget.name')
        if (name && autosave.ignore.includes(name)) return func.apply(this, args) // return here if ignored
      }

      clearTimeout(timerRef.current)
      const result = func.apply(this, args)
      timerRef.current = setTimeout(
        () => {
          timerRef.current = null
          formikRef.current.submitForm()
        },
        checkCustom ? get(autosave, `customDelays.${args[0]}`, autosave.delay) : autosave.delay
      )

      return result
    },
    [func, autosave]
  )
}
