import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import styles from '../styles.js'
import {introStore} from '../../App.js'
import { LinearGradient } from 'expo';
import circleButton from './Components/CircleButton'
import EmojiSelector from 'react-native-emoji-selector'
import BackButton from './Components/BackButton'
import {AsyncStorage} from 'react-native';
const emojiUnicode = require("emoji-unicode")
export default class ProfilePicker extends Component {
constructor() {
  super()
  this.state = {
    modalVisible: false,
    emoji: '',
  }
}
showchosenEmoji(emoji) {
  this.setState({
    emoji: emoji,
    modalVisible: !this.state.modalVisible,
  })
}
componentWillUnmount() {
  this.setState({
    modalVisible: !this.state.modalVisible,
  })
}

close() {
  this.setState({modalVisible: !this.state.modalVisible})
  // console.log(String.fromCodePoint(strooth));
}
finishRegister() {
  let emoji = parseInt(emojiUnicode(String(this.state.emoji)), 16) //turns the emoji into unicode, then the unicode to a codepoint
  var credentialsSoFar = introStore.getState()
  credentialsSoFar.emoji = emoji
  this.setState({modalVisible: !this.state.modalVisible})
  fetch('http://Miless-MacBook-Pro.local:2999/userAdd', {
    method: 'post',
    body:JSON.stringify(credentialsSoFar),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  var credentialsToStore = {username:credentialsSoFar.Username, password:credentialsSoFar.Password}
  AsyncStorage.setItem('loginData', JSON.stringify(credentialsToStore))
  this.props.navigation.navigate('Main')
}
    render() {
      return (
        <View style={[styles.whiteBackground, styles.fullScreen]}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={[styles.emojiCheckerModal, {backgroundColor:'rgba(0, 0, 0, 0.6)', height: 100+'%'}]}>
            <View style={[styles.emojiCheckerModalBody]}>
                <Text style={styles.emojiCheckerEmoji}>{this.state.emoji}</Text>
                <Text style={[{fontSize: 30}, styles.alignItemsCenter]}>Does this emoji fit you?</Text>
              <View style={[styles.row, {paddingTop: 30}]}>
              // button 1
              <TouchableOpacity
                onPress={()=>this.close()}
              >
              <LinearGradient
                style={[styles.circleButton, styles.goodShadow]}
                colors={["#FF6A00","#EE0979"]}
              >
              <Image source={require('../../assets/White-X.png')}/>
              </LinearGradient>
            </TouchableOpacity>
            // button 1
            <View style={{ width: 40}}></View>
            // button2
            <TouchableOpacity
              onPress={()=>this.finishRegister()}
            >
            <LinearGradient
              style={[styles.circleButton, styles.goodShadow]}
              colors={["#00C6FF","#0072FF"]}
            >
            <Image source={require('../../assets/White-Check.png')}/>
            </LinearGradient>
          </TouchableOpacity>
          // button 2
          </View>
            </View>
          </View>
        </Modal>
        <BackButton
          navigation={this.props.navigation}
          prevScreen={'Password'}
          />
          <View style={{height: 5+ '%'}}></View>
          <Text style={{alignSelf: 'center', fontSize: 17}}> Now, choose an emoji that best describes you</Text>
          <View style={[{
              height: 145,
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              width: 100 + '%',
              backgroundColor: 'rgb(255, 255, 255)',
              position: 'absolute',
              zIndex: 2
            }, styles.alignItemsCenter, styles.goodShadow]}>
            <Text style={{fontSize: 25, top: 40, color: 'rgb(74, 74, 74)'}}>Pick an Emoji</Text>
          </View>
        <EmojiSelector
          style={{height:90+'%', borderRadius: 20}}
          onEmojiSelected={emoji => this.showchosenEmoji(emoji)}
          theme='#ffffff'
          columns={5}
          showSearchbar={false}
          showTabs={false}
      />
    </View>
      )
    }
  }
