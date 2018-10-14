module.exports = (app,con, bodyParser) => {
var cred
var search
    app.post('/usernameValidation', (request, response) => {
      console.log('working')
      cred = request.body
      search = String("SELECT * FROM users WHERE username = " + cred)
      con.query(search, function (err, result) {
        if (err) throw err;
        if(result.length === 1) {
          response.send('false')
        } else {
          response.send('true')
        }
      })
    })
}
