import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import FeedHeader from "./FeedHeader";
import { queueStore } from "../../reduxStuff";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  FlatList
} from "react-native";
import BackButton from "../universal/backButton";
export default class Feed extends Component {
  nothing = () => {
    return (
      <View style={[styles.horizontalCenterAlign, {top: 180}]}>
        <Text>{this.props.username} hasn't posted anything :(</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
      <BackButton
        display={!this.props.self}
        top={560}
        left={15}
        size={36}
        navigation={this.props.navigation}
        prevScreen={'mainExplore'}
      />
        <FlatList
          ListHeaderComponent={
            <FeedHeader
              username={this.props.username}
              emoji={this.props.emoji}
              self={this.props.self}
              followerCount={this.props.followerCount}
              userID={this.props.userID}
            />
          }
          data={this.props.videos}
          renderItem={({ item }) => (
            <Thumbnail
              username={this.props.username}
              emoji={this.props.emoji}
              caption={item.caption}
              image={item.thumbnail}
              navigation={this.props.navigation}
              thingy={item.key}
            />
          )}
          numColumns={3}
          keyExtractor={item => item.key}
          ListEmptyComponent={
            ()=>this.nothing()
          }
        />
      </View>
    );
  }
}
