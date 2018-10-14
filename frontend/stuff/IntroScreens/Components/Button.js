import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo';
import styles from '../../styles.js'
export default class Button extends Component{
render() {
    return (
        <TouchableOpacity
          style={styles.goodShadow}
            onPress={() => this.props.navigation.navigate(this.props.navigateTo)}
            >
            <LinearGradient
              style={[styles.introButton]}
              colors={[this.props.backgroundColor1,this.props.backgroundColor2]}
              >
            <Text style={[styles.whiteText, styles.introButtonText]}>{this.props.text}</Text>
          </LinearGradient>
      </TouchableOpacity>
    );
  }
}
