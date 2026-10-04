import { pool } from '../../connectors/postgres.js'

const createHoldingQuery = `
  UPDATE cryptfolio.holdings
  SET amount=amount+$3, purchase_price=purchase_price+$4
  WHERE portfolio_id=$1 AND coin_id=$2
  RETURNING holding_id
`

const addToHolding = async (portfolioId, coinId, amount, purchasePrice) => {
  const createHoldingResult = await pool.query(createHoldingQuery, [portfolioId, coinId, amount, purchasePrice])
  if (createHoldingResult.rowCount > 0) {
    return createHoldingResult.rows[0].holding_id
  }
  return null
}

export default addToHolding
