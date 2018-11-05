module.exports = (app, con, bodyParser) => {
  const follower = "SELECT followers FROM users WHERE userID = ";
  const following = "SELECT following FROM users WHERE userID = ";
  var userCount;
  var followAdd;
  var followAdd2;
  function followPlus(add, userToFollow, userFollowing) {
    var query = following + userFollowing;
    con.query(query, function(error, result) {
      if (error) throw error;
      if (add) {
        userCount = result[0].following + 1;
      } else {
        userCount = result[0].following - 1;
      }
      followAdd =
        "UPDATE `users` SET `followers` = " +
        userCount +
        " WHERE `users`.`userID` = " +
        userToFollow;
      followAdd2 =
        "UPDATE `users` SET `following` = " +
        userCount +
        " WHERE `users`.`userID` = " +
        userFollowing;
      var query2 = follower + userFollowing;
      con.query(query2, function(error, result) {
        if (error) throw error;
        if (add) {
          userFollowingCount = result[0].following + 1;
        } else {
          userFollowingCount = result[0].following - 1;
        }
        con.query(followAdd, function(error, result) {
        });
        con.query(followAdd2, function(error, result) {
        });
      });
    });
  }
  app.post("/followHandle", request => {
    const followUser =
      "INSERT INTO `followers` (`follower`, `following`) VALUES (";
    const followInstructions =
      "'" +
      request.body.userToFollow +
      "', '" +
      request.body.userFollowing +
      "')";
    const follow = followUser + followInstructions;
    con.query(follow, function(error, result) {
      if (error) throw error;
    });
    followPlus(true, request.body.userToFollow, request.body.userFollowing);
  });
  app.post("/followDelete", request => {
    const unfollowUser =
      "DELETE FROM `followers` WHERE (`follower`, `following`) IN (";
    const followInstructions =
      "('" +
      request.body.userToFollow +
      "', '" +
      request.body.userFollowing +
      "'))";
    const unfollow = unfollowUser + followInstructions;
    con.query(unfollow, function(error, result) {
      if (error) throw error;
    });
    followPlus(false, request.body.userToFollow, request.body.userFollowing);
  });
};
