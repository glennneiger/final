import React, {Component} from 'react';
import Base from './Components/Base'
export default class FullName extends Component{
    render() {
      return (
        <Base
          placeholder={'Full Name'}
          buttonText={'Confirm'}
          navigateTo={'Username'}
          navigation={this.props.navigation}
          autoCapitalize={'words'}
          prevScreen={'Intro'}
          />
      );
    }
  }
