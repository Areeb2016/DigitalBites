'use strict';

import React, { Component } from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroAnimations,
  ViroNode,
  ViroButton,
  ViroDirectionalLight,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };
    
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, -1, -3]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#ffffff"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,0]}
          position={[0, 2, -15]} color="#ffffff" castsShadow={true} />
          {/* <ViroARPlane minHeight={.5} minWidth={.5} alignment={"Horizontal"}> */}
          <ViroNode position={[0,-15,-20]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject
    source={require("./res/Reuben_Sandwich_on_Plate_v2/13931_Reuben_Sandwich_on_Plate_v2_L1.obj")}
    resources={[require('./res/Reuben_Sandwich_on_Plate_v2/13931_Reuben_Sandwich_on_Plate_v2_L1.mtl'),
                require('./res/Reuben_Sandwich_on_Plate_v2/13931_Reuben_Sandwich_on_Plate_sandwich_spec.jpg'),
                require('./res/Reuben_Sandwich_on_Plate_v2/13931_Reuben_Sandwich_on_Plate_sandwich_diff.jpg'),
                 require('./res/Reuben_Sandwich_on_Plate_v2/Map__2_Normal Bump.jpg')
              ]}
    highAccuracyEvents={true}
    //position={[0, 0, -10]}
    scale={[1, 1, 1]}
    rotation={[-90, 45, 0]}
    type="OBJ"
    />
          
          {/* <ViroDirectionalLight
    color="#ffffff"
    direction={[0, -1, -1]}
 /> */}
 </ViroNode>
 {/* </ViroARPlane> */}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Reuben Sandwich!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
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

module.exports = HelloWorldSceneAR;
