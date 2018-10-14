module.exports = (app, con, bodyParser) => {
  const follower = "SELECT followersCount FROM users WHERE userID = "
  const following = "SELECT followingCount FROM users WHERE userID =  "
  var userCount
  var userFollowingCount
  var followAdd
  var followAdd2
  function followPlus(add, userToFollow, userFollowing) {
    var query = following+userFollowing
    con.query(query, function (error, result){
      if (error) throw error
      if(add) {
        userCount = result[0].followingCount + 1
      } else {
        userCount = result[0].followingCount - 1
      }
      followAdd = "UPDATE `users` SET `followersCount` = "+ userCount + " WHERE `users`.`userID` = " + userToFollow
      followAdd2 = "UPDATE `users` SET `followingCount` = "+ userCount + " WHERE `users`.`userID` = " + userFollowing

      var query2 = follower + userFollowing
      con.query(query2, function (error, result){
        if (error) throw error
        if(add) {
          userFollowingCount = result[0].followingCount + 1
        } else {
          userFollowingCount = result[0].followingCount - 1
        }
        con.query(followAdd, function(error, result){
          console.log(userCount)
          // console.log(followAdd)
        })
      con.query(followAdd2, function(error, result){
        console.log(result)
      })
    })
  })
}
  app.post('/followHandle', (request, response) => {
    const followUser = "INSERT INTO `followers` (`follower`, `following`) VALUES ("
    const followInstructions = "'" + request.body.userToFollow + "', '" + request.body.userFollowing + "')"
    const follow = followUser+followInstructions
    con.query(follow, function (error, result){
      if (error) throw error
    })
    followPlus(true, request.body.userToFollow, request.body.userFollowing)
  })
  app.post('/followDelete', (request, response) => {
    const unfollowUser = "DELETE FROM `followers` WHERE (`follower`, `following`) IN ("
    const followInstructions = "('" + request.body.userToFollow + "', '" + request.body.userFollowing + "'))"
    const unfollow = unfollowUser+followInstructions
    con.query(unfollow, function (error, result){
      if (error) throw error
    })
    followPlus(false, request.body.userToFollow, request.body.userFollowing)
  })
}
