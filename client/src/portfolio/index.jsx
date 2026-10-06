import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { usePortfolio } from '../connectors/portfolio'
import Holdings from './holdings'
import UpdateHolding from './addToHolding'

const Portfolio = () => {
  const [view, setView] = useState('')
  const portfolio = usePortfolio()

  if (!portfolio.isSuccess) return null

  const holdings = portfolio.data.holdings

  const coinIds = []
  if (coinIds.length === 0) holdings?.map(holding => coinIds.push(holding.coinId))

  console.log('CoinIds: ', coinIds)
  
  return (
    <>
      <Box width={1}>
        <Box width={0.67} height={1} display="flex" flexDirection="column" mx="auto" sx={{ padding: '12px' }}>
          <Holdings holdings={holdings} coinIds={coinIds} setView={setView}/>
          {//coinIds.includes(view) && (
            
          }
          {/*<Box width={0.33} height={1} display="flex" flexDirection="column" mx="auto" sx={{ backgroundColor: 'white', color: '#8b0000', mt: 1, padding: '12px' }}>
            <UpdateHolding holdings={holdings} setView={setView} view={view} />
        </Box>*/}
        </Box>
      </Box>
    </>
  )
}

export default Portfolio
