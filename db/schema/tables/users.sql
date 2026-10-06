CREATE TABLE IF NOT EXISTS omnifolio.users (
  id BIGSERIAL PRIMARY KEY,
  auth0_sub TEXT NOT NULL UNIQUE,
  email TEXT,
  nickname TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);