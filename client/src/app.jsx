import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from './layout'

const queryClient = new QueryClient({})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CssBaseline />
      <Layout />

    </BrowserRouter>
  </QueryClientProvider>
)

export default App
