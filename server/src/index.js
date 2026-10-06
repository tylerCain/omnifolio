import 'dotenv/config'
import express from 'express'
import routes from './routes.js'
import cors from 'cors'
import { UnauthorizedError } from 'express-oauth2-jwt-bearer'

const app = express()
  .use(cors())
  .use(express.json())
  .use('/api', routes)

app.use((error, req, res, next) => {
  if (error instanceof UnauthorizedError) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  console.error(error)
  return res.status(500).json({ error: 'Internal server error' })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
