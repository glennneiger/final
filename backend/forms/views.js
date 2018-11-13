module.exports = (app, con, bodyParser) => {
  app.post("/view", (request, response) => {
    con.query(
      "UPDATE `Posts` SET `views` = `views` +" +
        " '1' WHERE (`videoID` = '" +
        request.body.videoID +
        "')"
    );
    con.query(
      "INSERT INTO `WATCHED` (`userID`, `VideoID`) VALUES ( " +
        request.body.userID +
        ", " +
        request.body.videoID +
        ");"
    , function(error, result) {
      if(error) throw error;
      response.send(true);
    });
  });
};
