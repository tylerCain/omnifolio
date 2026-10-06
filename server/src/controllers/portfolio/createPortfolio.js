import createPortfolio from '../../services/portfolio/createPortfolio.js'

export const postPortfolio = async (req) => {
  const portfolioId = await createPortfolio(
    req.auth.payload.sub,
    req.body.name ?? 'My portfolio',
    req.auth.payload
  )

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
