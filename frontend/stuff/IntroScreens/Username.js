import React, {Component} from 'react';
import Base from './Components/Base'
export default class Username extends Component{
    render() {
      return (
        <Base
          placeholder={'Username'}
          navigateTo={'Email'}
          navigation={this.props.navigation}
          autoCapitalize='none'
          prevScreen={'FullName'}
          />
      );
    }
  }
