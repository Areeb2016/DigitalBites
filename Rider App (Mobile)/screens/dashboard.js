import React, { Component } from "react";
import { Container, Header, Icon, Left, Body, Right, Text, Content,List } from "native-base";
import { StatusBar, FlatList, TouchableOpacity, StyleSheet, View ,AsyncStorage,ScrollView} from "react-native";
import moment from "moment";
import { Card } from "react-native-elements";
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'

export default class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      orders : [],
      isLoading: true, 
      latitude:null,
      longitude:null
    };
  }   

       async componentDidMount() {
        let location;
        let { status } = await Location.requestPermissionsAsync();
          if (status == 'granted') {
        console.log( "You can use the ACCESS_FINE_LOCATION" )
       location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
      this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
           })
             this.getData()
        }
      };

getData = async()=>{
     
  const token = await AsyncStorage.getItem("token")  

 const response = await fetch('https://digitalbites.herokuapp.com/rider/myorders',{
   headers:new Headers({
     Authorization:"Bearer "+token
   })
   }).then((response) => response.json())
    .then((responseJson) => {
  // console.log("Here", responseJson.Orders)
  this.setState({orders: responseJson.Orders});
})
.catch((error) => {
console.error(error);
});
 }
       
 getListViewItem = async(item) => {

  this.props.navigation.navigate(
    'Details',
    { itemId: item.order._id, 
      createdAt:item.order.createdAt,
      lat: parseFloat(item.order.latitude),
      lon: parseFloat(item.order.longitude)
    },
  );
 } 

 _getDistance = (lat, lon) => {
  var dis = getDistance(
    { latitude: lat, longitude: lon },
    { latitude: this.state.latitude, longitude: this.state.longitude }
  );
  var dist =  Math.round((dis/1000) * 10) / 10 ;
  return dist
};

_getTime = (lat, lon) => {
  var dis = getDistance(
    { latitude: lat, longitude: lon },
    { latitude: this.state.latitude, longitude: this.state.longitude }
  );
  var dist = dis/1000;
  var time = dist/60
  var t = Math.round(time * 10) / 10
  return t
};

    render(){
      console.disableYellowBox = true;
        return(
            <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>Dashboard</Text>
          </Body>
          <Right/>
        </Header>

          <Content>
          <FlatList 
     data = {this.state.orders}
     renderItem = {({item, index}) =>
     <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} activeOpacity={0.9}>
       <Card>
         <View style={{flexDirection:'column'}}>

           <View style={{flexDirection:'row', alignItems:'center'}}>

             <View style={{flexDirection:'row'}}>
             {/* <MCIcon name='food' size={40} color='#8E0438'/> */}
        <Text style={{textAlignVertical:'bottom', marginLeft:5, fontSize:20, fontWeight:'bold'}}>Order # {index}</Text>
        </View>

      <View style={{flexDirection:'row', right:70, position:'absolute'}}>
      {/* <MCIcon name='file-document' size={30} color='#8E0438'/> */}
        <Text style={{textAlignVertical:'bottom', marginLeft:5, fontWeight:'normal', fontStyle:'italic'}}>{item.order.status}</Text>
        </View>
        
        </View>

        <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>

          <View style={{flexDirection:'row'}}>
            <MCIcon name='bike' size={20} color='#8E0438'/>
        <Text style={{fontStyle:'italic', fontWeight:'normal', textAlignVertical:'bottom', marginLeft:5}}>{this._getDistance(item.order.latitude, item.order.longitude)} KM away</Text>
        </View>

        <View style={{flexDirection:'row', right:50, position:'absolute'}}>
        <MCIcon name='timer' size={20} color='#8E0438' style={{marginTop:5}}/>
        <Text style={{fontStyle:'italic', fontWeight:'normal', textAlignVertical:'bottom', marginLeft:5}}>{this._getTime(item.order.latitude, item.order.longitude)} hours away </Text>
        </View>

        </View>
        <MIcon name='keyboard-arrow-right' size={30} color='#8E0438' style={{position:'absolute', right:0, top:20, bottom:20}}/>
         </View>
       </Card>
           
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
      />
          </Content>

            </Container>
        )
    }
}
const Styles = StyleSheet.create({
    contentContainerStyle: {
      paddingVertical: 20,
      width: '100%',
      alignSelf: 'center',
    },
    Seprator: {
      marginBottom: 10,
    },
    MainCard: {
      width: '90%',
      backgroundColor: 'white',
      alignSelf: 'center',
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
  
    SmallText: {
      color: '#8E0438',
      fontSize: 16,
    },
    MediumBoldText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    Left: {
      width: '50%',
      // backgroundColor: 'green',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    Middle: {
      width: '35%',
      // backgroundColor: 'red',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    Right: {
      width: '10%',
      // backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });