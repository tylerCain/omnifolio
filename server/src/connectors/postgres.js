import pg from 'pg'
const { Pool } = pg

// eslint-disable-next-line import/prefer-default-export
export const pool = new Pool({ connectionString: "postgres://postgres:testpassword@localhost:5432/postgres" })
