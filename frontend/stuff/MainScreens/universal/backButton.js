import React, { Component } from "react";
import { View, TouchableOpacity, Image, AppRegistry } from "react-native";
import styles from "../../styles.js";

export default class BackButton extends Component {
  goBack() {
    this.props.navigation.navigate(this.props.prevScreen);
  }
  render() {
    let push = this.props.size === 36 ? 11 : 0;
    if(this.props.display){
    return (
      <TouchableOpacity
        style={[
          styles.backButton,
          styles.goodShadow,
          styles.justifyContentCenter,
          styles.alignItemsCenter,
          styles.absolute,
          {
            width: this.props.size,
            height: this.props.size,
            left: this.props.left,
            top: this.props.top
          }
        ]}
        onPress={() => {
          this.goBack();
        }}
      >
        <Image
          style={{
            right: 2,
            height: (this.props.size * 3) / 5,
            width: (this.props.size * 2) / 5
          }}
          source={require("../../../assets/Back-Button.png")}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  }     else {
        return null;
    }
    }
}
// AppRegistry.registerComponent("DisplayAnImage", () => DisplayAnImage);
