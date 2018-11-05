import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import BackButton from "../../IntroScreens/Components/BackButton.js";
import { Entypo } from "@expo/vector-icons";
import { currentUserStore } from "../../reduxStuff";
import styles from "../../styles.js";
export default class Search extends Component {
  state = {
    usersSearched: []
  };
  changeUsers = data => {
    this.setState({
      usersSearched: data
    });
  };
  changeText = async text => {
    if (text.length > 0) {
      await fetch("http://Miless-MacBook-Pro.local:2999/userSearch", {
        method: "put",
        body: JSON.stringify(text + "%")
      })
        .then(res => res.json())
        .then(res => this.changeUsers(res));
    }
  };
  goToProfile = userID => {
    currentUserStore.dispatch({ type: "lol", payload: userID });
    this.props.navigation.navigate("OtherProfile");
  };
  renderUser = data => {
    return (
      <TouchableOpacity
        style={{ marginTop: 5 }}
        onPress={() => this.goToProfile(data.userID)}
      >
        <View
          style={[
            styles.searchItem,
            styles.col,
            styles.justifyContentCenter,
            {
              top: 3,
              zIndex: 2
            }
          ]}
        >
          <View style={[styles.row]}>
            <Text style={{ fontSize: 30, paddingLeft: 3, paddingRight: 3 }}>
              {String.fromCodePoint(data.emoji)}
            </Text>{" "}
            //the emoji
            <View style={styles.column}>
              <Text style={styles.linkUsername}>{data.username}</Text>
              <Text style={styles.linkFollowCount}>
                {data.followers} followers
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.goodShadow, styles.linkShadowCover]} />
      </TouchableOpacity>
    );
  };
  close() {
    this.props.navigation.navigate("mainExplore");
  }
  render() {
    return (
      <View style={[styles.whiteBackground, styles.fullScreen]}>
        //whole thing
        <View
          style={[
            styles.searchBarFinal,
            styles.goodShadow,
            styles.whiteBackground
          ]}
        >
          {" "}
          //search bar part
          <View style={{ flex: 1 }} /> //placeholder
          <TextInput
            autoFocus={true}
            style={styles.searchBarInput}
            onFocus={() => this.props.navigation.navigate("searchScreen")}
            placeholder={"Search"}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={text => this.changeText(text)}
          />
          <TouchableOpacity onPress={() => this.close()}>
            <Entypo
              style={{ flex: 1, top: 4, right: 4 }}
              name={"cross"}
              size={20}
              color={"rgb(145,145,145)"}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={ref => {
            this.userList = ref;
          }}
          data={this.state.usersSearched}
          renderItem={({ item }) => this.renderUser(item)}
          keyExtractor={item => item.username}
        />
      </View>
    );
  }
}
