module.exports = (app, con) => {
app.post("/delete", (request, response) => {
    con.query("DELETE FROM "+request.body.type+" WHERE commentID = '"+
    request.body.id+"'", function(error) {
        if(error) throw error;
        response.send('deleted');
    })
})
app.post("/report", (request, response) => {
    con.query("INSERT INTO reported"+request.body.type+" (commentID, reason) VALUES  ('"
    +request.body.id + ", '" + request.body.reason +"')" 
    ,function(error) {
        if(error) throw error;
        response.send('reported');
    })
})
}