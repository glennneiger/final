import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, AsyncStorage} from 'react-native';
import {LinearGradient} from 'expo';
import styles from '../../../styles.js';
import {commentStore} from '../../../reduxStuff.js'
export class BabyComment extends Component {
    constructor(props) {
        super(props);
        var hasExpander = false;
        if(this.props.comment.length>= 36) {
        hasExpander = true
        }
        this.state = {
        hasExpander: hasExpander,
        expanded: false,
        emoji: this.props.emoji,
        height: 40,
        liked:this.props.liked,
        commentID: this.props.commentID,
        likeAmount: this.props.likeAmount
        }
    }
    async likeToggle() { //likes the video
      this.setState({liked: !this.state.liked})
      if(!this.state.liked) {
        this.setState({
          likeAmount: this.state.likeAmount+1
        })
      } else {
        this.setState({
          likeAmount: this.state.likeAmount-1
        })
      }
      let userID = await AsyncStorage.getItem("userID");
      let obj = {userID: JSON.parse(userID), commentID: this.state.commentID, videoID: this.props.videoID}
      await fetch('http://Miless-MacBook-Pro.local:2999/like?video=false&liked='+this.state.liked, {
        method: 'post',
        body:JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
    otherToggle = res => {
      this.setState({liked: res})
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
        <Text style={{fontWeight: 'normal', fontSize: 13}}>{this.props.comment.substring(0, 36)}{this.expander()}</Text>
    )
    } else {
      return (
        <Text style={{fontWeight: 'normal', fontSize: 13}}>{this.props.comment}</Text>
      )
    }
  }
  toggleExpand = () => { //expands comment height based on text in the body
    let commentSize = this.props.comment.length;
    var i = 0;
    var height = 20;
    while(i<=commentSize) {
      height +=18
      i += 30;
    }
    this.setState({
      expanded: !this.state.expanded,
      height: height
    })
  }
    setReply = () => {
            commentStore.dispatch({type: 'fleebonejim',
            payload: {
              parent: this.props.parent,
              item: this.props.parent,
              height: ((this.props.number)*50)
            }
            })
        }
    render() {
        let like = (this.state.liked) ?  require('../../../../assets/Like.png') :  require('../../../../assets/NoLike.png')
        let likeSizeBug = (this.state.liked) ? 22 : 30
        return (
<View style={{marginTop: 10, left: 10+'%'}}>
      <View style={[styles.commentChild, styles.whiteBackground, styles.row, {height: this.state.height, zIndex: 2}]}>
          <View style={[styles.row, {flex:11}]}>
              <Text style={{fontSize: 25, paddingLeft: 3, paddingRight: 3}}>{this.state.emoji}</Text> //the emoji
              <Text style={{fontWeight: 'bold', fontSize: 14}}>{this.props.user + ' '}
                {this.renderBody()}
              </Text>
          </View>
          <View style={[styles.row, {flex:7, bottom: 2, left: 4, height:100+'%'}, styles.justifyContentCenter]}>
            <TouchableOpacity
              onPress={()=>{this.setReply()}}
              style={{right: 9, top: 8}}>
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
                top: 20,
                color:'rgb(86, 86, 86)',
                position: 'absolute',
                left: 105
              }}>{this.state.likeAmount}</Text>
          </View>
      </View>
      <View style={[
        styles.commentShadowCover,
        styles.column,
        {height:this.state.height/2,
        top: this.state.height/2,
        width: 90+'%'},
        styles.goodShadow]}>
      </View>
    </View>
        )
    }
}
export default class BabyComments extends Component {
  
    render() {
      var i = 0;
        const childAmount = this.props.commentData.length
        while(i<childAmount) {
          this.props.commentData[i].number = i+1;
          i++;
        }
        return (
            <FlatList
          ref={ref => { this.commentList = ref; }}
          data={this.props.commentData}
          renderItem={({item})=>(
              <BabyComment
                parent={this.props.parent}
                user={item.username}
                emoji={String.fromCodePoint(item.emoji)}
                comment={item.body}
                number={item.number}
                amount={childAmount}
                commentID={item.commentID}
                likeAmount={item.likeAmount}
              />
          )}
          keyExtractor={item => String(item.number)}
            />
        )
    }
}
