import { round } from 'lodash-es'

export default function pxToRem(value: number) {
  return round(value / 16, 4) + 'rem'
}
