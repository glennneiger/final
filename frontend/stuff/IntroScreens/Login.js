import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles.js'
import CircleButton from './Components/CircleButton'
import InputField from './Components/InputField'
import {createStore} from 'redux'
import BackButton from './Components/BackButton'
var loginCredentials
export const loginStoreReducer = function(state, action) {
  if(state.length === 1) {
    loginCredentials = {Username: '', Password: '', good: false}
  } else {
    loginCredentials = state
  }
  if(action.type === 'Username') {
    loginCredentials.Username = action.payload
  }
  if(action.type === 'Password') {
    loginCredentials.Password = action.payload
  }
  if(action.type === 'updateButton') {
    loginCredentials.good = action.payload
  }
  return loginCredentials
}
export const loginStore = createStore(loginStoreReducer, '?')

export default class Intro extends Component {
  constructor() {
    super()
    this.state={good:true}
  }
  changeButton() {
    var good = loginStore.getState()
    this.setState({
      good: good.good
    })
  }
  componentDidMount() {
    int = setInterval(
    ()=>{this.changeButton()}, 123);
  }
  componentWillUnmount() {
    clearInterval(int);
    loginStore.dispatch({type: 'updateButton', payload: false})
  }
    render() {
      return (
        <View style={[styles.whiteBackground, styles.fullScreen]}>
          <BackButton
            navigation={this.props.navigation}
            prevScreen={'Intro'}
            />
        <View style={styles.horizontalCenterAlign}>
          <View style={styles.introTopSpacer}></View>
            <View style={[styles.IntroContainer, styles.goodShadow]}>
              <View style={styles.introTopSpacer}></View>
          <InputField placeholder={'Username'}
            notRegister={true}
            autoCapitalize='none'
            />
          <View style={{height: 30}}></View>
          <InputField placeholder={'Password'}
            notRegister={true}
            autoCapitalize='none'
            secureTextEntry={true}
            />
          <View style={{height: 30}}></View>
            <CircleButton
              good={this.state.good}
              navigateTo={'camera'}
              navigation={this.props.navigation}
              loggingIn={true}
                />
        </View>
      </View>
    </View>

      );
    }
  }
