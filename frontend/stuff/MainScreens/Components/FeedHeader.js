import React, { Component } from "react";
const emojiUnicode = require("emoji-unicode");
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles.js";
import { LinearGradient } from "expo";
export default class ProfileScreen extends Component {
  state = {
    followed: false,
    username: null,
    followerCount: null,
    emoji: null,
    userID: null
  }
  async checkStorage() {
    //resets the storage
    try {
      AsyncStorage.clear();
    } catch (err) {
      (err);
    }
  }
  componentWillReceiveProps() {
    console.log(this.props)
    this.setState({
      followerCount: this.props.followerCount,
      username: this.props.username,
      emoji: this.props.emoji,
      userID: this.props.userID
    })
  }
  async follow() {
    let i = (!this.state.followed) ? 1 : -1;
    let userID = await AsyncStorage.getItem('userID');
    let data = {
      userToFollow: this.props.userID,
      userFollowing: JSON.parse(userID)
    }
    if(!this.state.followed) {
      fetch("http://Miless-MacBook-Pro.local:2999/followHandle", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } else {
      fetch("http://Miless-MacBook-Pro.local:2999/followDelete", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    this.setState({
      followed: !this.state.followed,
      followerCount: this.state.followerCount + i
    });
  }
  followBtn = () => {
    let followed = this.state.followed ? "Following" : "Follow";
    return (
      <View style={[styles.row, { alignSelf: "center", left: 35 }]}>
        <TouchableOpacity
          onPress={() => {
            this.follow();
          }}
        >
          <LinearGradient
            style={[
              styles.followBtn,
              styles.alignItemsCenter,
              styles.justifyContentCenter
            ]}
            colors={["#0072FF", "#00C6FF"]}
          >
            <Text style={[styles.whiteText, styles.followBtnTxt]}>
              {followed}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={[
            styles.followerAmount,
            styles.justifyContentCenter,
            styles.alignItemsCenter
          ]}
        >
          {" "}
          {this.state.followerCount}
        </Text>
      </View>
    );
  };
  actions = () => {
    if (this.props.self) {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.profileButton,
              styles.whiteBackground,
              styles.goodShadow,
              styles.alignItemsCenter
            ]}
          >
            <MaterialCommunityIcons
              style={{ top: 6 }}
              name="account-edit"
              size={27}
              color={"rgb(0, 154, 221)"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.profileButton,
              styles.whiteBackground,
              styles.goodShadow,
              styles.alignItemsCenter
            ]}
            onPress={() => this.checkStorage()}
          >
            <Ionicons
              style={{ top: 6 }}
              name="md-settings"
              size={27}
              color={"rgb(0, 154, 221)"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.profileButton,
              styles.whiteBackground,
              styles.goodShadow,
              styles.alignItemsCenter
            ]}
          >
            <Ionicons
              style={{ top: 6 }}
              name="ios-star"
              size={27}
              color={"rgb(0, 154, 221)"}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return this.followBtn();
    }
  };
  moreInfo = () => {
    if (!this.props.self) {
      return null;
    } else {
      return (
        <View
          style={[
            styles.profileStatBar,
            styles.whiteBackground,
            styles.goodShadow
          ]}
        >
          <View
            style={[
              {
                width: 100 + "%",
                height: 20,
                zIndex: 1,
                bottom: 10,
                backgroundColor: "rgb(255, 255, 255)"
              }
            ]}
          />{" "}
          //to cover up the shadow
          <View style={[styles.row, styles.spaceBetween, { bottom: 10 }]}>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>1398</Text>
              <Text>followers</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>9</Text>
              <Text>posts</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>5k</Text> //don't know why its mad
              <Text>likes</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>98</Text>
              <Text>following</Text>
            </View>
          </View>
        </View>
      );
    }
  };
  render() {
    return (
      <View>
        <View style={[styles.profileTopBar, styles.goodShadow, styles.row]}>
          <View style={[styles.userBar, styles.goodShadow]}>
            <View style={[styles.userTextBarContent, styles.row]}>
              <Text style={{ fontSize: 42, marginLeft: 10, bottom: 1 }}>
                {this.state.emoji}
              </Text>
              <Text
                style={[
                  styles.slightlyBiggerText,
                  { marginLeft: 4, fontSize: 20, marginTop: 14 }
                ]}
              >
                {this.state.username}
              </Text>
            </View>
          </View>
          {this.actions()}
        </View>
        {/* {this.moreInfo()} */}
      </View>
      //end of top bar thing
    );
  }
}
