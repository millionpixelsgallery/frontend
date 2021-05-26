function between(value: number, min: number): number
function between(value: number, min: undefined, max: number): number
function between(value: number, min: number, max: number): number
function between(value: number, min?: number, max?: number): number {
  if (min !== undefined && max !== undefined) {
    return Math.min(Math.max(value, min), max)
  } else if (min !== undefined) {
    return Math.max(value, min)
  } else {
    return Math.min(value, max!)
  }
}

export { between }

export function roundBy(value: number, multipleBy = 1) {
  if (multipleBy === 1) return Math.round(value)

  return Math.round(value / multipleBy) * multipleBy
}
