import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from '../../../styles.js';
import {commentStore} from '../../../reduxStuff.js'
import BabyComment from './babyComment';
export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentBody: this.props.comment,
      expanded: false,
      emoji: String.fromCodePoint(this.props.emoji),
      children: this.props.children,
      hasChildren: this.props.hasChildren
    }
  }
  likeToggle() { //likes the video
    this.setState({liked: !this.state.liked})
  }
  renderBody = () => {
    if(!this.state.expanded) {
      return (
        <Text style={{fontWeight: 'normal', fontSize: 13}}>{this.props.comment.substring(0, 48)}</Text>
    )
    } else {
      return (
        <Text style={{fontWeight: 'normal', fontSize: 13}}>{this.props.comment}</Text>
      )
    }
  }
  setReply() {
    commentStore.dispatch({type: 'other', payload: this.props.number-1})
  }
  renderChildren = () => {
    if(this.state.hasChildren) {
      return (
        <BabyComment 
          commentData={this.state.children}
        />
      )
    } else {
      return;
    }
  }
  render() {
    const body = (this.state.expanded) ? this.props.comment : this.props.comment.substring(0,48)
    const like = (this.state.liked) ?  require('../../../../assets/Like.png') :  require('../../../../assets/NoLike.png')
    return (
      <View style={{marginTop: 10}}>
      <View style={[styles.commentListItem, styles.whiteBackground, styles.row, {height:40, zIndex: 2}]}>
          <View style={[styles.row, {flex:11}]}>
                  <Text style={{fontSize: 25}}>{
                  this.state.emoji
                  }</Text> //the emoji
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>{this.props.user + ' '}
                   {this.renderBody()}
                   <TouchableOpacity><Text style = {{top: 3}}>  . . .</Text></TouchableOpacity>
                   </Text>

          </View>
          <View style={[styles.row, {flex:7, bottom: 2, left: 4}, styles.justifyContentCenter]}>
            <TouchableOpacity
              onPress={()=>{this.setReply()}}
              style={{right: 15, top: 8}}>
              <Text>Reply</Text>
            </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{this.likeToggle()}}
                style={[styles.commentLike, styles.whiteBackground, styles.goodShadow]}>
                <Image
                  style={{width: 30, height:30}}
                  resizeMode={'contain'}
                  source={like}/>
              </TouchableOpacity>
          </View>
      </View>
      <View style={[styles.commentShadowCover, styles.column, {height:20, top: 20, width: 100+'%'}, styles.goodShadow]}>
      </View>
        {this.renderChildren()}
    </View>
    )
  }
}
