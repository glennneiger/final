module.exports = (app,con, bodyParser) => {
var valueB
var valueU
var valueN
var update
var column
var sqlSelect
var pageData
var postsfind
var userData= "SELECT `username`, `emoji` FROM users WHERE  userID= "
var postSearch = "SELECT `caption`, `thumbnail`, `videoID` FROM Posts WHERE  userID = "
app.post('/userDisplay', (request, response) => {
  sqlSelect = String(userData + ' "' + request.body + '"')
  con.query(sqlSelect, function (error, result) {
    if(error) {
      console.log(error);
    }
    response.send(result)
})
})
app.post('/postsFromUser', (request, response) => {
  sqlSelect = String(postSearch + ' "' + request.body + '"')
  con.query(sqlSelect, function (error, result) {
    if(error) {
      console.log(error);
    }
    response.send(result)
})
})

app.post('/nameEdit', (request, response) => {
  valueN = request.body
  update = "UPDATE users SET " + 'name' +  " = " + valueN  + " WHERE sid = " + user
  console.log(update)
  con.query(update, function (error, result) {
  })
})
app.post('/usernameEdit', (request, response) => {
  valueU = request.body
  // console.log(request.body)
  update = "UPDATE users SET " + 'username' +  " = " + valueU  + " WHERE sid = " + user
  console.log(update)
  con.query(update, function (error, result) {
  })
})
  app.post('/bioEdit', (request, response) => {
    valueB = request.body
    // console.log(request.body)
    update = "UPDATE users SET " + 'bio' +  " = " + valueB  + " WHERE sid = " + user
    console.log(update)
    con.query(update, function (error, result) {
    })
})
}
