/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';
import { Header, Left, Icon, Container, Body, Card, CardItem, Right } from 'native-base';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene1 = require('./js/HelloWorldSceneAR');
var InitialARScene2 = require('./js/AR2');
var InitialARScene3 = require('./js/AR3');
var InitialARScene4 = require('./js/AR4');
var InitialARScene5 = require('./js/AR5');
var InitialARScene6 = require('./js/AR6');
var InitialARScene7 = require('./js/AR7');
var InitialARScene8 = require('./js/AR8');
var InitialARScene9 = require('./js/AR9');
var InitialARScene10 = require('./js/AR10');
var InitialVRScene = require('./js/HelloWorldScene');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE1 = "AR1";
var AR_NAVIGATOR_TYPE2 = "AR2";
var AR_NAVIGATOR_TYPE3 = "AR3";
var AR_NAVIGATOR_TYPE4 = "AR4";
var AR_NAVIGATOR_TYPE5 = "AR5";
var AR_NAVIGATOR_TYPE6 = "AR6";
var AR_NAVIGATOR_TYPE7 = "AR7";
var AR_NAVIGATOR_TYPE8 = "AR8";
var AR_NAVIGATOR_TYPE9 = "AR9";
var AR_NAVIGATOR_TYPE10 = "AR10";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator1 = this._getARNavigator1.bind(this);
    this._getARNavigator2 = this._getARNavigator2.bind(this);
    this._getARNavigator3 = this._getARNavigator3.bind(this);
    this._getARNavigator4 = this._getARNavigator4.bind(this);
    this._getARNavigator5 = this._getARNavigator5.bind(this);
    this._getARNavigator6 = this._getARNavigator6.bind(this);
    this._getARNavigator7 = this._getARNavigator7.bind(this);
    this._getARNavigator8 = this._getARNavigator8.bind(this);
    this._getARNavigator9 = this._getARNavigator9.bind(this);
    this._getARNavigator10 = this._getARNavigator10.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE1) {
      return this._getARNavigator1();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE2) {
      return this._getARNavigator2();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE3) {
      return this._getARNavigator3();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE4) {
      return this._getARNavigator4();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE5) {
      return this._getARNavigator5();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE6) {
      return this._getARNavigator6();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE7) {
      return this._getARNavigator7();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE8) {
      return this._getARNavigator8();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE9) {
      return this._getARNavigator9();
    }
    else if (this.state.navigatorType == AR_NAVIGATOR_TYPE10) {
      return this._getARNavigator10();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <Container style={{backgroundColor:'#8E0438'}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
          <Icon style={{color:'white'}} name='arrow-back' onPress={()=>this.props.navigation.replace("Products")}/>
        </Left>
        <Body><Text style={{fontSize:20, color:'white'}}>AR</Text></Body>
        <Right></Right>
      </Header>
      
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
        <Card>
          <CardItem>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Intructions:</Text>
            </CardItem>
            <CardItem>
            <Text>Press the AR button below to enter in AR mode.</Text>
            </CardItem>
            <CardItem>
            <Text>You can choose any item from the list to view it in AR.</Text>
            </CardItem>
            <CardItem>
            <Text>Drag item to move it on screen.</Text>
          </CardItem>
        </Card>
        <ScrollView>
          <View>
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE4)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Andana Kebap</Text>
          </TouchableHighlight>

        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE1)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Cake</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE2)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Egg Breakfast</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE6)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Apple Strudel</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE3)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Donut</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE5)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Burger</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE7)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Bagel with Cream Cheese</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE8)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Shrimp Sausage jambalaya</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE9)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Reuben Sandwich</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE10)}
            underlayColor={'#8E0438'} >

            <Text style={localStyles.buttonText}>Desert Pie</Text>
          </TouchableHighlight>

          </View>
          </ScrollView>
        </View>
      </View>
      </Container>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator1() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene1}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator2() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene2}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator3() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene3}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator4() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene4}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator5() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene5}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator6() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene6}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator7() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene7}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator8() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene8}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator9() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene9}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }

  _getARNavigator10() {
    return (
      <View style={localStyles.viroContainer}>
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene10}}/>
       
        <View style={{position: 'absolute', bottom: 20, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.exitButton}
            onPress={()=>this.props.navigation.replace("ARscreen")}
            underlayColor={'#00000000'} >
            <Text style={localStyles.buttonText}>Exit</Text>
          </TouchableHighlight>
        </View>
        </View>
    );
  }
  
  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro}/>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
    this.props.navigation.replace('Products')
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "#BA265E",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "white",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "white",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#8E0438',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#8E0438',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
