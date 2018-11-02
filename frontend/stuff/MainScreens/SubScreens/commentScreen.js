import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Dimensions, Keyboard, Image, AsyncStorage} from 'react-native';
import styles from '../../styles.js';
import BackButton from '../../IntroScreens/Components/BackButton';
import Comment from '../Components/commentComponents/comment.js';
import {commentStore} from '../../reduxStuff.js'
const {height} = Dimensions.get('window');
export default class CommentScreen extends Component {
  state = {
    inputHeight: 0,
    currentComment: -1,
    currentPost: commentStore.getState(),
    refreshing: false,
  }
  checkComment(){
    let newComment = commentStore.getState();
    if(typeof newComment == "object") {
      this.setState({currentComment:newComment.item})
      this.commentList.scrollToIndex({animated: true, index: newComment.item, viewOffset: height/3+50-newComment.height});
      this.input.focus();
    } else if (newComment !== -1 && newComment !== this.state.currentComment) {
      this.setState({currentComment:newComment})
      this.commentList.scrollToIndex({animated: true, index: newComment, viewOffset: height/3+10});
      this.input.focus();
    }
  }
  setCommentData = res => {
    const length = res.length
    this.setState({
      length: length
    })
    var newCommentData = res;
    var replies = [];
    var tempLength = newCommentData.length;
    var i = 0;
    while(i<tempLength) {
      if(newCommentData[i].parent!=null) {
        replies.push(newCommentData[i]);
        newCommentData[newCommentData[i].parent-1].children = replies;
        newCommentData[newCommentData[i].parent-1].hasChildren = true;
        newCommentData.splice(i, 1);
        tempLength--;
        i--;
      } else {
        newCommentData[i].hasChildren = false;
        newCommentData[i].number = i;
      }
      i++;
    }
    console.log(newCommentData)
    this.setState({commentData: newCommentData});
  }
  addComment = async () => {
    if(this.state.text.length>1) {
    let parent = (this.state.currentComment<0) ? null : this.state.currentComment;
    let betaUsername = await AsyncStorage.getItem('loginData');
    await fetch('http://Miless-MacBook-Pro.local:2999/addComment', {
          method: 'post',
          body:JSON.stringify({
            username: JSON.parse(betaUsername).username,
            body: this.state.text,
            parent: parent,
            videoID: this.state.currentPost,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        // .then(res=>res.json())
        // .then(res => this.changeNav(res))
    // this.setState({
    //   commentData: this.state.commentData.push()
    // })
  }
  }
  getStuff = async () => {
    await fetch('http://Miless-MacBook-Pro.local:2999/comments?id='+this.state.currentPost, {
      method: 'post',
    }).then(res=>res.json())
    .then(res => this.setCommentData(res))
  }
  async componentDidMount() {
    commentStore.dispatch({type:'besnons', payload: -1})
    this.getStuff();
    this.keyboardWillShowListener = Keyboard.addListener("keyboardWillShow",this.keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide",this.keyboardWillHide.bind(this));
    const commentCheckInterval = setInterval(()=>{this.checkComment()},144);
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
        onPress={this.addComment}
        style={[styles.whiteBackground, styles.goodShadow, styles.commentYesButton]}>
        <Image
          style={{width: 24, height: 24}}
          resizeMode={'contain'}
          source={require('../../../assets/Yes.png')}
          />
      </TouchableOpacity>
    )
  }

  editList = (res) => {
    if(res[Object.keys(res)[0]] !== this.state.length) {
      this.getStuff()
    }
  }

  onRefresh = async() => {
    this.setState({
      refreshing: true
    })
    await fetch('http://Miless-MacBook-Pro.local:2999/comments/check', {
        method: 'post',
        body: JSON.stringify(this.state.currentPost)
      }).then(res=>res.json())
      .then(res => this.editList(res)) 
    this.setState({
      refreshing: false
    })
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
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          ref={ref => { this.commentList = ref; }}
          style={styles.offset}
          data={this.state.commentData}
          initialScrollIndex={0}
          initialNumToRender={0}
          renderItem={({item})=>(
            <Comment
              user={item.username}
              emoji={item.emoji}
              comment={item.body}
              number={item.number}
              hasChildren={item.hasChildren}
              children={item.children}
              currentPost={this.state.currentPost}
              commentID={item.commentID}
              userID={this.state.userID}
              videoID={this.state.currentPost}
              likeAmount={item.likeAmount}
              />
            )
          }
          keyboardDismissMode={'on-drag'}
          keyExtractor={item => String(item.number)}
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
              onChangeText={(text) => this.setState({text})}
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