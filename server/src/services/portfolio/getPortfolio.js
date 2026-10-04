import { pool } from '../../connectors/postgres.js'

const mapHolding = (holding) => ({
  coinId: holding.coin_id,
  amount: holding.amount,
  purchasePrice: holding.purchase_price,
})

const getPortfolioQuery = `
  SELECT holding_id, coin_id, amount, purchase_price from cryptfolio.holdings 
  WHERE portfolio_id = $1
  ORDER BY purchase_price DESC
`

const getPortfolio = async (portfolioId) => {
  const getPortfolioResult = await pool.query(getPortfolioQuery, [portfolioId])
  if (getPortfolioResult.rowCount > 0) {
    return getPortfolioResult.rows.map(holding => mapHolding(holding))
  }
  return null
}

export default getPortfolio
