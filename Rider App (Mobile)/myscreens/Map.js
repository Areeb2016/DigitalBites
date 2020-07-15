import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
var {height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Button} from 'native-base';



export default class Address extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
       latitude:30.1575,
       longitude:71.5249
     };
  }

  saveData=async()=>{
    
    
    const token = await AsyncStorage.getItem("token")
 
    const {latitude,longitude} = this.state;

alert(longitude)
  
    // fetch("http://192.168.10.7:4000/reservation/",{
    //   method:"POST",
    //   headers: new Headers({
    //     Authorization:"Bearer "+token,
    //     'Content-Type': 'application/json'
    //   }),
    //  body:JSON.stringify({ 
    //    "Latitude":latitude,
    //    "Longtitude": longitude,
      
    //  })
    // })
    // .then(res=>res.json())
    // .then(async (data)=>{
          
    //        }) 
    //        .catch(console.log("error"))
  }

  
  render() {
    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>

           <MapView
          style={{width:320, height:650}}
            region={{
              latitude:  this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0042,
              longitudeDelta: 0.0121,
            }}
            onPress={(e) => this.onClickMap(e.nativeEvent)}

          >



          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={(e) => this.movementMarker(e.nativeEvent)}
            title="Digital Bites"  />
        </MapView>


        <TouchableOpacity style={{
            backgroundColor:"white",
            height:60, width:60,
            borderRadius:50,
            alignItems:'center',
            padding:5,
            position:"absolute",
            top :10 ,
            right:10
          }} onPress={()=>this._getLocation()}>
          <Icon name="md-locate" size={50} color={"black"}  />
        </TouchableOpacity>

         
        <Button
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:25, backgroundColor:'#8E0438',  height:40, width:160}}
        onPress={this.saveData}>
   <Text style={{color:"white"}}>Confirm Location </Text>    
      </Button>
      </View>
    );
  }


  _getLocation()
  {
  


    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 100 },
    );
    
  }


  movementMarker(e){
    // get coordinate from mapviews
    const { latitude, longitude } = e.coordinate
    // update coordinate
    this.setState({
      latitude: latitude,
      longitude: longitude
    })
 
  }

  onClickMap(e)
 {
   const {latitude,longitude} = e.coordinate
   this.setState({
     latitude: latitude,
     longitude: longitude
   })
   

   
 }

}