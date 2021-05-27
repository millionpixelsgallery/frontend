import { createGlobalStyle } from 'styled-components'
import './font.css'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  * {
    box-sizing: border-box;
  }
  
  body, input, label {
    font-family: 'Oswald', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .text {
    &-left {
      text-align: left;
    }
    &-center {
      text-align: center;
    }
    &-right {
      text-align: right;
    }
  }
  .overflow {
    &-anywhere {
      overflow-wrap: anywhere;
    }
  }
`
