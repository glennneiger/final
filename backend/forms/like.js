module.exports = (app, con) => {
  app.post("/like", request => {
    var query;
    var likeAdd;
    console.log(request.query);
    console.log(request.body);
    if (JSON.parse(request.query.liked)) {
      if (!JSON.parse(request.query.video)) {
        query =
          "INSERT INTO `CommentLikes` (`userID`, `CommentID`) VALUES (" +
          request.body.userID +
          ", " +
          request.body.commentID +
          ")";
        likeAdd =
          "UPDATE `Comments` SET `likeAmount` = `likeAmount`+'1' WHERE `Comments`.`commentID` = " +
          request.body.commentID;
      } else {
        query =
          "INSERT INTO `VideoLikes` (`userID`, `VideoID`) VALUES (" +
          request.body.userID +
          ", " +
          request.body.videoID + 
          ")";
        likeAdd =
          "UPDATE `Posts` SET `likeAmount` = `likeAmount`+'1' WHERE `Posts`.`videoID` = " +
          request.body.videoID;
      }
    } else {
      if (JSON.parse(request.query.video)) {
        query =
          "DELETE FROM `VideoLikes` WHERE userID = " +
          request.body.userID +
          " and VideoID = " +
          request.body.videoID;
        likeAdd =
          "UPDATE `Posts` SET `likeAmount` = `likeAmount`-'1' WHERE `Posts`.`videoID` = " +
          request.body.videoID;
      } else {
        query =
          "DELETE FROM `CommentLikes` WHERE userID = " +
          request.body.userID +
          " and commentID = " +
          request.body.commentID;
        likeAdd =
          "UPDATE `Comments` SET `likeAmount` = `likeAmount`-'1' WHERE `Comments`.`commentID` = " +
          request.body.commentID;
      }
    }
    console.log(query);
    console.log(likeAdd);
    con.query(query);
    con.query(likeAdd);
  });
  app.post("/likeCheck", (request, response) => {
    //checks if the user has liked the current video or not
    var query = request.query.type;
    var isVideo = query == "VideoLikes" ? `VideoID` : `CommentID`;
    con.query(
      "SELECT * FROM `" +
        query +
        "` WHERE userID = " +
        request.body.userID +
        " and " +
        isVideo +
        " = " +
        request.body.id,
      function(error, result) {
        if (error) throw error;
        if (result.length > 0) {
          response.send(true);
        } else {
          response.send(false);
        }
      }
    );
  });
};
