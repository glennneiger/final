import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, AsyncStorage} from 'react-native'
import styles from '../../../styles.js';
import {commentStore} from '../../../reduxStuff.js'
import BabyComments from './babyComment.js';
import Swipeout from 'react-native-swipeout';
export default class Comment extends Component {
  constructor(props) {
    super(props);
    var hasExpander = false;
    var i = 0;
    if(this.props.comment.length>= 50) {
      hasExpander = true
    }
    this.state = {
      hasExpander: hasExpander,
      expanded: false,
      emoji: String.fromCodePoint(this.props.emoji),
      children: this.props.children,
      hasChildren: this.props.hasChildren,
      height: 40,
      commentID: this.props.commentID,
      likeAmount: this.props.likeAmount
    }
  }
  otherToggle = (res) => {
    this.setState({
      liked: res
    })
  }
  async componentDidMount() {
    let userID = await AsyncStorage.getItem("userID");
    await fetch('http://Miless-MacBook-Pro.local:2999/likeCheck?type=CommentLikes', {
      method: 'post',
      body: JSON.stringify({userID: userID, id: this.state.commentID}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res=>res.json())
    .then(res=>this.otherToggle(res))
  }
  setReply() { 
    if(this.state.expanded) {
      commentStore.dispatch({type: 'unnecessayr', payload: {item: this.props.number, height: this.state.height}})
    } else {
      commentStore.dispatch({type: 'other', payload: this.props.number})
    }
  }
  async likeToggle() { //likes the video
    this.setState({liked: !this.state.liked})
    let userID = await AsyncStorage.getItem("userID");
    let obj = {userID: JSON.parse(userID), commentID: this.props.commentID, videoID: this.props.videoID}
    if(this.state.liked) {
      this.setState({
        likeAmount: this.state.likeAmount+1
      })
    } else {
      this.setState({
        likeAmount: this.state.likeAmount-1
      })
    }
    await fetch('http://Miless-MacBook-Pro.local:2999/like?video=false&liked='+this.state.liked, {
      method: 'post',
      body:JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  expander = () => { // the . . .  that expands the comment body
    if(this.state.hasExpander){
    return (
      <TouchableOpacity
        onPress={this.toggleExpand}
      >
        <Text>  . . .</Text>
      </TouchableOpacity>
    )} else { return null;}
}
  renderBody = () => { // renders the comment body
    if(!this.state.expanded) {
      return (
          <Text style={{fontWeight: 'normal', fontSize: 13}}>{this.props.comment.substring(0, 50)}{this.expander()}</Text>
    )
    } else {
      return (
        <Text style={{fontWeight: 'normal', fontSize: 13, width: 50+'%', backgroundColor: 'rgb(255,0,0)'}}>{this.props.comment}</Text>
      )
    }
  }
  renderChildren = () => { //renders the comment children
    if(this.state.hasChildren) {
      return (
        <BabyComments 
          commentData={this.state.children}
        />
      )
    } else {
      return;
    }
  }

  toggleExpand = () => { //expands comment height based on text in the body
    let commentSize = this.props.comment.length;
    var i = 0;
    var height = 20;
    while(i<=commentSize) {
      height +=20
      i += 50;
    }
    this.setState({
      expanded: !this.state.expanded,
      height: height
    })
  }
  render() {
    let like = (this.state.liked) ?  require('../../../../assets/Like.png') :  require('../../../../assets/NoLike.png')
    let likeSizeBug = (this.state.liked) ? 22 : 30
    const swipeSettings = {
      autoClose: true,
      style: {backgroundColor: 'rgb(255,255,255)'},
      onClose: (secId, rowId, direction) => { // needs good index

      },
      onOpen:  (secId, rowId, direction) => { // needs good index

      },
      backgroundColor: '#ffffff',
      right: [
        {
          onPress: () => {

          },
          text: 'Delete', type: 'delete',
        }
      ],
      rowId: this.props.number,
      sectionId: 1
    }
    return (
      <Swipeout {...swipeSettings}>
      <View style={{marginTop: 10, backgroundColor: 'rgb(255,0,0)'}}>
        <View style={[styles.commentListItem, styles.whiteBackground, styles.row, {height: this.state.height, zIndex: 2}]}>
          <View style={[styles.row, styles.commentContentFixer]}>
            <Text style={{fontSize: 25, paddingLeft: 3, paddingRight: 3}}>{this.state.emoji}</Text> //the emoji
                <Text style={{fontWeight: 'bold', fontSize: 14}}>{this.props.user + ' '}
                  {this.renderBody()}
                </Text>
            </View>
          <View style={[styles.row, {flex:5, bottom: 2, left: 4}, styles.justifyContentCenter]}>
              <TouchableOpacity
                onPress={()=>{this.setReply()}}
                style={{right: 15, top: 8}}>
                <Text>Reply</Text>
              </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{this.likeToggle()}}
                  style={[styles.commentLike, styles.whiteBackground, styles.goodShadow]}>
                  <Image
                    style={{width: likeSizeBug, height:likeSizeBug}}
                    resizeMode={'contain'}
                    source={like}/>
                </TouchableOpacity>
                <Text style={{
                  left: 5,
                  top: 20,
                  color:'rgb(86, 86, 86)',
                  position: 'absolute',
                  left: 107
                }}>{this.state.likeAmount}</Text>
            </View>
        </View>
        <View style={[
          styles.commentShadowCover,
          styles.column,
          {height:this.state.height/2,
          top: this.state.height/2,
          width: 100+'%'},
          styles.goodShadow]}>
        </View>
        {this.renderChildren()}
      </View>
        </Swipeout>
    )
  }
}
