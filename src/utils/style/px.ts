export default function px(value: number | string | undefined) {
  return typeof value === 'number' ? value + 'px' : value
}
