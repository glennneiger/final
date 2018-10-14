import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles'
import {vidStore, queueStore} from '../../reduxStuff'
export default class Thumbnail extends Component {
  goToVideo() {
    vidStore.dispatch({type: "boonk",
    payload: {
      username: this.props.username,
      emoji: this.props.emoji,
      caption: this.props.caption,
    }
   })
    queueStore.dispatch({type: 'change current', payload: this.props.thingy})
    this.props.navigation.navigate("VideoContainer")
  }
  render() {
    console.log(this.props.videoID)
    return (
      <TouchableOpacity
        style={[styles.goodShadow, styles.thumbnailContainer]}
        onPress={()=>{this.goToVideo()}}
        >
        <Image
         style={styles.image}
         source={{uri: 'http://Miless-MacBook-Pro.local:5000/' + this.props.image + '.png'}}
         />
       <View style={[styles.videoCaptionContainer, styles.row]}>
       <Text style={[styles.videoCaption,
          styles.whiteText,
          {bottom: 40}
        ]}>{this.props.caption}</Text>
       </View>
      </TouchableOpacity>
    )
  }
}
