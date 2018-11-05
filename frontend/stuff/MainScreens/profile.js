import React, { Component } from "react";
import Feed from "./Components/Feed";
import { AsyncStorage } from "react-native";
import { queueStore } from "../reduxStuff";
export default class Profile extends Component {
  state = {
    videos: null,
    username: null,
    emoji: null
  };
  async componentWillMount() {
    let userID = await AsyncStorage.getItem('userID');
    this.setState({
      userID: JSON.parse(userID)
    })
    fetch("http://Miless-MacBook-Pro.local:2999/userDisplay", {
      method: "post",
      body: userID
    })
      .then(res => res.json())
      .then(res => this.setData(res));
    fetch("http://Miless-MacBook-Pro.local:2999/postsFromUser", {
      method: "post",
      body: userID
    })
      .then(res => res.json())
      .then(res => this.setVideos(res));
  }
  setVideos(res) {
    var key = 0;
    var thumbnails = res;
    while (key <= thumbnails.length - 1) {
      thumbnails[key].key = key;
      key++;
    }
    this.setState({
      videos: thumbnails
    });
    queueStore.dispatch({ type: "queue", payload: thumbnails });
  }
  setData(res) {
    this.setState({
      username: res[0].username,
      emoji: String.fromCodePoint(res[0].emoji),
      followerCount: res[0].followers
    });
  } //turns the codepoint of the users emoji into a viewable emoji

  render() {
    return (
      <Feed
        username={this.state.username}
        videos={this.state.videos}
        emoji={this.state.emoji}
        self={true}
        navigation={this.props.navigation}
        followerCount={this.state.followerCount}
        userID={this.state.currentUser}
      />
    );
  }
}
