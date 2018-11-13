import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Easing,
  Animated
} from "react-native";
import { Camera, Permissions, ImagePicker } from "expo";
import styles from "../styles";
import { postStore } from "../reduxStuff";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const rate = 100 / 288;
export default class VideoCamera extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: false,
    flashMode: "off",
    type: "front",
    toggled: true,
    fill: 0
  };
  reverseSize = new Animated.Value(1);
  squareSize = new Animated.Value(1);
  flashSize = new Animated.Value(1);
  toggleFacing = () => {
    Animated.spring(this.reverseSize, {
      toValue: 1.2,
      bounciness: 50,
      useNativeDriver: true,
      overshootClamping: true,
      speed: 10
    }).start();
    setTimeout(() => {
      Animated.spring(this.reverseSize, {
        toValue: 1,
        bounciness: 50,
        useNativeDriver: true,
        overshootClamping: true,
        speed: 10
      }).start();
    }, 250);
    this.setState({ type: this.state.type === "back" ? "front" : "back" });
  };
  toggleFlash = () => {
    Animated.spring(this.flashSize, {
      toValue: 1.2,
      bounciness: 50,
      useNativeDriver: true,
      overshootClamping: true,
      speed: 10
    }).start();
    setTimeout(() => {
      Animated.spring(this.flashSize, {
        toValue: 1,
        bounciness: 50,
        useNativeDriver: true,
        overshootClamping: true,
        speed: 10
      }).start();
    }, 250);
    if (!this.state.flash == true) {
      this.setState({ flash: true });
    } else {
      this.setState({ flash: false, flashMode: "off" });
    }
  };
  takeVideo = async () => {
    Animated.spring(this.squareSize, {
      toValue: 50
    }).start();
    if (this.state.toggled) {
      this.circle.animate(100, 10000, Easing.linear);
    } else {
      Animated.spring(this.squareSize, {
        toValue: 0
      }).start();
      this.camera.stopRecording();
    }
    this.setState({ toggled: !this.state.toggled });
    if (this.state.flash) {
      this.setState({ flashMode: "torch" });
    }
    let video = await this.camera.recordAsync({
      quality: "720p",
      onPictureSaved: this.onPictureSaved,
      maxDuration: 12
    });
    postStore.dispatch({ type: "uri", payload: video.uri });
    this.props.navigation.navigate("Preview");
  };
  stopVideo = () => {
    this.setState({ toggled: false, flashMode: "off" });
  };
  async pickVideos() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Videos"
    });
    if (result.cancelled === false) {
      if (result.duration >= 12000) {
        this.props.navigation.navigate("VidTooLong");
      } else {
        postStore.dispatch({ type: "uri", payload: result.uri });
        this.props.navigation.navigate("Preview");
      }
    }
  }
  async componentWillMount() {
    const audioStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const rollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const camStatus = await Permissions.askAsync(Permissions.CAMERA);
    if (
      audioStatus.status === "granted" &&
      rollStatus.status === "granted" &&
      camStatus.status === "granted"
    ) {
      this.setState({ hasCameraPermission: "granted" });
    } else {
      this.setState({ hasCameraPermission: false });
    }
  }
  render() {
    const flash = this.state.flash ? "flash" : "flash-off";
    if (this.state.hasCameraPermission === false) {
      return (
        <View
          style={[
            { marginTop: 300, marginBottom: 300 },
            styles.horizontalCenterAlign
          ]}
        >
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.fullScreen}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.toggleFlash}
            style={{
              bottom: 15,
              position: "absolute",
              zIndex: 51,
              right: 15,
              width: 70,
              height: 70,
              transform: [
                { scaleY: this.flashSize },
                { scaleX: this.flashSize }
              ]
            }}
          >
            <MaterialCommunityIcons
              style={{
                bottom: 15,
                position: "absolute",
                zIndex: 50,
                right: 20
              }}
              name={flash}
              size={37}
              color={"rgb(255, 255, 255)"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.toggleFacing}
            style={{
              bottom: 15,
              position: "absolute",
              zIndex: 51,
              left: 15,
              width: 70,
              height: 70,
              transform: [
                { scaleY: this.reverseSize },
                { scaleX: this.reverseSize }
              ]
            }}
          >
            <EvilIcons
              style={{
                bottom: 15,
                position: "absolute",
                zIndex: 50,
                left: 15
              }}
              name="refresh"
              size={50}
              color={"rgb(255, 255, 255)"}
            />
          </TouchableOpacity>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            flashMode={this.state.flashMode}
            type={this.state.type}
          >
            <View />
            <View
              style={[
                {
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  width: 100 + "%",
                  justifyContent: "center",
                  bottom: 50
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={styles.shutterButton}
                onPressIn={this.takeVideo}
                onPressOut={this.stopVideo}
              >
                <Animated.View
                  style={[
                    {
                      width: this.squareSize,
                      height: this.squareSize,
                      borderRadius: 10
                    },
                    styles.stopSquare
                  ]}
                />
                <AnimatedCircularProgress
                  ref={ref => (this.circle = ref)}
                  size={100}
                  width={8}
                  tintColor="rgb(255,0,0)"
                  backgroundColor="rgb(255,255,255)"
                  prefill={0}
                  fill={0}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                width: 100 + "%",
                justifyContent: "space-around",
                marginBottom: 50
              }}
            >
              <View style={{ flex: 1.4 }} />
              // beginning of vid picker
              {/* <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  flex: 2
                }}
                onPress={() => this.pickVideos()}
              >
                <Image
                  style={styles.icons}
                  source={require("../../assets/Library.png")}
                />
              </TouchableOpacity> */}
              // beginning of flash
            </View>
          </Camera>
        </View>
      );
    }
  }
}
