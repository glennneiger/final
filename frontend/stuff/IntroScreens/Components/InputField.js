import React, {Component} from 'react';
import { Text, View, TextInput} from 'react-native';
import styles from '../../styles.js'
import {introStore} from '../../../App'
import {okStore} from './Base'
import {loginStore} from '../Login'
import debounce from "underscore"
var reg
export default class InputField extends Component {
  constructor() {
    super()
    this.state= {
      formData: introStore.getState(),
      good: false,
      debTime: 0,
    }
  }

changeGood(textType, res) {
  console.log(res)
  if(res) {
    okStore.dispatch({type:"ok", payload: true})
  } else {
    okStore.dispatch({type:"notok", payload: false})
    }
  }

  sendUp(res) {
    if(!res) {
      loginStore.dispatch({type: 'updateButton', payload: true})
    } else {
      loginStore.dispatch({type: 'updateButton', payload: false})
    }
  }
  example = debounce((text) => {
console.log(text)
}, 500)

  async updateText(text, textType, notRegister) {
    if(notRegister){
      if(textType === 'Username') {
        okStore.dispatch({type:"ok", payload: 'waiting'})
        loginStore.dispatch({type:textType, payload: text})
        try { await fetch('http://Miless-MacBook-Pro.local:2999/usernameValidation', {
          method: 'post',
          body:JSON.stringify(text),
        }).then(res=>res.json())
          .then(res => this.sendUp(res))
        } catch(error) {
          console.log(error)
        }
      } else {
        loginStore.dispatch({type:textType, payload: text})
      }
      }
       else {
      introStore.dispatch({type:textType, payload: text})
      if(textType === 'Full Name') {
        this.changeGood('Username', true)
      }
      if(textType === 'Username') {
        okStore.dispatch({type:"ok", payload: 'waiting'})
        reg = /^[a-z0-9_-]{3,15}$/
        if(reg.test(text)){
        try { await fetch('http://Miless-MacBook-Pro.local:2999/usernameValidation', {
          method: 'post',
          body:JSON.stringify(text),
        }).then(res=>res.json())
          .then(res => this.changeGood(textType, res))
        } catch(error) {
          console.log(error)
        }
      }
    }
    else if(textType === 'Your Email') {
      reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      if(reg.test(text)){
        okStore.dispatch({type:"ok", payload: 'waiting'})
      try { await fetch('http://Miless-MacBook-Pro.local:2999/emailValidation', {
        method: 'post',
        body:JSON.stringify(text),
      }).then(res=>res.json())
        .then(res => this.changeGood(textType, res))} catch(error) {
          console.log(error)
        }
    }
  }
  else {
    if(textType === 'Full Name') {
      reg = /^[a-zA-Z ]+$/
    }


    if(textType === 'Password') {
      reg = /^.{4,12}$/
    }
    if(reg.test(text)) {
      okStore.dispatch({type:"ok", payload: true})
      introStore.dispatch({type:textType, payload:text})
    } else {
      okStore.dispatch({type:"ok", payload: false})
    }
  }
}

  }
    render() {
        return (
            <TextInput
            style={[styles.introField,styles.goodShadow,styles.whiteBackground]}
            placeholder={this.props.placeholder}
            onChangeText={(text)=>{this.updateText(text, this.props.placeholder, this.props.notRegister)}}
            autoCorrect={false}
            autoFocus={true}
            autoCapitalize={this.props.autoCapitalize}
            secureTextEntry={this.props.secureTextEntry}
            underlineColorAndroid={'rgb(255, 255, 255)'}
            />
        );
      }
    }
