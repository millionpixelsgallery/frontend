import { CSSProperties } from 'react'
import px from 'utils/style/px'
import { omitBy } from 'lodash-es'

type Value = number | string
type PartialIndents = Partial<
  Pick<
    CSSProperties,
    | 'margin'
    | 'marginTop'
    | 'marginRight'
    | 'marginBottom'
    | 'marginLeft'
    | 'padding'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingBottom'
    | 'paddingLeft'
  >
>

const indentsCache = new Map<string, PartialIndents>()
function indents<T extends 'margin' | 'padding'>(
  type: T,
  top?: Value,
  right?: Value,
  bottom?: Value,
  left?: Value
): PartialIndents {
  const cacheKey = Array.prototype.join.call(arguments, ' ')
  if (indentsCache.has(cacheKey)) return indentsCache.get(cacheKey)!

  let result: PartialIndents | undefined
  if (arguments.length === 2 && top != undefined) {
    result = { [type]: px(top) }
  } else if (arguments.length === 3 && top != undefined && right != undefined) {
    result = { [type]: `${px(top)} ${px(right)}` }
  } else if (
    arguments.length === 4 &&
    top != undefined &&
    right != undefined &&
    bottom != undefined
  ) {
    result = { [type]: `${px(top)} ${px(right)} ${px(bottom)}` }
  } else {
    const indents = [top, right, bottom, left]

    if (indents.some((value) => value == undefined)) {
      result = omitBy(
        {
          [`${type}Top`]: top && px(top),
          [`${type}Right`]: right && px(right),
          [`${type}Bottom`]: bottom && px(bottom),
          [`${type}Left`]: left && px(left),
        },
        (value) => value == undefined
      )
    } else {
      result = {
        [type]: indents.map((value) => px(value!)).join(' '),
      }
    }
  }

  indentsCache.set(cacheKey, result)
  return result
}

/**
 * React padding helper generates memoized CSSProperties object
 * receive up to 4 arguments
 * when no 'undefined' provided it has behaviour similar to css and return obj with 'padding' prop
 * when 'undefined' provided it will set paddings separated (obj with paddingTop, paddingLeft ...)
 */
function padding(all: Value): Pick<CSSProperties, 'padding'>
function padding(topBottom: Value, rightLeft: Value): Pick<CSSProperties, 'padding'>
function padding(top: Value, rightLeft: Value, bottom: Value): Pick<CSSProperties, 'padding'>
function padding(
  top: Value,
  right: Value,
  bottom: Value,
  left: Value
): Pick<CSSProperties, 'padding'>
function padding(
  top?: Value,
  right?: Value,
  bottom?: Value,
  left?: Value
): Partial<Pick<CSSProperties, 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'>>
function padding(
  ...args: Array<Value | undefined>
): Partial<
  Pick<CSSProperties, 'padding' | 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'>
> {
  return indents('padding', ...args)
}

/**
 * See padding doc
 */
function margin(all: Value): Pick<CSSProperties, 'margin'>
function margin(topBottom: Value, rightLeft: Value): Pick<CSSProperties, 'margin'>
function margin(top: Value, rightLeft: Value, bottom: Value): Pick<CSSProperties, 'margin'>
function margin(top: Value, right: Value, bottom: Value, left: Value): Pick<CSSProperties, 'margin'>
function margin(
  top?: Value,
  right?: Value,
  bottom?: Value,
  left?: Value
): Partial<Pick<CSSProperties, 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'>>
function margin(
  ...args: Array<Value | undefined>
): Partial<
  Pick<CSSProperties, 'margin' | 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'>
> {
  return indents('margin', ...args)
}

const paddingTop = (top: Value) => padding(top, undefined)
const paddingRight = (right: Value) => padding(undefined, right)
const paddingBottom = (bottom: Value) => padding(undefined, undefined, bottom)
const paddingLeft = (left: Value) => padding(undefined, undefined, undefined, left)
const marginTop = (top: Value) => margin(top, undefined)
const marginRight = (right: Value) => margin(undefined, right)
const marginBottom = (bottom: Value) => margin(undefined, undefined, bottom)
const marginLeft = (left: Value) => margin(undefined, undefined, undefined, left)

export {
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}
