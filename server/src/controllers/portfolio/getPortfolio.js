import getPortfolio, { getOrCreateUserPortfolio } from '../../services/portfolio/getPortfolio.js'

export const returnPortfolio = async (req) => {
  const { portfolioId } = req.params
  const auth0Sub = req.auth.payload.sub
  const profile = req.auth.payload
  const portfolio = portfolioId
    ? await getPortfolio(portfolioId, auth0Sub)
    : await getOrCreateUserPortfolio(auth0Sub, profile)

  if (portfolio) {
    return {
      status: 200,
      body: portfolio,
    }
  }
  return { status: 404, body: { error: 'Portfolio not found' } }
}
