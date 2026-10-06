import React from 'react'
import { Box } from '@mui/material'
import Navbar from './navbar'
import Routes from './routes'

const Layout = () => (
  <div className="app">
    <Box
      width={1}
      sx={{
        backgroundImage: 'linear-gradient(to bottom right, #274472, #C3E0E5, #5885AF)',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <div className="body">
        <Routes />
      </div>
    </Box>
  </div>
)

export default Layout
