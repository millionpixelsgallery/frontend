import { createNumberMask } from 'text-mask-addons'

export const maskDecimal18 = createNumberMask({
  prefix: '',
  allowDecimal: true,
  decimalLimit: 18,
})
