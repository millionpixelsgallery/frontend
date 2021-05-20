type Maybe<T> = T | undefined
type MaybeNull<T> = Maybe<T | null>
type MaybeArray<T> = T | T[]
type MaybePromise<T> = T | Promise<T>
type ArrayType<A> = A extends Iterable<infer T> ? T : never
type Ensure<T> = Exclude<T, undefined>

// prettier-ignore
type RequiredDeep<T> = {
  [P in keyof T]-?:
    T[P] extends (infer U)[] ? RequiredDeep<U>[] :
    T[P] extends object ? RequiredDeep<T[P]> :
    T[P]
}

// prettier-ignore
type PartialDeep<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RequiredDeep<U>[] :
    T[P] extends object ? RequiredDeep<T[P]> :
    T[P]
}

interface FormikEvents<V> {
  /** you could pass f.setFieldValue here to simplify change handling */
  onValueChange?: (name: string, value: V) => void
  /** you could pass f.setFieldTouched here to simplify change handling */
  onTouchedChange?: (name: string) => void
}
