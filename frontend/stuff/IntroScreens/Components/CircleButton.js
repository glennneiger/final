import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image, AsyncStorage, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../styles.js'
import {introStore, introStoreReducer} from '../../../App.js'
import {loginStore} from '../Login'
export default class CircleButton extends Component {

  checkIfLoggedIn(res, newData) {
    if(res !== false) {
      AsyncStorage.setItem('userID', JSON.stringify(res))
      AsyncStorage.setItem('loginData', JSON.stringify(newData))
      this.props.navigation.navigate('Main')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  async goToLands(lands, loggingIn, data) {
    if(this.props.good){
    if(loggingIn) {
      if(data) {
      var oldData = loginStore.getState()
      var newData = {username: oldData.Username, password: oldData.Password}
      try { await fetch('http://Miless-MacBook-Pro.local:2999/userChecker', {
        method: 'post',
        body:JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res=>res.json())
        .then(res => this.checkIfLoggedIn(res, newData))}
        catch(error) {
         console.log(error)
       }
    }
  } else {
    this.props.navigation.navigate(lands)
  }
  }
}
render() {
  var color2 = (this.props.good) ?
  "#00C6FF"
  :
  "#EE0979"
  var color1 = (this.props.good) ?
  "#0072FF"
  :
  "#FF6A00"
  var icon = (this.props.good) ?
  require('../../../assets/White-Check.png')
  :
  require('../../../assets/White-X.png')
  if(this.props.loading === true) {
    return (
    <TouchableOpacity
        onPress={() => {this.goToLands(this.props.navigateTo,this.props.loggingIn,this.props.good)}}
    >
    <LinearGradient
      style={styles.circleButton}
      colors={[color1,color2]}
    >
    <ActivityIndicator size="small" color="#ffffff" />
    </LinearGradient>
  </TouchableOpacity>)
} else { return (
    <TouchableOpacity
        onPress={() => {this.goToLands(this.props.navigateTo,this.props.loggingIn,this.props.good)}}
    >
    <LinearGradient
      style={styles.circleButton}
      colors={[color1,color2]}
    >
    <Image source={icon}/>
    </LinearGradient>
  </TouchableOpacity>)
  }
  }
}
