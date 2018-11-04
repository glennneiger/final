import React, {Component} from 'react';
const emojiUnicode = require("emoji-unicode")
import { Text, View, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import Feed from '../Components/Feed'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles.js'
export default class ProfileScreen extends Component {

  async checkStorage() { //resets the storage
    try {
      AsyncStorage.clear()
    } catch(err) {
      console.log(err)
    };
  };

  render() {
    return (
        <Feed
          self={this.props.self}
          username={this.props.username}
          emoji={this.props.emoji}
          videos = {this.props.videos}
          navigation = {this.props.navigation}
          /> //the feed with all of the posts
    )
  }
}
