'use strict';

import React, { Component } from 'react';

import {StyleSheet, AsyncStorage} from 'react-native';

import {
  ViroScene,
  Viro360Image,
  ViroBox,
  ViroMaterials,
  ViroText
} from 'react-viro';

export default class HelloBeachScene extends Component {
  constructor() {
    super();

    this.state = {text : "Click outside to go back", img: "", show: false} // Set initial state here
    this._onBoxHover = this._onBoxHover.bind(this);
    this._showThirdVrScene = this._showThirdVrScene.bind(this);
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
        img: responseJson.vrimage1,
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
        <ViroText text={this.state.text} width={1} height={1} position={[-1, 0, -4]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[-1, -1, -4]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover} onClick={this._showThirdVrScene}/>
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

  _onBoxHover(isHovering) {
    let text = isHovering ? "To Next!" : "Click the Box!";
    this.setState({
      text
    });
}

_showThirdVrScene() {
  this.props.sceneNavigator.push({scene:require("./ThirdVrScene.js")});
}

_showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }

}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',  
    },
  });
  
  ViroMaterials.createMaterials({
    grid: {
      diffuseTexture: require('./res/grid_bg.jpg'),
    },
  });

module.exports = HelloBeachScene;
