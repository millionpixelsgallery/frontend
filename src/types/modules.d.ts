import theme from 'lib/theme'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

declare module 'text-mask-addons' {
  export interface MaskSettings {
    /** what to display before the amount. Defaults to '$'. */
    prefix?: string
    /** what to display after the amount. Defaults to empty string. */
    suffix?: string
    /** whether or not to separate thousands. Defaults to to true. */
    includeThousandsSeparator?: boolean
    /**  character with which to separate thousands. Default to ','. */
    thousandsSeparatorSymbol?: string
    /** whether or not to allow the user to enter a fraction with the amount. Default to false. */
    allowDecimal?: boolean
    /** character that will act as a decimal point. Defaults to '.' */
    decimalSymbol?: string
    /** how many digits to allow after the decimal. Defaults to 2 */
    decimalLimit?: number
    /** limit the length of the integer number. Defaults to null for unlimited */
    integerLimit?: number | null
    /** whether or not to always include a decimal point and placeholder for decimal digits after the integer. Defaults to false. */
    requireDecimal?: boolean
    /**  whether or not to allow negative numbers. Defaults to false */
    allowNegative?: booleanboolean
    /** whether or not to allow leading zeroes. Defaults to false */
    allowLeadingZeroes?: booleanboolean
  }

  export function createNumberMask(settings: MaskSettings): (value: string) => RegExp[]
}
