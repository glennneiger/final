import React, {Component} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import styles from '../../styles'
import BackButton from '../../IntroScreens/Components/BackButton'
import Button from '../Components/Button'
export default class VidTooLong extends Component {
  render() {
    return (
      <View style={[styles.fullScreen, styles.whiteBackground]}>
        <BackButton
          navigation={this.props.navigation}
          prevScreen={'VideoCamera'}
          />
        <View style={[styles.horizontalCenterAlign, {top: 250}]}>
        <Text style={styles.slightlyBiggerText}>That video was longer than 12 seconds</Text>
        <View style={{height: 20}}></View>
          <Button
            text={"Choose Another"}
            backgroundColor1={"rgb(252,102,87)"}
            backgroundColor2={"rgb(253,187,87)"}
            actionType={"camera-roll"}
            navigation={this.props.navigation}
            />
      </View>
    </View>
    )
  }
}
