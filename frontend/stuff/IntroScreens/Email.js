import React, {Component} from 'react';
import Base from './Components/Base'
export default class Email extends Component{
    render() {
      return (
        <Base
          placeholder={'Your Email'}
          navigateTo={'Password'}
          navigation={this.props.navigation}
          autoCapitalize='none'
          prevScreen={'Username'}
          />
      );
    }
  }
