import { pool } from '../../connectors/postgres.js'
import { getOrCreateUserPortfolio } from '../portfolio/getPortfolio.js'

const addToHoldingQueries = {
  findHolding: `
    SELECT holding_id, currency_code
    FROM omnifolio.holdings
    WHERE portfolio_id = $1
      AND asset_type = $2
      AND ticker = $3
      AND exchange IS NOT DISTINCT FROM $4
      AND provider_asset_id IS NOT DISTINCT FROM $5
    FOR UPDATE
  `,
  updateHolding: `
    UPDATE omnifolio.holdings
    SET amount = amount + $2, purchase_price = purchase_price + $3
    WHERE holding_id = $1
  `,
  insertBuyTransaction: `
    INSERT INTO omnifolio.transactions
      (holding_id, transaction_type, amount, unit_price, currency_code, occurred_at)
    VALUES ($1, 'buy', $2, $3, $4, COALESCE($5::timestamptz, now()))
  `,
}

const addToHolding = async (asset, auth0Sub, profile = {}) => {
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
      addToHoldingQueries.findHolding,
      [portfolio.portfolioId, assetType,
        assetType === 'stock' ? ticker.trim().toUpperCase() : ticker.trim(), exchange,
        asset.providerAssetId ?? (assetType === 'crypto' ? asset.coinId ?? null : null)]
    )
    const holding = rows[0]
    if (!holding) {
      await client.query('ROLLBACK')
      return null
    }
    if (holding.currency_code.trim() !== currencyCode) {
      await client.query('ROLLBACK')
      return null
    }

    const holdingId = holding.holding_id
    await client.query(
      addToHoldingQueries.updateHolding,
      [holdingId, amount, purchasePrice]
    )
    await client.query(
      addToHoldingQueries.insertBuyTransaction,
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

export default addToHolding
