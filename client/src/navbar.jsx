import React from 'react'
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import logo from './image.png'
import { useNavigate } from 'react-router-dom'

const pages = [{ name: 'home', link: '/' }, { name: 'portfolio', link: 'portfolio' }]

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="sticky" sx={{ height: 70, backgroundColor: '#C3E0E5', borderBottom: '3px solid #274472' }}>
      <Toolbar>
        <Box display="flex" width={1}>
          <Button 
            sx={{ height: 70, ml: 8.2, pl: 2, mr: 2 }}
            startIcon={<Avatar sx={{ margin: 'none', height: '60px', width: '60px'}} src={logo} />}
            onClick={() => navigate('/')}
          />
          <Box sx={{ flexGrow: 1, width: '50%', display: { xs: 'none', md: 'flex' }, justifyItems: 'center' }}>
            {pages.map(({ name, link }) => (
              <Button
                key={name}
                onClick={() => navigate(link)}
                sx={{ my: 2, px: 5, color: '#5885AF', display: 'block', fontWeight: 700 }}
              >
                {name}
              </Button>
            ))}
            <Button
              key='login'
              onClick={() => navigate('/login')}
              sx={{ my: 2, ml: '53%', color: '#5885AF', fontWeight: 700 }}
            >
              LOG IN
            </Button> 
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
