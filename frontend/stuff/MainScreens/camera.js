import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { Camera, Permissions, ImagePicker, LinearGradient } from 'expo';
import styles from '../styles'
import {postStore} from '../reduxStuff'
const rate = 100/288
export default class VideoCamera extends Component {
  state = {
  hasCameraPermission: null,
  type: Camera.Constants.Type.back,
  flash: false,
  flashMode:'off',
  type: 'front',
  bar: 0,
  time: 0
}
toggleFacing = () => {
  this.setState({ type: this.state.type === 'back' ? 'front' : 'back' })
}

toggleFlash = () => {
  if(this.state.flash == false) {
    this.setState({flash: true, flashMode: 'on'})
  } else {
    this.setState({flash: false, flashMode: 'off' })
  }
}
addToBar(){
  this.setState({
    bar: this.state.bar + rate
  })
}
takeVideo = async () => {
  ('started recording')
  barInt = setInterval(()=>{this.addToBar()}, 42)
    let video = await this.camera.recordAsync({
      quality: '720p',
      onPictureSaved: this.onPictureSaved,
      maxDuration: 12
    })
    postStore.dispatch({type:"uri", payload: video.uri})
    this.props.navigation.navigate('Preview')

    }
stopVideo = () => {
  this.setState({bar: 0})
  clearInterval(barInt)
  this.camera.stopRecording()
  ('stopped recording')
}
async pickVideos() {
  let result = await ImagePicker.launchImageLibraryAsync({
  allowsEditing: true,
  mediaTypes: 'Videos'
})
if(result.cancelled === false){
  if(result.duration >= 12000) {
    this.props.navigation.navigate('VidTooLong')
  } else {
    postStore.dispatch({type:"uri", payload: result.uri})
    this.props.navigation.navigate('Preview')
  }
}}
async componentWillMount() {
  const audioStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
  const rollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const camStatus = await Permissions.askAsync(Permissions.CAMERA);
  if(audioStatus.status === "granted" && rollStatus.status === "granted" && camStatus.status === "granted") {
    this.setState({ hasCameraPermission: 'granted' });
  } else {
    this.setState({hasCameraPermission: false})
  }
}
  render() {
    const flash = (this.state.flash) ? require('../../assets/Flash-on.png') : require('../../assets/Flash-off.png')
     if (this.state.hasCameraPermission === false) {
        return (
          <View style={[{marginTop: 300, marginBottom: 300},styles.horizontalCenterAlign]}>
          <Text>No access to camera</Text>
        </View>
      )
      } else {
        return (
          <View style={styles.fullScreen}>
            <Camera
              ref={ref => { this.camera = ref; }}
              style={{ flex: 1 }}
              flashMode={this.state.flashMode}
              type={this.state.type}>
            // beggining of viewBar
            <View style={[styles.viewBar, styles.whiteBackground, styles.alignItemsCenter, {width: 90 + '%'}]}/>
            <LinearGradient
              style={[styles.viewBar, styles.annoying, {width: this.state.bar*.9 + '%', zIndex: 2}]}
              colors={["#0072FF", "#00C6FF"]}>
            </LinearGradient>
              // end of viewBar

              <View style={[{
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  width: 100 + '%',
                  justifyContent: 'center',
                  bottom: 50
                }
                  ]}>
              <TouchableOpacity
                style={styles.shutterButton}
                onPressIn={this.takeVideo}
                onPressOut={this.stopVideo}
                >
              </TouchableOpacity>
              </View>
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      width: 100 + '%',
      justifyContent: 'space-around',
      marginBottom: 50
    }}>
    // beginning of reverse
    <TouchableOpacity
      onPress={this.toggleFacing}
      style={{
        alignSelf: 'flex-end',
        alignItems: 'center',
        flex: 1
      }}
      >
      <Image
        style={styles.icons}
        source={require('../../assets/Reverse.png')}
       />
    </TouchableOpacity>
    // beginning of vid picker
    <TouchableOpacity
      style={{
        alignSelf: 'flex-end',
        alignItems: 'center',
        flex: 2
      }}
      onPress={()=>this.pickVideos()} >
      <Image
        style={styles.icons}
        source={require('../../assets/Library.png')}
       />
    </TouchableOpacity>
    // beginning of flash
    <TouchableOpacity
      onPress={this.toggleFlash}
      style={{
        alignSelf: 'flex-end',
        alignItems: 'center',
        flex: 1
      }}>
      <Image
        style={styles.icons}
        style={{width: 37, height: 37, marginBottom: 13}}
        resizeMode='contain'
        source={flash}
       />
    </TouchableOpacity>
  </View>
      </Camera>
          </View>
        );
      }
    }
}
