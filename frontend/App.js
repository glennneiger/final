import React, {Component} from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import {Intro, Login, Password, ProfilePicker, Username, FullName, Email} from './stuff/IntroScreens/index';
import {Home, Trending, Profile, VideoCamera} from './stuff/MainScreens/index';
import {Image} from 'react-native';
import { VidTooLong, CaptionMaker, Preview, VideoContainer, CommentScreen} from './stuff/MainScreens/SubScreens/index';
import { createStore } from 'redux';
import {AsyncStorage} from 'react-native';

export const introStoreReducer = function(state, action) {
  var thingy = state
  if(action.type === 'Full Name') {
    return {
      FullName: action.payload
    }
  }
  else {
  if(action.type === 'Username') {
    thingy.Username = action.payload
    return thingy
  }
  if(action.type === 'Your Email') {
    thingy.Email = action.payload
  }
  if(action.type === 'Password') {
    thingy.Password = action.payload
  }
  if(action.type === 'Bio') {
    thingy.Bio = action.payload
  }
  if(action.type === 'ProfilePicker') {
    thingy.ProfilePicker = action.payload
  }
}
  return thingy
}
export const introStore = createStore(introStoreReducer,'hello')

const IntroStack = createStackNavigator({
    Intro: Intro,
    Login: Login,
    FullName: FullName,
    Username: Username,
    Email: Email,
    Password: Password,
    ProfilePicker: ProfilePicker,
},
{
  headerMode: 'none'
}
)
const camScreens = createStackNavigator({
  camera: VideoCamera,
  VidTooLong: VidTooLong,
  Preview: Preview,
  CaptionMaker: CaptionMaker,
},{
  headerMode: 'none',
})
const Tabs = createBottomTabNavigator({
  profile: {screen: Profile},
  camera: camScreens,
  trending: Trending,
  home: Home,
}
// ,{
//   navigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({}) => {
//       const { routeName } = navigation.state;
//       let icon;
//       if(routeName === 'profile') {
//         icon = require('./assets/User.png')
//       } else if(routeName ==='camera') {
//         icon = require('./assets/Video-Camera.png')
//       } else if(routeName ==='trending') {
//         icon = require('./assets/Medal.png')
//       } else if(routeName ==='home') {
//         icon = require('./assets/TV.png')
//       }
//       return (<Image source={icon}/>)
//     }
//   })
// }

)
const LoggedInNav = createStackNavigator({
  Main: Tabs,
  Comment: CommentScreen,
  VideoContainer: VideoContainer,
},{
  headerMode: 'none',
})
const Nav = createSwitchNavigator({
  Intro: IntroStack,
  Main: Tabs,
},
{
  headerMode: 'none',
})


export default class App extends Component {
  constructor() {
    super()
      this.state = {loggedIn: false}
  }
  async changeNav(loggedIn) {
    if(loggedIn!==false) {
      AsyncStorage.setItem('userID', JSON.stringify(loggedIn))
    this.setState({
      loggedIn: true
    })} else {
      this.setState({
        loggedIn: false
      })
    }
  }
  Nav(loggedIn) {
    if(loggedIn) {
      return <LoggedInNav/> //LoggedInNav
    } else {
      return <Nav/>  //<Nav/>
    }
  }
  async displayData() {
    try {
      var loginData = await AsyncStorage.getItem('loginData')
        await fetch('http://Miless-MacBook-Pro.local:2999/userChecker', {
          method: 'post',
          body:loginData,
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res=>res.json())
          .then(res => this.changeNav(res))
    } catch(error) {
      (error)
    }
  }
  componentWillMount() {
    this.displayData()
  }
  render(good) {
    return this.Nav(this.state.loggedIn)
  }
}
