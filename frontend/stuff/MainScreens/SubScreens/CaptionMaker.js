import React, {Component} from 'react'
import {TouchableOpacity, Text, View, TextInput, FlatList} from 'react-native'
import {LinearGradient} from 'expo'
import styles from '../../styles'
import BackButton from '../../IntroScreens/Components/BackButton'
import { Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux'
import  Button  from '../Components/Button'
import {postStore} from '../../reduxStuff'
export const chosenStoreReducer = function(state, action) {
  return (action.payload)
}
export const chosenStore = createStore(chosenStoreReducer, false)

export class Category extends Component {
  state = {
    chosen:false
  }
  check(){
    const thingy = chosenStore.getState()
    if(this.state.chosen && thingy !== this.props.name) {
      this.setState({chosen:false})
  }
}
  componentWillMount() {
    var int = setInterval(()=>{this.check()}, 289)
  }
  componentWillUnmount() {
    clearInterval(int)
  }
  toggleChosen() {
    if(!this.state.chosen) {
      postStore.dispatch({type:"category", payload:this.props.name})
    }
    chosenStore.dispatch({type:"I wish it didn't need to be this complicated", payload:this.props.name})
      this.setState({chosen:!this.state.chosen})
  }
  render() {
    var bottomB = (this.state.chosen) ? 5 : -1
    var size = (this.state.chosen) ? 60 : 32
    var icon = (this.state.chosen) ? 'ios-checkmark' : this.props.icon
    return (
      <View style={styles.horizontalCenterAlign}>
        <TouchableOpacity
          onPress={()=>{this.toggleChosen()}}
          >
      <LinearGradient
        colors={['#FF5F6D', '#FFC371']}
        style={[styles.category, styles.justifyContentCenter, styles.horizontalCenterAlign]}>
        <Ionicons style={{bottom:bottomB}}
          name={icon}
          color={'rgb(255, 255, 255)'}
          size={size}/>
      </LinearGradient>
      <Text>{this.props.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

export default class CaptionMaker extends Component {
  state = {
    height: 35,
    categories: [
      {name:'comedy', icon: 'ios-happy'},
      {name:'music', icon: 'md-musical-note'},
      {name:'sports', icon: 'ios-basketball'},
      {name:'animals', icon: 'ios-paw'},
      {name:'science', icon: 'ios-magnet'},
      {name:'nature', icon: 'ios-leaf'},
      {name:'gaming', icon: 'ios-game-controller-a'},
      {name:'beauty', icon: 'md-rose'},
      {name:'food', icon: 'ios-ice-cream'},
      {name:'travel', icon: 'ios-plane'},
      {name:'art', icon: 'ios-brush'},
    ]
  }
  updateText(text) {
    postStore.dispatch({type:"title", payload:text})
  }
  render() {
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
        <BackButton
          navigation={this.props.navigation}
          prevScreen={'Main'}
          />
        <View style={styles.introTopSpacer}></View>
        <View style={styles.alignItemsCenter}>
          <Text style={styles.slightlyBiggerText}>Add a title to your video</Text>
          <TextInput
          style={[styles.captionField,
            styles.goodShadow,
            styles.whiteBackground,
            {height: this.state.height,
            paddingLeft: 10,
            paddingRight: 10,
            top: 10
            }
          ]}
          onChangeText={(text)=>{this.updateText(text)}}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          autoFocus={true}
          underlineColorAndroid={'rgb(255, 255, 255)'}
          multiline={true}
          maxLength={140}
          />
        <View style={{height: 30}}/>
        <Text style={styles.slightlyBiggerText}>What category is your video?</Text>
          <View style={{height: 10}}/>
          <FlatList
            data={this.state.categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              <Category name={item.name} icon={item.icon}/>
            }
            keyExtractor={item => item.name}
          />
          <View
            style={styles.dontAsk}
            >
            <Button
              text={"Finish Post"}
              backgroundColor1={"rgb(0, 114, 255)"}
              backgroundColor2={"rgb(0, 198, 255)"}
              actionType={"upload"}
              navigation={this.props.navigation}
              />
            </View>
        </View>
      </View>
   )
  }
}
