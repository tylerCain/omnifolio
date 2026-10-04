import React from 'react'
import { Box, Card, CardActionArea, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography } from '@mui/material'
import { useCoins } from './connectors/coins'
import backgroundImage from './backgroundImage.png'

const Homepage = () => {
  const coins = useCoins()

  if (!coins.isSuccess) return null

  console.log(coins.data)

  const formatNumber = number => new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number)

  const checkMarketCap = coin => coin.market_cap > 0 ? coin.market_cap : coin.fully_diluted_valuation

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          height: '420px',
          marginX: 5,
          justifyContent: 'center',
          pX: 5,
          mt: 5
        }}
      > 
        <Box width={0.8} sx={{ pl: 25}}>
          <Typography variant="h2" sx={{ fontFamily: 'copperplate', color: 'white', fontWeight: 700 }}>The world's simplest crypto portfolio manager</Typography>
          <Typography variant="h4" sx={{ fontFamily: 'copperplate', color: 'white', fontWeight: 700 }}>Add the total amount of all your crypto coins without having to add individual transactions!</Typography>
        </Box>
      </Box>
      <Box width={0.8} sx={{ flexGrow: 1, mx: 'auto', pb: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mb: 8}}>
          <Grid item xs={2} sm={4} md={4} key={0}>
            <Card sx={{ pb: 2, border: '2px solid #274472' }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ color: '#274472' }}>
                    Simplicity
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#274472' }}>
                    All that is needed: the amount you own, and the purchase price
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={1}>
            <Card sx={{ pb: 2, border: '2px solid #274472' }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ color: '#274472' }}>
                    No need for transactions
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#274472' }}>
                    Other portfolio managers require separate transactions inputted which is inefficient to users.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={2}>
            <Card sx={{ pb: 2, border: '2px solid #274472' }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ color: '#274472' }}>
                    Efficiency
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#274472' }}>
                    Track the value of your whole portfolio in one place no matter where you are.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <TableContainer sx={{ width: '50%', mx: 'auto' }} component={Paper}>
          <Table sx={{ border: '2px solid #274472'}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: '8px 0px 8px', width: '8%' }} />
                <TableCell sx={{ padding: '8px 0px 8px', width: '12%' }}>Coin</TableCell>
                <TableCell sx={{ padding: '8px 0px 8px', width: '14%' }}>Price</TableCell>
                <TableCell sx={{ padding: '8px 0px 8px', width: '12%' }}>Cap</TableCell>
                <TableCell sx={{ padding: '8px 0px 8px', width: '8%' }}>24H&nbsp;(%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins?.data?.map((coin, index) => (
                <TableRow
                  key={coin.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 4 }}
                >
                  <TableCell sx={{ padding: '0px 4px 4px 8px', width: '8%' }}>
                      #{index+1}
                        <img src={coin.image} alt={coin.symbol} height='24px' width='24px' />
                   </TableCell>
                  <TableCell sx={{ padding: '0px 4px 4px 0px' }}>
                    {coin.symbol}
                  </TableCell>
                  <TableCell sx={{ padding: '0px 4px 4px 0px' }}>{coin.current_price}</TableCell>
                  <TableCell sx={{ padding: '0px 4px 4px 0px' }}>{formatNumber(checkMarketCap(coin))}</TableCell>
                  <TableCell sx={{ padding: '0px 4px 4px 0px' }}>{formatNumber(coin.price_change_percentage_24h)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Homepage
