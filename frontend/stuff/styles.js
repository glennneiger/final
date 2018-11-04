import {StyleSheet, Text, View, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('screen');

export default styles = StyleSheet.create({
    IntroContainer: {
      height: height*0.45,
      width: width*0.9,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      shadowColor: 'rgb(152, 152, 152)',
      shadowOpacity: 10,
      shadowRadius: 25,
      borderRadius: 25,
    },
    horizontalCenterAlign: {
      alignItems: 'center',
    },
    fullScreen: {
      width: 100 + '%',
      height: height
    },
    introTopSpacer: {
      height: height*0.12
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    goodShadow: {
      shadowRadius: 4,
      shadowColor:'rgb(193, 193, 193)',
      shadowOpacity: 3,
      shadowOffset: {height: 0},
      elevation: 17
    },
    introButton: {
        borderRadius: height*0.03,
        width: width*0.3,
        height: height*0.06,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slightlyBiggerText: {
      color: '#636262',
      fontSize: 16,
      fontWeight: '400'
    },
    otherButton: {
        borderRadius: height*0.03,
        height: height*0.06,
        alignItems: 'center',
        justifyContent: 'center',
    },
    introField: {
      width: 270,
      height: 35,
      borderRadius: 14,
      textAlign: 'center',
      fontSize: 17
    },
    captionField: {
      width: width*.8,
      borderRadius: 14,
      textAlign: 'center',
      fontSize: 17
    },
    whiteText: {
      color: 'rgb(255, 255, 255)'
    },
    whiteBackground: {
      backgroundColor: 'rgb(255, 255, 255)'
    },
    introButtonText: {
      fontSize: 17,
    },
    circleButton: {
        borderRadius: height*0.09,
        width: width*0.18,
        height: width*0.18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentYesButton: {
      height: 35,
      width: 35,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    introBioField: {
      textAlign: 'center',
      fontSize: 17
    },
    emojiCheckerModal: {
      paddingTop: 70,
      alignItems: 'center',
      justifyContent: 'center'
    },
    emojiCheckerModalBody: {
      alignItems: 'center',
      width: width*.89,
      height: width*1.1,
      backgroundColor: '#ffffff',
      borderRadius: 25,
    },
    emojiCheckerEmoji: {
      fontSize: 140,
    },
    alignItemsCenter: {
      alignItems: 'center',
      alignSelf: 'center'
    },
    justifyContentCenter: {
      justifyContent: 'center'
    },
    row: {
      flexDirection: 'row',
    },
    backButton: {
      backgroundColor: '#ffffff',
      borderRadius: 25,
      zIndex: 20,
    },
    shutterButton: {
      width: width * 0.22,
      height: width * 0.22,
      borderRadius: width * 0.11,
      backgroundColor: '#ffffff',
      marginTop: height*0.78
    },
    icons: {
      marginBottom: 15,
    },
    viewBar: {
      top: 20,
      height: 16,
      borderRadius: 8,
      position: 'absolute'
    },
    annoying: {
      left: 5 + '%'
    },
    category: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 8,
      marginRight: 8
    },
    dontAsk: {
      top: Math.round(height*0.3),
      position: 'absolute'
    },
    profileTopBar: {
      marginTop: width*.05,
      width: width,
      height: width*.13,
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: width*.07,
    },
    videoTopBar: {
      width: width,
      height: width*.13,
      backgroundColor: 'rgb(255, 255, 255)',
      borderBottomLeftRadius: width*.07,
      borderBottomRightRadius: width*.07,
    },
    videoUserBar: {
      width: width*0.45,
      height: width*.13,
      backgroundColor: 'rgb(255, 255, 255)',
      borderBottomLeftRadius: width*.07,
      borderBottomRightRadius: width*.07,
    },
    userBar: {
      width: width*0.45,
      height: width*.13,
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: width*.07,
    },
    userTextBarContent: {
      right: 7,
      bottom: 1,
    },
    profileStatBar: {
      zIndex: -1,
      width: 100 + '%',
      height: width*0.14,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    userBarEmoji: {
      fontSize: 30,
       marginLeft:10,
       marginTop: 10
    },
    commentEmoji: {
      fontSize: 36,
      left: 8,
      top: 5
    },
    spaceBetween: {
      justifyContent: 'space-evenly'
    },
    userBarUsername: { //doesnt work for some reason
      marginLeft: 5,
      fontSize: 20,
      marginTop: 15
    },
    profileButton: {
      marginLeft: 15,
      width: 40,
      height: 40,
      borderRadius: 25,
    },
    image: {
      width: width*.33-10,
      height: (width*.33-10)*16/9,
      borderRadius: 20,
    },
    videoCaptionContainer: {
      alignItems: 'flex-end',
      marginLeft: 5,
      marginRight: 5,
      // backgroundColor:'rgba(0, 255, 10, 0.8)',
      width: width*.33-30,
    },
    videoCaption: {
      fontWeight: 'bold',
      bottom: 20,
    },
    thumbnailContainer: {
      marginLeft: 8.5,
      width: width*.33-10,
      height: (width*.33-10)*16/9,
      borderRadius: 20,
      marginBottom: 8.5,
    },
    postActionBar: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: 100 + '%',
      height: 105,
      top: height - 105,
    },
    absolute: {
      position: 'absolute'
    },
    column: {
      flexDirection: 'column'
    },
    videoCaption: {
      fontSize: 17,
      fontWeight: '600',
      color: 'rgb(122, 122, 122)',
      marginLeft: 10,
      marginRight: 10,
    },
    videoActionButton: {
      borderRadius: height*0.065,
      width: width*0.13,
      height: width*0.13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    likeAmount: {
      color: 'rgb(255,0,41)',
      fontWeight: 'bold'
    },
    commentBar: {
      borderRadius: width*0.07,
      height: width*0.13,
      width: 90 + '%',
      left: 4,
    },
    commentText: {
      fontSize: 12,
      color: 'rgb(73, 73, 73)',
    },
    bold: {
      fontWeight: 'bold',
    },
    commentListItem: {
      width: 100+'%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
    },
    commentChild: {
      width: 90+'%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25
    },
    commentShadowCover: {
      zIndex: 1,
      position: 'absolute',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: 'rgb(255, 255, 255)'
    },
    commentLike: {
      borderRadius: 17.5,
      width: 35,
      height:35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    commentHeader: {
      height: height*0.1,
      width: 100+'%',
      borderBottomRightRadius: height*0.05,
      borderBottomLeftRadius: height*0.05,
      zIndex: 2,
      position: 'absolute',
    },
    offset: {
      marginTop: height*0.1
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  col: {
    flexDirection: 'column'
  },
  commentHText: {
    fontSize: 16,
    fontWeight: '400',
  },
  commentFooter: {
    height: 60,
    width: 100 + '%',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    zIndex: 1
  },
  commentInput: {
    height: 35,
    borderRadius: 35
  },
  commentContentFixer: {
    flex:9,
  },
  actionModalBody: {
    backgroundColor: 'rgb(255,255,255)',
    width: width*0.8,
    height: width*0.8,
  },
  actionModal: {
    flex: 1,
    justifyContent: 'space-between'
  },
  exploreBody: {
    width: 100+'%',
    height: height/10+5,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  searchBar: {
    marginTop: 24,
    alignSelf: 'center',
    width: 93+'%',
    height: 30,
    flexDirection: 'row',
    borderRadius: 15
  },
  searchBarInput: {
    flex: 20,
    color: 'rgb(145,145,145)'
  },
  searchBarFinal: {
    marginTop: 24,
    alignSelf: 'center',
    width: 100+'%',
    height: 30,
    flexDirection: 'row',
    borderRadius: 15
  },
  searchItem: {
    width: 100+'%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 45,
    backgroundColor: 'rgb(255,255,255)',
  },
  linkUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  linkFollowCount: {
    fontWeight: '400',
    fontSize: 14,
    flex: 1,
    color: 'rgb(145,145,145)'
  },
  linkShadowCover: {
    width: 100+'%',
    height: 30,
    top: 20,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  followBtn: {
    width: 70,
    height: 30,
    borderRadius: 15,
  },
  followBtnTxt: {
    
  },
  });
