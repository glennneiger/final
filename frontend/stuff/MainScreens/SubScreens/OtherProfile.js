import React, {Component} from 'react';
import ProfileScreen from '../SubScreens/Profile';
import {currentUserStore, queueStore} from '../../reduxStuff' 
export default class OtherProfile extends Component {
  state = {
    videos: null,
    username: null,
    emoji: null,
  }
  async componentWillMount() {
    // let currentUser = JSON.stringify(currentUserStore.getState());
    let currentUser = JSON.stringify(2);
    fetch('http://Miless-MacBook-Pro.local:2999/userDisplay', {
      method: 'post',
      body:currentUser,
    }).then(res=>res.json())
      .then(res=>this.setData(res))
    fetch('http://Miless-MacBook-Pro.local:2999/postsFromUser', {
      method: 'post',
      body:currentUser,
    }).then(res=>res.json())
      .then(res=>this.setVideos(res))

    }
    setVideos(res) {
      var key = 0;
      var thumbnails = res
      while(key <= thumbnails.length-1) {
        thumbnails[key].key = key;
        key++
      }
      this.setState({
        videos: thumbnails
      })
      queueStore.dispatch({type:'queue', payload: thumbnails})
    }
    setData(res) {
      this.setState({
        username: res[0].username,
        emoji: String.fromCodePoint(res[0].emoji)
      })
    } //turns the codepoint of the users emoji into a viewable emoji


  render() {
    return(
      <ProfileScreen
        username={this.state.username}
        videos={this.state.videos}
        emoji={this.state.emoji}
        self={false}
        navigation={this.props.navigation}
        />
    )
  }
}

