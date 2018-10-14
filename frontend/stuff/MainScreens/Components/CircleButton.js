import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../styles.js'
export default class CircleButton extends Component {

goToLands() {
  this.props.navigation.navigate(this.props.navigateTo)
}

render() {
  var color2 = (this.props.good) ?
  "#00C6FF"
  :
  "#EE0979"
  var color1 = (this.props.good) ?
  "#0072FF"
  :
  "#FF6A00"
  var icon = (this.props.good) ?
  require('../../../assets/White-Check.png')
  :
  require('../../../assets/White-X.png')
    return (
        <TouchableOpacity
            onPress={() => {this.goToLands()}}
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              zIndex: 10
            }}
        >
        <LinearGradient
          style={[styles.circleButton]}
          colors={[color1,color2]}
        >
        <Image source={icon}/>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
