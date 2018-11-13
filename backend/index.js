var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gLo0ngen",
  database: "test"
});
con.connect(function(err) {
  app.use(bodyParser.json());
  require("./forms/views")(app, con, http);
  require("./forms/report")(app, con, http);
  require("./forms/comments")(app, con);
  require("./forms/userAdd")(app, con, http);
  require("./forms/follow")(app, con, http);
  require("./forms/like")(app, con, bodyParser);
  app.use(bodyParser.text());
  app.post("/getEmoji", (request, response) => {
    con.query(
      "SELECT `emoji` FROM `users` WHERE `userID` = " + request.body,
      function(error, result) {
        if (error) throw error;
        response.send(result[0]);
      }
    );
  });
  app.post("/comments/check", (request, response) => {
    con.query(
      "SELECT COUNT(videoID) FROM `Comments` WHERE videoID = " + request.body,
      function(error, result) {
        if (error) throw error;
        response.send(result[0]);
      }
    );
  });
  require("./forms/userCheck")(app, con, http);
  require("./forms/userInfo")(app, con, http);
  require("./forms/postDisplay")(app, con, http);
  require("./forms/emailVal")(app, con, http);
  require("./forms/userVal")(app, con, http);
  require("./forms/userSearch")(app, con, http);
});
app.listen(2999, () => console.info("Application running on port 2999"));

var http = require("http");

var nStatic = require("node-static");

var fileServer = new nStatic.Server("./storage");

http
  .createServer(function(req, res) {
    fileServer.serve(req, res);
  })
  .listen(5000, function() {
    console.log("cdn is running on port 5000");
  });
require("./forms/media")(con);
// app.use(bodyParser.text(app,usernameL,passwordL))
// const forms  = require('./forms/index')
// console.log(forms)
// end of setup
// con.connect(function(err){
//   if (err) throw err
// forms.userChecker()
// // end of login code
// forms.emailValidator()
// // end of email validation
// forms.usernameValidator()
// // end of username validation
// forms.userInfo()
// end of user info display
// })
// app.listen(2999, () => console.info('Application running on port 2999'))
