import React,{} from 'react';
import {
  Text, View, SafeAreaView, Dimensions,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default class Logout extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
      this.removeToken();
    }
      removeToken = async() => {
      await AsyncStorage.removeItem('token').then(() => {
        this.props.navigation.replace('Loginscreen')
      })
      await AsyncStorage.removeItem('cart')
    }
    render(){
      const screenHeight = Math.round(Dimensions.get('window').height)/2;
      return(
        <ActivityIndicator color='#8E0438' style={{paddingVertical:screenHeight}} />
      )
    }
    }