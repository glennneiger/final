module.exports = (app, con) => {
var cred
var search
  con.connect(function(err){
  app.post('/emailValidation', (request, response) => {
    cred = request.body
    search = String("SELECT * FROM users WHERE email = " + cred)
    con.query(search, function (err, result) {
      if (err) throw err;
      if(result.length === 1) {
        response.send('false')
      } else {
        response.send('true')
      }
    });
  })
})
}
