import px from 'utils/style/px'
import when from 'utils/style/when'

const theme = {
  component: {},
  color: {
    typography: {
      title: '#ff9190',
      text: '#0b0742',
      gray: '#0B07424D',
      placeholder: 'rgba(11,7,66,0.3)',
    },
    link: {
      primaryPrimary: '#5e72eb',
      primaryActive: '#99a4e3',
      primaryHover: '#8a9dfd',
      primaryVisited: '#5364b8',

      secondaryPrimary: '#84839e',
      secondaryActive: '#afafb6',
      secondaryHover: '#9c9abd',
      secondaryVisited: '#72728e',

      whitePrimary: '#FFFFFF',
      whiteHover: '#ececec',
      whiteActive: '#d4d4d4',
      whiteVisited: '#FFFFFF',
    },
    card: {
      background: '#FFFFFF;',
      default: '#5E72EB;',
      success: '#5DC499;',
      error: '#fe504f;',
      shadow: '#0B074233;',
      title: '#FFFFFF;',
    },
    NavLink: {
      activeLine: '#5E72EB',
      hoverLine: '#EAEAEA',
    },
    processBar: {
      color: '#5E72EB',
      inner: '#ffffff',
      text: '#0b0742',
    },
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
    radio: {
      on: '#5E72EB',
      off: '#010101',
    },
    modal: {
      border: '#5E72EB',
      bg: 'rgba(11, 7, 65, 0.9)',
    },
  },
  px,
  when,
}

export default theme
