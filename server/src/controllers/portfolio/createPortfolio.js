import createPortfolio from '../../services/portfolio/createPortfolio.js'

export const postPortfolio = async (req) => {
  const { userId } = req.body

  const portfolioId = await createPortfolio(userId)

  if (portfolioId) {
    return {
      status: 201,
      body: { portfolioId },
    }
  }
  return {
    status: 400,
  }
}