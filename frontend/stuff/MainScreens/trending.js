import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import SearchBar from './Components/search.js'
export default class Trending extends Component {
  render() {
    return(
      <View>
        <SearchBar 
          navigation={this.props.navigation}
        />
        <Text>hello</Text>
      </View>
    )
  }
}
