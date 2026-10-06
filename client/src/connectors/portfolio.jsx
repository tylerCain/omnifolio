import { useMutation, useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'

const queryPortfolio = async (getAccessTokenSilently) => {
  const accessToken = await getAccessTokenSilently()
  const response = await fetch('http://localhost:5000/api/portfolio', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) {
    throw new Error('Network response not ok')
  }
  return response.json()
}

const editHolding = async (holding, getAccessTokenSilently) => {
  const accessToken = await getAccessTokenSilently()
  const response = await fetch(`http://localhost:5000/api/holding`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(holding)
  })

  if (!response.ok) {
    throw new Error('Network response not ok')
  }
}

export const usePortfolio = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery(['portfolio'], () => queryPortfolio(getAccessTokenSilently), { enabled: isAuthenticated })
}

export const useEditHolding = options => {
  const { getAccessTokenSilently } = useAuth0()
  return useMutation(holding => editHolding(holding, getAccessTokenSilently), options)
}
