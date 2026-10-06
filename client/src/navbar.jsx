import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import logo from './_content/omnifoliologo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const pages = [{ name: 'Home', link: '/' }, { name: 'Portfolio', link: 'portfolio' },  { name: 'About', link: 'about' },  { name: 'Pricing', link: 'pricing' }]

const Navbar = () => {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <AppBar position="sticky" sx={{ height: 70, backgroundColor: 'primary.dark', borderBottom: '3px solid', borderColor: 'primary.main' }}>
      <Toolbar>
        <Box display="flex" width={1}>
          <Button
            aria-label="Omnifolio home"
            sx={{ height: 70, minWidth: 0, ml: { xs: 1, md: 3 }, mr: 2, p: 0 }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src={logo}
              alt="Omnifolio"
              sx={{ display: 'block', width: 150, height: 64, objectFit: 'contain' }}
            />
          </Button>
          <Box sx={{ flexGrow: 1, width: '50%', display: { xs: 'none', md: 'flex' }, justifyItems: 'center' }}>
            {pages.map(({ name, link }) => (
              <Button
                key={name}
                onClick={() => navigate(link)}
                sx={{ my: 2, px: 5, color: 'primary.light', display: 'block', fontWeight: 700 }}
              >
                {name}
              </Button>
            ))}
            {isAuthenticated ? (
              <>
                <Typography sx={{ my: 2, ml: 'auto', px: 2, color: 'primary.light', fontWeight: 700 }}>
                  {user?.email}
                </Typography>
                <Button
                  onClick={() => logout({ logoutParams: { returnTo: `${window.location.origin}/` } })}
                  sx={{ my: 2, color: 'primary.light', fontWeight: 700 }}
                >
                  LOG OUT
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={isLoading}
                  onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}
                  sx={{ my: 2, ml: 'auto', px: 2, color: 'primary.light', fontWeight: 700 }}
                >
                  SIGN UP
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => loginWithRedirect()}
                  sx={{ my: 2, color: 'primary.light', fontWeight: 700 }}
                >
                  LOG IN
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
