import React, { Component } from "react";
import { Dimensions } from "react-native";
import VideoScreen from "../Components/videoPart";
import Swiper from "../Swiper/index";
import { queueStore } from "../../reduxStuff";
const { height } = Dimensions.get("screen");
var int;
export default class VideoContainer extends Component {
  state = {
    cards: queueStore.getState().data,
    cardIndex: queueStore.getState().current
  };
  goBack = () => {
    this.props.navigation.navigate("profile");
  };
  renderCard = (card, index) => {
    return (
      <VideoScreen 
      navigation={this.props.navigation}
      videoID={card.videoID} navigation={this.props.navigation} />
    );
  };
  render() {
    return (
      <Swiper
        ref={ref => {
          this.swiper = ref;
        }}
        onSwipedAll={() => this.goBack()}
        showSecondCard={true}
        verticalSwipe={false}
        renderCard={this.renderCard}
        cards={this.state.cards}
        cardIndex={this.state.cardIndex}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        stackSize={2}
        stackSeparation={0}
        backgroundColor={"rgb(255,255,255)"}
      />
    );
  }
}
