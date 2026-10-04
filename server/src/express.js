const expressController = controller => async (req, res) => {
  const result = await controller(req)
  if (result.headers) {
    res.set(result.headers)
  }
  res.status(result.status).send(result.body)
}

export default expressController
