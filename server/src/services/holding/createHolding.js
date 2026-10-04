import { pool } from '../../connectors/postgres.js'

const createHoldingQuery = `
  INSERT INTO cryptfolio.holdings (portfolio_id, coin_id, amount, purchase_price)
  VALUES ($1, $2, $3, $4)
  RETURNING holding_id
`

const createHolding = async (portfolioId, coinId, amount, purchasePrice) => {
  const createHoldingResult = await pool.query(createHoldingQuery, [portfolioId, coinId, amount, purchasePrice])
  if (createHoldingResult.rowCount > 0) {
    return createHoldingResult.rows[0].holding_id
  }
  return null
}

export default createHolding
