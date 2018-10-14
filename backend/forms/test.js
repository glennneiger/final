module.exports = (app, con, bodyParser) => {
  app.use(bodyParser.text())
  app.post('/test', (request, response) => {
    console.log(request)
  })
}
