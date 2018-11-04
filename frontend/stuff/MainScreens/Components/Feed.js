import React, {Component} from 'react';
import Thumbnail from './Thumbnail'
import FeedHeader from './FeedHeader'
import {queueStore} from '../../reduxStuff'
import { Text, View, TouchableOpacity, AsyncStorage, Image, FlatList} from 'react-native';
export default class Feed extends Component {
  render() {
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
      <FlatList
        ListHeaderComponent={
          <FeedHeader
          username={this.props.username}
          emoji={this.props.emoji}
          self={this.props.self}
          />}
        data={this.props.videos}
        renderItem={({item}) =>
          <Thumbnail
            username={this.props.username}
            emoji={this.props.emoji}
            caption={item.caption}
            image={item.thumbnail}
            navigation={this.props.navigation}
            thingy={item.key}
            />
        }
        numColumns={3}
        keyExtractor={item => item.key}
      />
  </View>
    )
  }
}
