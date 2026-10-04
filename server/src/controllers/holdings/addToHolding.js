import addToHolding from '../../services/holding/addToHolding.js'

export const putHolding = async (req) => {
  console.log('PUT HOLDING', req.body)
  const { portfolioId, coinId, amount, purchasePrice } = req.body

  const holdingId = await addToHolding(portfolioId, coinId, amount, purchasePrice)

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

