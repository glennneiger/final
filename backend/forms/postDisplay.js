module.exports = (app,con, bodyParser) => {
  app.post('/postDisplay', (request, response) => {
    var find = "SELECT `uri`, `dateOfUpload`, `likeAmount`, `views`, `caption` FROM Posts WHERE  videoID = "
    var userID = request.body
    var query = find + userID
    con.query(query, function (err, result) {
      if(err) {
        console.log(err)
      }
      response.send(result[0])
    })
  })
}
