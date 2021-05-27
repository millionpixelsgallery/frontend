/* eslint-disable */
import * as Yup from 'yup'
import { useMemo } from 'react'
import { ObjectShape } from 'yup/lib/object'

export const formErrors = {
  INVALID_IMAGE_FORMAT: 'UNABLE TO UPLOAD the image - THIS FILE ISn’t COMPATIBLE:',
}

interface StringParams {
  trim?: boolean
  max?: number
}

export type SchemaBuilder = typeof schemaBuilder
const schemaBuilder = {
  ...Yup,
  string({ trim = true, max }: StringParams = {}) {
    let schema = Yup.string()
    if (trim) schema = schema.trim()
    if (max) schema = schema.max(max)

    return schema
  },
  varchar(params: StringParams) {
    return this.string({
      max: 255,
      ...params,
    })
  },
}

export default function useValidationSchema(
  schemaCreator: (yup: SchemaBuilder, errors: typeof formErrors) => ObjectShape,
  deps: any[] = []
) {
  return useMemo(() => Yup.object(schemaCreator(schemaBuilder, formErrors)), deps)
}
