import { Router, json } from 'express'
import { postHolding } from './controllers/holdings/createHolding.js'
import { postPortfolio } from './controllers/portfolio/createPortfolio.js'
import { returnPortfolio } from './controllers/portfolio/getPortfolio.js'
import { putHolding } from './controllers/holdings/addToHolding.js'

const expressController = controller => async (req, res) => {
  const result = await controller(req)
  if (result.headers) {
    res.set(result.headers)
  }
  res.status(result.status).send(result.body)
}

const routes = Router()

routes.use(json())

routes.post('/portfolio', expressController(postPortfolio))
routes.get('/portfolio/:portfolioId', expressController(returnPortfolio))
routes.post('/holding', expressController(postHolding))
routes.put('/holding', expressController(putHolding))

export default routes
