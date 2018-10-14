import React, {Component} from 'react'
import {Video} from 'expo'
import {View, TouchableOpacity, Text, Image} from 'react-native'
import { postStore } from '../../reduxStuff'
import BackButton from '../../IntroScreens/Components/BackButton'
import { LinearGradient, takeSnapshotAsync } from 'expo';
import styles from '../../styles.js'
const height = 320
export default class Preview extends Component {
  state = {
    uri: null
  }
  async componentWillMount() {
    let newUri = await postStore.getState()
    this.setState({
      uri: newUri.uri,
    })
  }
  async fix() {
    const result = await takeSnapshotAsync(this.video, {
    result: 'file',
    height: 320,
    width: 180,
    quality: 0.4,
    format: 'png',
  })
    postStore.dispatch({type:'thumbnail', payload: result})
    this.props.navigation.navigate('CaptionMaker')
    this.video.pauseAsync()
    this.video.stopAsync()
  }
  render() {
    return (
      <View>
        <BackButton
          navigation={this.props.navigation}
          prevScreen={'Main'}
          />
          <TouchableOpacity
              onPress={() => {this.fix()}}
              style={{
                position: 'absolute',
                bottom: 40,
                right: 40,
                zIndex: 10
              }}
          >
          <LinearGradient
            style={[styles.circleButton]}
            colors={["#00C6FF","#0072FF"]}
          >
          <Image source={require('../../../assets/White-Check.png')}/>
          </LinearGradient>
        </TouchableOpacity>
        <Video
               ref={ref => { this.video = ref; }}
               source={{ uri: this.state.uri }}
               style={styles.fullScreen}
               shouldPlay
               isLooping
               />

      </View>
    )
  }
}
