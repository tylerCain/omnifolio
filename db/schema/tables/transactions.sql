CREATE TABLE IF NOT EXISTS omnifolio.transactions (
  transaction_id BIGSERIAL PRIMARY KEY,
  holding_id BIGINT NOT NULL
    REFERENCES omnifolio.holdings(holding_id)
    ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (
    transaction_type IN (
      'opening_balance', 'buy', 'sell', 'transfer_in', 'transfer_out',
      'dividend', 'fee', 'adjustment'
    )
  ),
  amount NUMERIC(30, 12) NOT NULL CHECK (amount > 0),
  unit_price NUMERIC(30, 12) CHECK (unit_price >= 0),
  currency_code CHAR(3),
  fees NUMERIC(30, 12) NOT NULL DEFAULT 0 CHECK (fees >= 0),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS transactions_holding_occurred_at_idx
  ON omnifolio.transactions (holding_id, occurred_at);
