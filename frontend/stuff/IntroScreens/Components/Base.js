import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import styles from '../../styles.js'
import CircleButton from './CircleButton'
import InputField from './InputField'
import BackButton from './BackButton'
import { createStore } from 'redux'
import {introStore, introStoreReducer} from '../../../App.js'

export const okStoreReducer = function(state, action) {
  if(state ==='?') {
    return { loading: false, good: false }
  }
  var newState = state
  if(action.payload='loading') {
    newState.loading = action.payload
    return newState
  } else {
    newState.good = action.payload
    return newState
  }
  console.log(action.payload)
}
export const okStore = createStore(okStoreReducer, '?')

export default class Base extends Component {
  constructor() {
    super()
    this.state={good:false, loading: false}
  }
  changeButton() {
    var okStoreState = okStore.getState()
    this.setState({
      loading: okStoreState.loading,
      good: okStoreState.good
    })
  }
  componentDidMount() {
    okStore.dispatch({type: 'kill', payload: false})
    int = setInterval(
    ()=>{this.changeButton()}, 123);
  }
  componentWillUnmount() {
    clearInterval(int);
    okStore.dispatch({type: 'kill', payload: false})
  }
    render() {
      return (
        <View style={[styles.whiteBackground, styles.fullScreen]}>
          <BackButton
            navigation={this.props.navigation}
            prevScreen={this.props.prevScreen}
            />
        <View style={styles.horizontalCenterAlign}>
          <View style={styles.introTopSpacer}></View>
            <View style={[styles.IntroContainer, styles.goodShadow]}>
              <View style={styles.introTopSpacer}></View>
          <InputField
            placeholder={this.props.placeholder}
            formData={introStore.getState()}
            notRegister={false}
            autoCapitalize={this.props.autoCapitalize}
             />
            <View style={{height: 40}}></View>
            <View style={{height: 20}}></View>
            <CircleButton
              loading={this.state.loading}
              good={this.state.good}
              navigateTo={this.props.navigateTo}
              navigation={this.props.navigation}
              />
        </View>
      </View>
      </View>
      );
    }
  }
