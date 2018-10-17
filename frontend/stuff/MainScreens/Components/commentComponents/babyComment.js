import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import styles from '../../../styles.js';
import commentStore from '../../../reduxStuff'
class BabyComment extends Component {
    setReply = () => {
        commentStore.dispatch({type: 'other', payload: this.props.number-1})
      }
    render() {
        return (
            <View style={{marginTop: 10, alignSelf: 'flex-end'}}>
                <View style={[styles.commentChild, styles.whiteBackground, styles.row, {height:40, zIndex: 2}]}>
                    <View style={[styles.row, {flex:11}]}>
                        <Text style={{fontSize: 22}}>{this.props.emoji}</Text> //the emoji
                        <Text style={{fontWeight: 'bold', fontSize: 13}}>{this.props.username + ' '}
                            <Text style={{fontSize: 13, fontWeight: 'normal'}}>{this.props.comment}</Text>
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
                        style={[styles.commentLike, styles.whiteBackground, styles.goodShadow]}>
                        <Image
                            style={{width: 30, height:30}}
                            resizeMode={'contain'}
                            source={require('../../../../assets/Like.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.commentShadowCover, styles.column, {height:30, top: 10, width: 90+'%',
                //  backgroundColor: 'rgb(255,0,0)'
                 }, styles.goodShadow]}>
                </View>
          </View>
        )
    }
}
export default class BabyComments extends Component {
    render() {
        console.log(this.props.commentData);
        return (
            <FlatList
          ref={ref => { this.commentList = ref; }}
          data={this.props.commentData}
          renderItem={({item})=>(
              <BabyComment
              username={item.username}
              emoji={String.fromCodePoint(item.emoji)}
              comment={item.body}
              number={item.number}
              />
          )}
          keyExtractor={item => String(item.number)}
            />
        )
    }
}
