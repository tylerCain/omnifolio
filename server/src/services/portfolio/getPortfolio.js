import { pool } from '../../connectors/postgres.js'
import createPortfolio from './createPortfolio.js'
import ensureUser from '../users/ensureUser.js'

const mapHolding = (holding) => ({
  holdingId: holding.holding_id,
  assetType: holding.asset_type,
  ticker: holding.ticker,
  coinId: holding.asset_type === 'crypto' ? holding.provider_asset_id ?? holding.ticker : holding.ticker,
  exchange: holding.exchange,
  provider: holding.provider,
  providerAssetId: holding.provider_asset_id,
  amount: Number(holding.amount),
  purchasePrice: Number(holding.purchase_price),
  currencyCode: holding.currency_code.trim(),
})

const getPortfolioQuery = `
  SELECT p.portfolio_id, h.holding_id, h.asset_type, h.ticker, h.exchange,
         h.provider, h.provider_asset_id, h.amount, h.purchase_price, h.currency_code
  FROM omnifolio.portfolios p
  JOIN omnifolio.users u ON u.id = p.user_id
  LEFT JOIN omnifolio.holdings h ON h.portfolio_id = p.portfolio_id
  WHERE p.portfolio_id = $1 AND u.auth0_sub = $2
  ORDER BY h.purchase_price DESC NULLS LAST
`

const getDefaultPortfolioQuery = `
  SELECT portfolio_id FROM omnifolio.portfolios
  WHERE user_id = $1 AND name = 'My portfolio'
`

const getPortfolio = async (portfolioId, auth0Sub) => {
  const getPortfolioResult = await pool.query(getPortfolioQuery, [portfolioId, auth0Sub])
  if (getPortfolioResult.rowCount > 0) {
    const { portfolio_id: id } = getPortfolioResult.rows[0]
    return {
      portfolioId: id,
      holdings: getPortfolioResult.rows
        .filter(holding => holding.holding_id !== null)
        .map(holding => mapHolding(holding)),
    }
  }
  return null
}

export const getOrCreateUserPortfolio = async (auth0Sub, profile = {}) => {
  const userId = await ensureUser(auth0Sub, profile)
  const { rows } = await pool.query(getDefaultPortfolioQuery, [userId])
  const portfolioId = rows[0]?.portfolio_id ?? await createPortfolio(auth0Sub, 'My portfolio', profile)
  return getPortfolio(portfolioId, auth0Sub)
}

export default getPortfolio
