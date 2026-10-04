import getPortfolio from '../../services/portfolio/getPortfolio.js'

export const returnPortfolio = async (req) => {
  const { portfolioId } = req.params

  console.log(req)

  const holdings = await getPortfolio(portfolioId)

  if (holdings) {
    return {
      status: 200,
      body: { holdings },
    }
  }
  return {
    status: 400,
  }
}