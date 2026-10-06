import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#203B56',
      dark: '#172C42',
      light: '#DCECEF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#315F82',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F6F9FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D2935',
      secondary: '#627181',
    },
    divider: '#D8E0E7',
    success: {
      main: '#18794E',
    },
    error: {
      main: '#B93835',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
})

export default theme
