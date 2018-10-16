import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Video, LinearGradient} from 'expo';
import {vidStore, commentStore} from '../../reduxStuff.js';
import styles from '../../styles.js';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
export default class VideoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoID: props.videoID,
    }
  }
  state = {
    render: true,
    videoSource: null,
    likeAmount: null,
    emoji: null,
    username: null,
    title: null,
    liked: false,
    saved: false,
    paused: false,
    toggled: false,
  }
  setData(res) {//sets the state for all of the data to go in
    let videoData = vidStore.getState();
    this.setState({
      emoji: videoData.emoji,
      username: videoData.username,
      title: res.caption,
      likeAmount: res.likeAmount,
      videoSource: res.uri,
    })
}
  async componentWillMount() {
    await fetch('http://Miless-MacBook-Pro.local:2999/postDisplay', {
      method: 'post',
      body:JSON.stringify(this.state.videoID),
    }).then(res=>res.json())
      .then(res=>this.setData(res))
      commentStore.dispatch({type:'videoID', payload: this.state.videoID})
  }
  checkToggle() {
    if(this.state.toggled) {
      this.setState({
        toggled: false,
        render: !this.state.render
      })
    }
  }

  handleTap() {  //if the user double taps the video pauses/plays, if user single taps it renders the bottom & top bars
    if(!this.state.toggled) {
      this.setState({
        toggled: true,
      })
      setTimeout(()=>this.checkToggle(), 300); // a timer
    }
    const timer = this.state.intNum-this.state.now
    if(this.state.toggled) {
        if(this.state.paused) {
              this.video.playAsync();
        } else {
          this.video.pauseAsync();
        }
        this.setState({toggled: false, paused: !this.state.paused})
      } else {
        if(this.state.toggled) {
            this.setState({toggled: false})
          }

        }
  }

  saveToggle() { //saves the selected video to saved thingy
    this.setState({saved: !this.state.saved})
  }
  likeToggle() { //likes the video
    this.setState({liked: !this.state.liked})
  }
  renderTopBar() { //user bar code
    return (
      <View style={[styles.videoTopBar, styles.row, {position: 'absolute'}]}>
          <View style={[styles.videoUserBar,styles.goodShadow]}>
            <View style={[styles.userTextBarContent, styles.row]}>
              <Text style={{fontSize: 42, marginLeft:10, bottom: 1}}>{this.state.emoji}</Text>
              <Text style={[styles.slightlyBiggerText, {marginLeft: 4,fontSize: 20,marginTop: 14}]}>{this.state.username}</Text>
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
    )
  }
  renderBottomBar(like, save, send, comment) {
    return (
    <View style={[styles.whiteBackground,
        styles.postActionBar,
        styles.absolute,
      ]}>
      <Text style={[styles.videoCaption, {left: 6, right: 6}]}>{this.state.title}</Text>
        <View style={{height: 10}}></View>
      <View style={styles.row}>
        <View style={[styles.spaceBetween, styles.row, {flex: 4}]}>
          <View>
            //like button
          <TouchableOpacity
            onPress={()=>{this.likeToggle()}}
            style={[styles.videoActionButton, styles.whiteBackground, styles.goodShadow]}>
            <Image source={like}/>
          </TouchableOpacity>
          <View style={{height: 4}}></View>
          <Text style={[styles.alignItemsCenter, styles.likeAmount]}>{this.state.likeAmount}</Text>
          </View>
        //send button
        <TouchableOpacity style={[styles.videoActionButton, styles.whiteBackground, styles.goodShadow]}>
          <Image source={send}/>
        </TouchableOpacity>
        //save button
        <TouchableOpacity
          onPress={()=>{this.saveToggle()}}
          style={[styles.videoActionButton, styles.whiteBackground, styles.goodShadow]}>
          <Image source={save}/>
        </TouchableOpacity>
        </View>
        <View style={{flex: 4}}>
          <TouchableOpacity style={[styles.goodShadow, styles.commentBar, styles.whiteBackground]}
            onPress={()=>{this.props.navigation.navigate('Comment')}}
            >
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={[styles.commentText, styles.bold, {top: 10+'%'}]}>View Comments</Text>
                <Image style={{top: 6 + '%'}}source={comment}/>
            </View>
          </TouchableOpacity>
        </View>
        //comment button
      </View>
    </View>
  )
  }
  render(){
    const like = (this.state.liked) ?  require('../../../assets/Like.png') :  require('../../../assets/NoLike.png')
    const save = (this.state.saved) ? require('../../../assets/Save.png') : require('../../../assets/NoSave.png')
    const send = require('../../../assets/Send.png')
    const comment = require('../../../assets/Comments.png')
    const top = (this.state.render) ? this.renderTopBar() : null
    const bottom = (this.state.render) ? this.renderBottomBar(like, save, send, comment) : null
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>{this.handleTap()}}
          >
          <StatusBar hidden />
          <Video
            style={styles.fullScreen}
            ref={ref => { this.video = ref; }}
            source={{ uri: "http://Miless-MacBook-Pro.local:5000/"+this.state.videoSource+".mov" }}
            shouldPlay
            isLooping
            />
          {top}
          {bottom}
                //bottom bar
        </TouchableOpacity>
      )
    }
  }
