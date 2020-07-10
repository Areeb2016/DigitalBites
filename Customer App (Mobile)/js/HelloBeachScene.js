'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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

    this.state = {text : "Click outside to go back",} // Set initial state here
    this._onBoxHover = this._onBoxHover.bind(this);
    this._showThirdVrScene = this._showThirdVrScene.bind(this);
    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }
  
  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require('./res/kitch.jpg')} />
        <ViroText text={this.state.text} width={1} height={1} position={[-2, 0, -3]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[-2, -1, -3]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover} onClick={this._showThirdVrScene}/>
      </ViroScene>
    );
  }

  _onBoxHover(isHovering) {
    let text = isHovering ? "To top Floor!" : "Click the Box!";
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
