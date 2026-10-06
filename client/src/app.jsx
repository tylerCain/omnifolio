import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Layout from './layout'
import theme from './theme'

const queryClient = new QueryClient({})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />

      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
)

export default App
