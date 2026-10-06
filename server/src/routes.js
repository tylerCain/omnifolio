import { Router, json } from 'express'
import { postHolding } from './controllers/holdings/createHolding.js'
import { postPortfolio } from './controllers/portfolio/createPortfolio.js'
import { returnPortfolio } from './controllers/portfolio/getPortfolio.js'
import { putHolding } from './controllers/holdings/addToHolding.js'
import requireAuth from './middleware/requireAuth.js'

const expressController = controller => async (req, res, next) => {
  try {
    const result = await controller(req)
    if (result.headers) {
      res.set(result.headers)
    }
    res.status(result.status).send(result.body)
  } catch (error) {
    next(error)
  }
}

const routes = Router()

routes.use(json())
routes.use(requireAuth)

routes.get('/authorized', (req, res) => {
  const userSub = req.auth.payload.sub
  console.log('Authenticated Auth0 user:', userSub)
  res.status(200).json({ authorized: true, sub: userSub })
})

routes.get('/portfolio', expressController(returnPortfolio))
routes.post('/portfolio', expressController(postPortfolio))
routes.get('/portfolio/:portfolioId', expressController(returnPortfolio))
routes.post('/holding', expressController(postHolding))
routes.put('/holding', expressController(putHolding))

export default routes
