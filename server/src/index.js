import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()
  .use(cors())
  .use(express.json())
  .use('/api', routes)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
