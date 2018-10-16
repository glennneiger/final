var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var app = express()
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gLo0ngen",
  database: "test"
})
con.connect(function(err){
require('./forms/comments')(app, con);
app.use(bodyParser.json());
require('./forms/userAdd')(app,con, http);
require('./forms/follow')(app,con, http);
app.use(bodyParser.text());
require('./forms/userCheck')(app, con, http);
require('./forms/userInfo')(app, con, http);
require('./forms/postDisplay')(app,con, http);
require('./forms/emailVal')(app, con, http);
require('./forms/userVal')(app, con, http);
require('./forms/userSearch')(app, con, http);
})
app.listen(2999, () => console.info('Application running on port 2999'))

var http = require('http');

var nStatic = require('node-static');

var fileServer = new nStatic.Server('./storage');

http.createServer(function (req, res) {

    fileServer.serve(req, res);
}).listen(5000, function() {
  console.log('cdn is running on port 5000')
});
require('./forms/media')(con)
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
