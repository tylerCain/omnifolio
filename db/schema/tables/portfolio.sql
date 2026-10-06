CREATE TABLE IF NOT EXISTS omnifolio.portfolios (
  portfolio_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL
    REFERENCES omnifolio.users(id)
    ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My portfolio',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT portfolios_user_name_unique UNIQUE (user_id, name)
);
