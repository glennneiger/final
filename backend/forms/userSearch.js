module.exports = (app, con, bodyParser) => {
var user
var userAdd = "SELECT username, followersCount, picture, userID FROM users WHERE username LIKE "
var sqlSelect

app.post('/userSearch', (request, response) => {
  user = '"' + request.body + '%"'
  sqlSelect = String(userAdd + user)
  con.query(sqlSelect, function (error, result) {
    console.log(result)
    response.send(result)
    if (error) throw error
    })
})
}
