import React, {Component} from 'react';
import {View} from 'react-native'
import VideoScreen from '../Components/videoPart'
import Swiper from 'react-native-deck-swiper'
import {queueStore} from '../../reduxStuff'
export default class VideoContainer extends Component {
  state = {
    cards: queueStore.getState().data,
    cardIndex: queueStore.getState().current
  }
  renderCard = (card, index) => {
    return (
      <VideoScreen
        otherThingy={card.videoID}
        navigation={this.props.navigation}
        />
    )
  }
  render() {
    return (
      <View>
        <Swiper
          ref={ref => {this.swiper = ref}}
          showSecondCard={true}
          verticalSwipe={false}
          renderCard={this.renderCard}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          stackSize={2}
            >
          </Swiper>
        </View>
      )
    }
  }
