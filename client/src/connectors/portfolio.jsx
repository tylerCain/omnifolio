import { useMutation, useQuery } from 'react-query'

const queryPortfolio = async ({ queryKey }) => {
  const [, portfolioId] = queryKey
  const coins = await fetch(`http://localhost:5000/api/portfolio/${portfolioId}`)
  if (!coins.ok) {
    throw new Error('Network response not ok')
  }
  return coins.json()
}

const editHolding = async (holding) => {
  const response = await fetch(`http://localhost:5000/api/holding`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(holding)
  })

  if (!response.ok) {
    throw new Error('Network response not ok')
  }
}

export const usePortfolio = portfolioId => useQuery(['portfolio', portfolioId], queryPortfolio)

export const useEditHolding = holding => useMutation(editHolding, holding)
