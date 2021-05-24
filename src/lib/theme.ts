import px from 'utils/style/px'
import when from 'utils/style/when'

const theme = {
  component: {},
  color: {
    typography: {
      title: '#ff9190',
      text: '#0B0742',
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
  },
  px,
  when,
}

export default theme
