import { pool } from '../../connectors/postgres.js'

const ensureUserQuery = `
  INSERT INTO omnifolio.users (auth0_sub, email, nickname)
  VALUES ($1, $2, $3)
  ON CONFLICT (auth0_sub) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, omnifolio.users.email),
    nickname = COALESCE(EXCLUDED.nickname, omnifolio.users.nickname)
  RETURNING id
`

const ensureUser = async (auth0Sub, profile = {}) => {
  const { rows } = await pool.query(ensureUserQuery, [auth0Sub, profile.email ?? null, profile.nickname ?? null])
  return rows[0].id
}

export default ensureUser
