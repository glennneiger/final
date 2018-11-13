import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Animated
} from "react-native";
import styles from "../../styles";
import { vidStore, queueStore, modalStore } from "../../reduxStuff";
var int;
import VideoContainer from "../SubScreens/videoContainer";
export default class Thumbnail extends Component {
  state = {
    modalVisible: false
  };
  check () {
    if(modalStore.getState()) {
      setTimeout(()=>{this.delay()}, 200)
    }
  }
  componentWillMount() {
    int = setInterval(()=>this.check(), 100); 
  }
  componentWillUnmount() {
    clearInterval(int);
  }
  goToVideo() {
    vidStore.dispatch({
      type: "boonk",
      payload: {
        username: this.props.username,
        emoji: this.props.emoji,
        caption: this.props.caption
      }
    });
    queueStore.dispatch({ type: "change current", payload: this.props.thingy });
    this.setState({ modalVisible: true });
  }
  delay() {
    modalStore.dispatch({type: 'fsdas', payload: false})
    this.setState({ modalVisible: false });
  }
  renderBoy = () => {
    if (this.state.modalVisible) {
      return <VideoContainer navigation={this.props.navigation} />;
    } else {
      return <View />;
    }
  };
  render() {
    return (
      <View>
        <Modal transparent={true} visible={this.state.modalVisible}>
            ()=>
            {this.renderBoy()}
        </Modal>
        <TouchableOpacity
          style={[styles.goodShadow, styles.thumbnailContainer]}
          onPress={() => {
            this.goToVideo();
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri:
                "http://Miless-MacBook-Pro.local:5000/" +
                this.props.image +
                ".png"
            }}
          />
          <View style={[styles.videoCaptionContainer, styles.row]}>
            <Text
              style={[styles.videoCaption, styles.whiteText, { bottom: 40 }]}
            >
              {this.props.caption}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
