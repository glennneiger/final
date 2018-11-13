module.exports = (app, con) => {   
    app.post("/home", request => {
        // SELECT `videoID` FROM `watched`WHERE `userID` = " + request.body.userID
var postSearch = "SELECT `caption`, `thumbnail`, `videoID` FROM Posts WHERE  userID = " + request.body.userID
"
    }) 
}