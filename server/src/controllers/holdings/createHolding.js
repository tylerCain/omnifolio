import createHolding from '../../services/holding/createHolding.js'

export const postHolding = async (req) => {
  const asset = req.body

  const holdingId = await createHolding(asset, req.auth.payload.sub, req.auth.payload)

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
