  module.exports = (app,con, http) => {

    app.post('/userAdd', (request, response) => {
      // console.log(request.body)
      var sql = "INSERT INTO `users` (`fName`, `password`, `email`, `username`, `emoji`) VALUES "
      var sql2 = '("' +
        request.body.FullName + '", "' +
        request.body.Password + '", "' +
        request.body.Email + '", "' +
        request.body.Username+ '", "' +
        request.body.emoji + '")'
        sql3=sql+sql2
        console.log(sql3)
      con.query(sql3, function(error, result) {
        if (error) throw error
        console.log(result)
      })
    })
}
