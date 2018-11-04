import React, {Component} from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../../styles.js'
export default class SearchBar extends Component {
    render() {
        return (
            <View style={[
                styles.whiteBackground,
                styles.exploreBody,
                styles.goodShadow
                ]}> //whole thing
                <View style={[
                    styles.searchBar,
                    styles.goodShadow,
                    styles.whiteBackground,
                    ]}> //search bar part
                    <View style={{flex: 1}}/> //placeholder
                    <TextInput
                        style={styles.searchBarInput}
                        onFocus={()=>this.props.navigation.navigate('search')}
                        placeholder={"Search"}
                    />
                </View>
            </View>
        )
    }
}