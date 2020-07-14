'use strict';

import React, { Component } from 'react';

import {StyleSheet, AsyncStorage} from 'react-native';

import {
  ViroScene,
  Viro360Image,
} from 'react-viro';

export default class HelloBeachScene extends Component {
  constructor() {
    super();
  
    this.state = {img: "", show: false} // initialize state
  
    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }

  async componentDidMount(){
    const token =  await AsyncStorage.getItem("token")
    const res = await AsyncStorage.getItem("restaurant")
    
    const response = await fetch('https://digitalbites.herokuapp.com/restaurant/'+res ,{
        headers:new Headers({
          Authorization:"Bearer "+token
        })
        })
        .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ 
        img: responseJson.vrimage2,
        show: true
      })
      // alert(this.state.img)
  })
  }
  
  render() {
    if(this.state.show == true){
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={{uri: this.state.img}} />
      </ViroScene>
    );
    }
    else if(this.state.show == false) {
      return(
        <ViroScene>

        </ViroScene>
      )
    }
  }

  _showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }

}

module.exports = HelloBeachScene;
