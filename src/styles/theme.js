// src/styles/theme.js
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const green        = '#00AA86'
export const red          = '#D32F2F'
export const darkRed      = '#C1272D'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'
export const khaki        = '#748964'
export const darkerGrey   = '#444444'
export const buttonColor  = '#555555'
export const blue         = '#4857af'

// Palette
export const palette = {
  primary1Color: blue,
  primary2Color: green,
  primary3Color: green,
  accent1Color: green,
  textColor: darkerGrey,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
