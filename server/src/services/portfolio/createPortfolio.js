import { pool } from '../../connectors/postgres.js'

const createPortfolioQuery = `
  INSERT INTO cryptfolio.portfolios (user_id)
  VALUES ($1)
  RETURNING portfolio_id
`

const createPortfolio = async (userId) => {
  const createPortfolioResult = await pool.query(createPortfolioQuery, [userId])
  if (createPortfolioResult.rowCount > 0) {
    return createPortfolioResult.rows[0].portfolio_id
  }
  return null
}

export default createPortfolio
