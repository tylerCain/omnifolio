import { useQuery } from 'react-query'

const queryCoins = async () => {
  const coins = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  if (!coins.ok) {
    throw new Error('Network response not ok')
  }
  return coins.json()
}

const queryPortfolioCoins = async ({ queryKey }) => {
  const [, ids ] = queryKey
  const coins = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&ids=${ids}`)
  if (!coins.ok) {
    throw new Error('Network response not ok')
  }
  return coins.json()
}

const queryPortfolioPrices = async ({ queryKey }) => {
  const [, ids ] = queryKey
  const coins = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=gbp&ids=${ids}&include_market_cap=true`)
  if (!coins.ok) {
    throw new Error('Network response not ok')
  }
  return coins.json()
}

export const useCoins = () => useQuery([], queryCoins)
export const usePortolioPrices = ids => useQuery(['portfolio-prices', ids], queryPortfolioPrices)
export const usePortolioInfo = ids => useQuery(['portfolio-info', ids], queryPortfolioCoins)
