/* eslint-disable */
import { FormikErrors, FormikState } from 'formik'
import { useCallback } from 'react'
import { get } from 'lodash-es'

type FormikErrorState<T> = Pick<FormikState<T>, 'errors' | 'touched'>
export type FormErrorGetter = (name: any) => any

export function getError<T>(f: FormikErrorState<T>, name: keyof T): FormikErrors<T>[keyof T] {
  return ensureErrorValue(get(f.touched, name) && get(f.errors, name))
}

function ensureErrorValue(error?: string | object): any {
  if (error && typeof error === 'object') {
    return ensureErrorValue(Object.values(error).filter(Boolean)[0])
  }
  return error
}

export default function useFormErrorGetter<T>(f: FormikErrorState<T>) {
  return useCallback((name: keyof T) => getError(f, name), [f.errors, f.touched])
}
