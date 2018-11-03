var emoji;
module.exports = (app, con) => {
    app.post("/comments", (request, response) => {
        con.query("SELECT username, emoji, body, likeAmount, parent, commentID FROM "+
        "`Comments` WHERE `videoID` = "+request.query.id, function(error, result) {
            if(error) throw error;
            response.send(result);
        })
    })
    function notNull(value) {
        if(value == null) {
            return (value);
        } else {
            return ("'" + value + "'");
        }
    }
    app.post("/addComment", (request, response) => {
        con.query("SELECT `emoji` from `users` WHERE `username` = '" + 
        request.body.username+"'",
        function(error, result) {
            if (error) throw error;
            finishQuery(result[0].emoji)
            function finishQuery(emoji) {
                console.log("INSERT INTO `Comments` (`videoID`, `body`, `parent`, `emoji`, `username`)"+
                " VALUES ('"
                + request.body.videoID + "', \"" + 
                request.body.body +"\", " +
                notNull(request.body.parent) +", '" +
                emoji +"', '" +
                request.body.username + "')");
                con.query("INSERT INTO `Comments` (`videoID`, `body`, `parent`, `emoji`, `username`)"+
                " VALUES ('"
                + request.body.videoID + "', \"" + 
                request.body.body +"\", " +
                notNull(request.body.parent) +", '" +
                emoji +"', '" +
                request.body.username + "')"
                , function(error, result) {
                    if(error) throw error; 
                    console.log(result)
                })
            }
        })
    })
}
//I have no idea how this works, like it doesn't make sense but whatevsies