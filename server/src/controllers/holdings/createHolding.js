import createHolding from '../../services/holding/createHolding.js'

export const postHolding = async (req) => {
  const { portfolioId, coinId, amount, purchasePrice } = req.body

  const holdingId = await createHolding(portfolioId, coinId, amount, purchasePrice)

  if (holdingId) {
    return {
      status: 201,
      body: { holdingId },
    }
  }
  return {
    status: 400,
  }
}

