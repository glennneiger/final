module.exports = (app, con) => {
    app.post("/comments", (request, response) => {
        con.query("SELECT username, emoji, body, likeAmount, parent FROM "+
        "`Comments` WHERE `videoID` = "+request.query.id, function(error, result) {
            if(error) throw error;
            response.send(result);
        })
    })
}