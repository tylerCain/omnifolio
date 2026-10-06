import { pool } from '../../connectors/postgres.js'
import ensureUser from '../users/ensureUser.js'

const createPortfolioQuery = `
  INSERT INTO omnifolio.portfolios (user_id, name)
  VALUES ($1, $2)
  ON CONFLICT (user_id, name) DO UPDATE SET name = EXCLUDED.name
  RETURNING portfolio_id
`

const createPortfolio = async (auth0Sub, name = 'My portfolio', profile = {}) => {
  const userId = await ensureUser(auth0Sub, profile)
  const { rows } = await pool.query(createPortfolioQuery, [userId, name])
  return rows[0]?.portfolio_id ?? null
}

export default createPortfolio
