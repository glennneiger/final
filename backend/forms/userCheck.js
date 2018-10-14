module.exports = (app, con) => {
  var usernameL
  var passwordL
  var sqlSelect
  var select = "SELECT userID FROM users WHERE (username, password) = "

// SELECT * FROM `users` WHERE `password` LIKE 'password' AND `username` LIKE 'mileslow22'
  app.post('/userChecker', (request, response) => {
    usernameL = '"'+request.body.username+'"'
    passwordL = '"'+request.body.password+'"'
    sqlSelect = String(select + ' ' + '(' + [usernameL, passwordL] + ')')
    con.query(sqlSelect, function (err, result) {
      if (err) throw err
      if (result.length === 0) {
        response.send('false')
      } else {
        response.send(String(result[0].userID))
    }
  })
})}
