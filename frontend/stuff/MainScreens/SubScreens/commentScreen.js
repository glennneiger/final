import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Dimensions, Keyboard, Image, AsyncStorage, RefreshControl, Modal, TouchableWithoutFeedback} from 'react-native';
import styles from '../../styles.js';
import BackButton from '../../IntroScreens/Components/BackButton';
import Comment from '../Components/commentComponents/comment.js';
import {commentStore} from '../../reduxStuff.js'
const {height} = Dimensions.get('window');
const heightInc = height/3+10; 
var commentCheckInterval;
export default class CommentScreen extends Component {
  state = {
    inputHeight: 0,
    currentComment: -1,
    currentPost: commentStore.getState(),
    refreshing: false,
    enabled: true,
    modalVisible: false,
  }
  checkComment(){
    let newComment = commentStore.getState();
    if(typeof newComment == "object") {
      var viewOffset = heightInc+40-newComment.height;
      this.setState({currentComment:newComment.item, enabled: false})
      if(newComment.parent !== undefined) { //if current comment has parent
        this.commentList.scrollToIndex({
          animated: true,
          index: newComment.parent,
          viewOffset: heightInc-newComment.height
        });
        // console.log(newComment.item);
      } else {
        this.commentList.scrollToIndex({
          animated: true,
          index: newComment.item,
          viewOffset: viewOffset
        });
      }
      this.input.focus();
    } else if (newComment !== -1 && newComment !== this.state.currentComment) {
      this.setState({currentComment:newComment, enabled: false})
      this.commentList.scrollToIndex({animated: true, index: newComment, viewOffset: heightInc});
      this.input.focus();
    } else {
      this.setState({enabled: true})
    }
  }
  setCommentData = res => {
    this.setState({ //this is for the refresh
      length: res.length
    })
    var newCommentData = res;
    var replies;
    var tempLength = newCommentData.length;
    var i = 0;
    while(i<tempLength) {
      newCommentData[i].children =[];
      if(newCommentData[i].parent!=null) {
        replies = (newCommentData[i]);
        newCommentData[newCommentData[i].parent-1].children.push(replies);
        newCommentData[newCommentData[i].parent-1].hasChildren = true;
        replies = null;
        newCommentData.splice(i, 1);
        tempLength--;
        i--;
      } else {
        newCommentData[i].hasChildren = false;
        newCommentData[i].number = i;
      }
      i++;
    }
    this.setState({commentData: newCommentData});
  }
  addComment = async () => {
    if(this.state.text.length>1) {
    let parent = (this.state.currentComment<0) ? null : this.state.currentComment+1;
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
  toggleModal = () => {
    console.log('hello');
    this.setState({modalVisible: true})
  }
  showOptions = () => {
    this.toggleModal();
  }
  async componentDidMount() {
    commentStore.dispatch({type:'besnons', payload: -1})
    this.getStuff();
    this.keyboardWillShowListener = Keyboard.addListener("keyboardWillShow",this.keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide",this.keyboardWillHide.bind(this));
    commentCheckInterval = setInterval(()=>{this.checkComment()},314);
  }
  async componentWillUnmount() {
    clearInterval(commentCheckInterval);
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
    const color = (this.state.enabled) ? 'rgb(30,30,30)' : 'rgb(255,255,255)'
    const comment = (this.state.currentComment !=-1) ? 'reply to Mileslow22' : 'Add a comment, bet'
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
      {/* <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}>
      <View style={[styles.actionModalBody]}>
        <View style={styles.actionModal}>
          <TouchableOpacity style={{flex:1}}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}}>
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal> */}
        <View style={[styles.whiteBackground, styles.goodShadow, styles.commentHeader, styles.row]}>
            <BackButton
              navigation={this.props.navigation}
              prevScreen={'VideoContainer'}
              size={36}
              />
          <View style={styles.container}><Text style={styles.commentHText}>Comments</Text>
        </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              tintColor={color}
            />
          }
          ref={ref => { this.commentList = ref; }}
          style={styles.offset}
          data={this.state.commentData}
          initialScrollIndex={0}
          initialNumToRender={0}
          renderItem={({item})=>(
            <TouchableWithoutFeedback
            onLongPress={this.showOptions}
            >
            <View>
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
              </View>
              </TouchableWithoutFeedback>
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