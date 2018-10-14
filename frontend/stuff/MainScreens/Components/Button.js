import React, {Component} from 'react';
import { Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import { ImagePicker } from 'expo'
import { LinearGradient } from 'expo';
import { postStore } from '../../reduxStuff'
import axios from 'axios';
import styles from '../../styles.js'
export default class Button extends Component {
  state = {
    width: this.props.text.length * 12
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
  async action() {
    if(this.props.actionType === 'camera-roll') {
      this.pickVideos()
    }
    if(this.props.actionType === 'upload') {
      let postData = postStore.getState()
      let formData = new FormData();
      let user = await AsyncStorage.getItem('userID')
      let unparseUser = (JSON.parse(user))
      formData.append('category', postData.category);
      formData.append('user', unparseUser)
      formData.append('selectedFiles', {uri:postData.uri, type:'video/mov', name:postData.title });
      formData.append('selectedFiles', {uri:postData.thumbnail, type:'image/png', name:'thumb' });
      axios.post('http://Miless-MacBook-Pro.local:3002/videos', formData)
           .then((result) => {
            // console.log(result)
          });
       }
     }
render() {
    return (
        <TouchableOpacity
            onPress={() => this.action()}
            >
            <LinearGradient
              style={[styles.otherButton, styles.goodShadow, {width: this.state.width}]}
              colors={[this.props.backgroundColor1,this.props.backgroundColor2]}
              >
            <Text style={[styles.whiteText, styles.introButtonText]}>{this.props.text}</Text>
            </LinearGradient>
      </TouchableOpacity>
    );
  }
}
