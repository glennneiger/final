module.exports = (app, con, bodyParser) => {
var user
var userAdd = "SELECT username, followers, emoji, userID FROM users WHERE username LIKE "
var sqlSelect;

app.put('/userSearch', (request, response) => {
  user = request.body
  sqlSelect = String(userAdd + user)
  console.log(sqlSelect)
  con.query(sqlSelect, function (error, result) {
    console.log(result)
    response.send(result)
    if (error) throw error
    })
})
}
