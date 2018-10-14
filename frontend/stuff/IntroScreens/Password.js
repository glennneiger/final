import React, {Component} from 'react';
import Base from './Components/Base'
export default class Password extends Component{
    render() {
      return (
        <Base
          placeholder={'Password'}
          buttonText={'Confirm'}
          navigateTo={'ProfilePicker'}
          navigation={this.props.navigation}
          autoCapitalize='none'
          prevScreen={'Email'}
          />
      );
    }
  }
