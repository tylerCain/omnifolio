CREATE TABLE IF NOT EXISTS cryptfolio.portfolios (
  portfolio_id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id BIGINT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS cryptfolio.holdings (
  holding_id BIGSERIAL NOT NULL PRIMARY KEY,
  portfolio_id BIGINT NOT NULL REFERENCES cryptfolio.portfolios,
  coin_id VARCHAR NOT NULL,
  amount REAL NOT NULL,
  purchase_price REAL NOT NULL
);