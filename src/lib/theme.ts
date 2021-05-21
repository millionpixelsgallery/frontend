import px from 'utils/style/px'
import when from 'utils/style/when'
import pxToRem from 'utils/style/pxToRem'

const theme = {
  component: {
    NavLink: {
      activeLine: '#5E72EB',
      hoverLine: '#8d9cea',
    },
  },
  color: {
    button: {
      default: {
        text: '#FFFFFF',
        bg: 'transparent linear-gradient(114deg, #FF9190 0%, #5E72EB 100%) 0% 0% no-repeat padding-box',
        disabledBg: '#0B0742',
      },
      outlined: {
        text: '#5e72eb',
        border: '#5E72EB',
      },
      outlined_orange: {
        text: '#FF9190',
        border: '#FF9190',
      },
      underline: {
        text: '#FF9190',
      },
    },
  },
  px,
  pxToRem,
  when,
}

export default theme
