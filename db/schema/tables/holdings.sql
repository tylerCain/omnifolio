CREATE TABLE IF NOT EXISTS omnifolio.holdings (
  holding_id BIGSERIAL PRIMARY KEY,
  portfolio_id BIGINT NOT NULL
    REFERENCES omnifolio.portfolios(portfolio_id)
    ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('stock', 'crypto')),
  ticker TEXT NOT NULL,
  exchange TEXT,
  provider TEXT,
  provider_asset_id TEXT,
  amount NUMERIC(30, 12) NOT NULL CHECK (amount >= 0),
  purchase_price NUMERIC(30, 12) NOT NULL CHECK (purchase_price >= 0),
  currency_code CHAR(3) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT holdings_asset_location CHECK (
    asset_type = 'crypto' OR exchange IS NOT NULL
  )
);

CREATE INDEX IF NOT EXISTS holdings_portfolio_id_idx
  ON omnifolio.holdings (portfolio_id);
