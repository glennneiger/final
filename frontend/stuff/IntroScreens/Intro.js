import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles.js'
import Button from './Components/Button'
export default class Intro extends Component {
    render() {
      return (
        <View style={[styles.whiteBackground, styles.fullScreen]}>
        <View style={styles.horizontalCenterAlign}>
          <View style={styles.introTopSpacer}></View>
        <View style={[styles.IntroContainer, styles.goodShadow]}>
          <View style={styles.introTopSpacer}></View>
            <View style={styles.introTopSpacer}></View>
          <Button text={"Login"}
            backgroundColor1={"#00C6FF"}
            backgroundColor2={"#0072FF"}
            navigation={this.props.navigation}
            navigateTo={'Login'}
            />
          <View style={{height: 20}}></View>
          <Button
            text={"Signup"}
            backgroundColor1={"rgb(252,102,87)"}
            backgroundColor2={"rgb(253,187,87)"}
            navigation={this.props.navigation}
            navigateTo={'FullName'}
            />
        </View>
        </View>
      </View>
      );
    }
  }
