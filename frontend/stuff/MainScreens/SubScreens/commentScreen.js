import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Dimensions, Keyboard, Image} from 'react-native'
import styles from '../../styles.js';
import BackButton from '../../IntroScreens/Components/BackButton'
import Comment from '../Components/comment.js'
import {commentStore} from '../../reduxStuff.js'
const {height, width} = Dimensions.get('window');
export default class CommentScreen extends Component {

  state = {
    inputHeight: 0,
    currentComment: -1,
    commentData: [
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '1',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comment " +
        "looked good like other comments do",
        number: '2',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '3',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '4',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comment " +
        "looked good like other comments do",
        number: '5',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '6',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '7',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comment " +
        "looked good like other comments do",
        number: '8',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '9',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '10',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comment " +
        "looked good like other comments do",
        number: '11',
      },
      {
        user: 'Mileslow22',
        emoji: '😀',
        comment: "Dang, so pretty. I wish my comments " +
        "looked good like other comments do",
        number: '12',
      },
    ]
  }
  checkComment(){
    let newComment = commentStore.getState();
    if(newComment !== -1 && newComment !== this.state.currentComment) {
      this.setState({currentComment:newComment})
      this.commentList.scrollToIndex({animated: false, index: newComment, viewOffset: height/2.9+2});
      this.input.focus();
    }
  }
  componentDidMount() {
    commentStore.dispatch({type:'besnons', payload: -1})
    this.keyboardWillShowListener = Keyboard.addListener("keyboardWillShow",this.keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide",this.keyboardWillHide.bind(this));
    const commentCheckInterval = setInterval(()=>{this.checkComment()},144)
  }
  componentWillUnmount() {
    clearInterval(commentCheckInterval)
  }
  keyboardWillShow(e) {
      this.setState({inputHeight: e.endCoordinates.height})
  }
  keyboardWillHide(e) {
    commentStore.dispatch({type:'besnons', payload: -1})
    this.setState({inputHeight: 0, currentComment: -1})
  }
  renderGoodButton = () => {
    return (
      <TouchableOpacity
        style={[styles.whiteBackground, styles.goodShadow, styles.commentYesButton]}>
        <Image
          style={{width: 24, height: 24}}
          resizeMode={'contain'}
          source={require('../../../assets/Yes.png')}
          />
      </TouchableOpacity>
    )
  }
  render(){
    const comment = (this.state.currentComment !=-1) ? 'reply to Mileslow22' : 'Add a comment, bet'
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
        <View style={[styles.whiteBackground, styles.goodShadow, styles.commentHeader, styles.row]}>
            <BackButton
              navigation={this.props.navigation}
              prevScreen={'videoScreen'}
              size={36}
              />
          <View style={styles.container}><Text style={styles.commentHText}>Comments</Text>
        </View>
        </View>
        <FlatList
          ref={ref => { this.commentList = ref; }}
          style={styles.offset}
          data={this.state.commentData}
          initialScrollIndex={0}
          initialNumToRender={0}
          renderItem={({item})=>(
            <Comment
              user={item.user}
              emoji={item.emoji}
              comment={item.comment}
              number={item.number}
              />
            )
          }
          keyboardDismissMode={'on-drag'}
          keyExtractor={item => item.number}
          />

        <View style={[styles.goodShadow,
            styles.whiteBackground,
            styles.commentFooter,
            styles.row,
            styles.justifyContentCenter,
          {bottom: this.state.inputHeight}]
          }>
          <View style={{flex: 2, top: 3}}><Text style={styles.commentEmoji}>😀</Text></View>
          <View style={[styles.goodShadow, styles.commentInput, styles.whiteBackground, styles.row, styles.alignItemsCenter, styles.justifyContentCenter, {flex: 8}]}>
            <TextInput
              ref={ref => { this.input = ref; }}
              placeholder={comment}
              placeholderTextColor={'rgb(60, 60, 60)'}
              />
          </View>
            <View style={[{flex: 2.5, top: 12, left: 13}]}>
              {this.renderGoodButton()}
            </View>
          </View>
      </View>
    )
  }
}
