import addToHolding from '../../services/holding/addToHolding.js'

export const putHolding = async (req) => {
  const asset = req.body

  const holdingId = await addToHolding(asset, req.auth.payload.sub, req.auth.payload)

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
