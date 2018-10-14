import React, {Component} from 'react';
const emojiUnicode = require("emoji-unicode")
import { Text, View, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles.js'
export default class ProfileScreen extends Component {


  async checkStorage() { //resets the storage
    try {
      AsyncStorage.clear()
    } catch(err) {
      console.log(err)
    };
  };

  render() {
    return(
      <View>
      <View style={[styles.profileTopBar, styles.goodShadow, styles.row]}>
        <View style={[styles.userBar,styles.goodShadow]}>
          <View style={[styles.userTextBarContent, styles.row]}>
            <Text style={{fontSize: 42, marginLeft:10, bottom: 1}}>{this.props.emoji}</Text>
            <Text style={[styles.slightlyBiggerText, {marginLeft: 4,fontSize: 20,marginTop: 14}]}>{this.props.username}</Text>
          </View>
        </View>
          <TouchableOpacity style={[styles.profileButton, styles.whiteBackground, styles.goodShadow, styles.alignItemsCenter]}>
            <MaterialCommunityIcons style={{top: 6}} name='account-edit' size={27} color={'rgb(0, 154, 221)'}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.profileButton, styles.whiteBackground, styles.goodShadow, styles.alignItemsCenter]}
            onPress={()=>this.checkStorage()}
            >
            <Ionicons style={{top: 6}} name='md-settings' size={27} color={'rgb(0, 154, 221)'}/>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.profileButton, styles.whiteBackground, styles.goodShadow, styles.alignItemsCenter]}>
            <Ionicons style={{top: 6}} name='ios-star' size={27} color={'rgb(0, 154, 221)'}/>
          </TouchableOpacity>
          </View>
          <View style={[styles.profileStatBar, styles.whiteBackground, styles.goodShadow]}>
            <View style={[{width: 100+'%', height: 20, zIndex: 1,bottom: 10, backgroundColor: 'rgb(255, 255, 255)'}]}></View> //to cover up the shadow
              <View style={[styles.row, styles.spaceBetween, {bottom: 10}]}>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>1398</Text>
              <Text>followers</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>9</Text>
              <Text>posts</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>5k</Text> //don't know why its mad
              <Text>likes</Text>
            </View>
            <View style={[styles.column, styles.alignItemsCenter]}>
              <Text>98</Text>
              <Text>following</Text>
            </View>
            </View>
          </View>
        </View>
        //end of top bar thing
    )
  }
}
