
import React, { Component } from 'react';
import {  Linking, Platform, ImageBackground, View,AsyncStorage,FlatList, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Body, Title,  Left, Right, Text, List, ListItem} from 'native-base';
import { Icon, Card } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo' 
import { Modal } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'

export default class ListDividerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    data : [],
    lati: 0,
    longi:0,
    nam:''
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData = async()=>{
    const token = await AsyncStorage.getItem("token")  
    const res = await AsyncStorage.getItem("restaurant")
    
    const response = await fetch('https://digitalbites.herokuapp.com/restaurant/'+res ,{
      headers:new Headers({
        Authorization:"Bearer "+token
      })
      }
      ).then((response) => response.json())
.then((responseJson) => {  
this.setState({
data: responseJson,
nam: responseJson.name,
lati: JSON.parse(responseJson.latitude),
longi: JSON.parse(responseJson.longitude)
});
})
.catch((error) => {
console.error(error);
});
}
  makeCall = (call) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${call}`;
    } else {
      phoneNumber = `telprompt:${call}`;
    }
    Linking.openURL(phoneNumber);
  };
  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left><Icon color='white' name='arrow-back' onPress={()=>this.props.navigation.replace("Restaurantscreen")}/></Left>
        <Body><Text style={{fontSize:20, color:'white'}}>{this.state.data.name}</Text></Body>
        <Right>
              <Ionicons size={28} name='ios-cart' color='white' onPress={()=>this.props.navigation.replace("Cart")}/>
          </Right>
        </Header>
        <Content>
        <ImageBackground source={{uri:this.state.data.image}} style={{width: '100%', height: '50%'}}/>
       
          <List style={{marginTop:-230, marginBottom:500}}>
            <Card>
          <ListItem itemDivider 
          //style={{backgroundColor:'#BA265E'}}
          >
              <Text>Actions</Text>
            </ListItem> 
           
            <ListItem >
            <Text style={{marginLeft:-3}}></Text>   
          <Icon 
           iconStyle ={{}}
          onPress={()=>this.props.navigation.replace("Menu")}
  reverse
  name='restaurant'
  color='#8E0438'
/>
   <Text style={{marginLeft:'5%'}}></Text>     
<Icon 
       onPress={()=>this.props.navigation.replace("Reservation")}
  reverse
  name='people'
  
  color='#8E0438'
/>

<Text style={{marginLeft:'7%'}}></Text>     
         
          <Icon
         // style={{marginLeft:30}}
         onPress={()=>this.props.navigation.replace("VRscreen")}
  reverse
  name='camera'
  
  color='#8E0438'
/>

         
<Text style={{marginLeft:'4%'}}></Text>
           
          <Icon
           onPress={()=>this.props.navigation.replace("Ratings")}
  reverse
  name='star'
  
  color='#8E0438'
/>

</ListItem>
              
            <ListItem>
           
            <Text style={{marginLeft:'3%', fontWeight:'bold'}}>Menu </Text>
            <Text style={{marginLeft:'4%', fontWeight:'bold'}}> Reservation </Text>
            <Text style={{marginLeft:'3%', fontWeight:'bold'}}> VR 360 </Text>
            <Text style={{marginLeft:'5%', fontWeight:'bold'}}> Ratings </Text>
            </ListItem>
            </Card>
            
            <Card>
            <ListItem itemDivider 
            //style={{backgroundColor:'#BA265E'}}
            >
              <Text>Details</Text>
            </ListItem>      
            <ListItem>
            <Entypo name='info-with-circle' size={30} color='#8E0438'/>
          <Text style={{fontWeight:'bold', marginLeft:'3%'}}>{this.state.data.description}</Text>
            </ListItem>
            <ListItem>
            <Icon name='home' size={30} color='#8E0438'/>
            <Text style={{fontWeight:'bold', marginLeft:'3%'}}>{this.state.data.address}</Text>
            </ListItem>
            <ListItem>
            <Icon name='timer' size={30} color='#8E0438'/>
            <Text style={{fontWeight:'bold', marginLeft:'3%'}}>{this.state.data.estimatedDeliveryTime} mins</Text>
            </ListItem>
            
            <ListItem >
            <Icon name='call' size={30} color='#8E0438'/>
          <Text style={{fontWeight:'bold', marginLeft:'3%'}}>{this.state.data.contactNumber}</Text>
            </ListItem>  
            
            </Card>

          <ListItem style={{borderBottomWidth:0, marginLeft:'20%', marginRight:'20%'}}>
            <TouchableOpacity onPress={() => this.makeCall(this.state.data.contactNumber)} style={{backgroundColor:'#8E0438', padding:'10%', borderRadius:40}}>
          <Icon name='call' size={30} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ResMap', {lat: this.state.lati, lon: this.state.longi, rest: this.state.nam})} style={{backgroundColor:'#8E0438', padding:'10%', marginLeft:'40%', borderRadius:40}}>
          <Foundation name='map' size={30} color='white' style={{paddingHorizontal:'2%'}}/>
          </TouchableOpacity>
          </ListItem>

          </List>
                
        </Content>
  
      </Container>
    );
  }
}