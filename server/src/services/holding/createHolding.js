import { pool } from '../../connectors/postgres.js'
import { getOrCreateUserPortfolio } from '../portfolio/getPortfolio.js'

const createHoldingQueries = {
  insertHolding: `
    INSERT INTO omnifolio.holdings
      (portfolio_id, asset_type, ticker, exchange, provider, provider_asset_id,
       amount, purchase_price, currency_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING holding_id
  `,
  insertOpeningTransaction: `
    INSERT INTO omnifolio.transactions
      (holding_id, transaction_type, amount, unit_price, currency_code, occurred_at)
    VALUES ($1, 'opening_balance', $2, $3, $4, COALESCE($5::timestamptz, now()))
  `,
}

const createHolding = async (asset, auth0Sub, profile = {}) => {
  const assetType = asset.assetType ?? 'crypto'
  const ticker = asset.ticker ?? asset.coinId
  const amount = Number(asset.amount)
  const purchasePrice = Number(asset.purchasePrice)
  const currencyCode = (asset.currencyCode ?? 'GBP').toUpperCase()
  const exchange = asset.exchange ?? null

  if (!['stock', 'crypto'].includes(assetType) || !ticker || !Number.isFinite(amount) || amount <= 0 ||
      !Number.isFinite(purchasePrice) || purchasePrice < 0 || !/^[A-Z]{3}$/.test(currencyCode) ||
      (assetType === 'stock' && !exchange)) {
    return null
  }

  const portfolio = await getOrCreateUserPortfolio(auth0Sub, profile)
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { rows } = await client.query(
      createHoldingQueries.insertHolding,
      [portfolio.portfolioId, assetType,
        assetType === 'stock' ? ticker.trim().toUpperCase() : ticker.trim(), exchange,
        asset.provider ?? (asset.coinId ? 'coingecko' : null),
        asset.providerAssetId ?? (assetType === 'crypto' ? asset.coinId ?? null : null),
        amount, purchasePrice, currencyCode]
    )
    const holdingId = rows[0].holding_id
    await client.query(
      createHoldingQueries.insertOpeningTransaction,
      [holdingId, amount, purchasePrice / amount, currencyCode, asset.occurredAt ?? null]
    )
    await client.query('COMMIT')
    return holdingId
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export default createHolding
