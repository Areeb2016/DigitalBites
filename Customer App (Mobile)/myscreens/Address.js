import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, AsyncStorage, StatusBar, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
var {height, width } = Dimensions.get('window');
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Button, Left, Body, Right, Icon} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Address extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
       latitude:33.651958,
       longitude:73.157357,
       error: null,
       searchFocused: false,
     };
  }

  saveData=async()=>{
    
    
    const token = await AsyncStorage.getItem("token")
 
    const {latitude,longitude} = this.state;

alert(latitude, longitude)
  
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
      <Container style={{backgroundColor:''}}>
      <Header style={{backgroundColor:'#8E0438'}}>
      <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
      <Left>
          <Icon style={{color:'white'}} name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
        </Left>
        <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Location</Text></Body>
        <Right>
            <Icon name='ios-home' style={{color:'white'}}  onPress={()=>this.props.navigation.replace("Restaurantscreen")}/>
        </Right>
      </Header>  

      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>

           <MapView
          style={{
            position:'absolute',
            top:0,
            bottom:0,
            left:0,
            right:0
          }}
            region={{
              latitude:  this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0042,
              longitudeDelta: 0.0121,
            }}
            showsUserLocation = {true}
            showsBuildings = {true}
            showsCompass = {true}
            showsTraffic = {true}
            showsMyLocationButton = {true}
            showsPointsOfInterest = {true}
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

        <GooglePlacesAutocomplete
        placeholder="Where to?"
        placeholderTextColor="#333"
        onPress={(data, details) => {
            // console.log(data, details)
            this.handleLocationSelected(data, details)
        }}
        query={{
            key: 'AIzaSyDqC_afyOZbsUZ1vCGgXCZ7kABXkPFbDvE',
            language: 'en'
        }}
        listViewDisplayed={this.state.searchFocused}
        textInputProps={{
            onFocus: () => { this.setState({searchFocused: true}) }, // Seta variável para mostrar ou não a lista da busca
            onBlur: () => { this.setState({searchFocused: false}) }, // Seta variável para mostrar ou não a lista da busca
            autoCapitalize: "none",
            autoCorrect: false
        }}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
            container: {
                position: "absolute",
                top: Platform.select({ ios: 60, android: 10 }),
                width: "100%",
            },
            textInputContainer: {
                flex: 1,
                backgroundColor: "transparent",
                height: 54,
                marginHorizontal: 20,
                borderTopWidth: 0,
                borderBottomWidth: 0
            },
            textInput: {
                height: 54,
                margin: 0,
                borderRadius: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                borderWidth: 1,
                borderColor: "#DDD",
                fontSize: 18
            },
            listView: {
                borderWidth: 1,
                borderColor: "#DDD",
                backgroundColor: "#FFF",
                marginHorizontal: 20,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { x: 0, y: 0 },
                shadowRadius: 15,
                marginTop: 10
            },
            description: {
                fontSize: 16
            },
            row: {
                padding: 20,
                height: 58
            },
        }}
    />

        <TouchableOpacity style={{
            backgroundColor:"#8E0438",
            height:50, width:50,
            borderRadius:40,
            alignItems:'center',
            padding:5,
            position:"absolute",
            bottom: '11%',
            right:10,
          }} onPress={() => this._getLocation()}>
          <Ionicon name="md-locate" size={40} color={"white"} />
        </TouchableOpacity>
         
        <Button
        mode="contained"
        style={{marginLeft:18, marginRight:18, backgroundColor:'#8E0438', height:40, width:'50%', position:'absolute', bottom:10, alignItems:"center", justifyContent:"center",}}
        onPress={this.saveData}>
   <Text style={{color:"white", fontWeight:'bold'}}>Confirm Location</Text>    
      </Button>
      </View>
       </Container>
    );
  }


  async _getLocation(){
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });
    //     alert("hey",position)
    //   },
    //   (error) => {alert("error",error),this.setState({ error: error.message })},
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 100 },
    // );
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

if (granted) {
  console.log( "You can use the ACCESS_FINE_LOCATION" )
  Geolocation.getCurrentPosition(info => alert(JSON.stringify(info)));
  Geolocation.getCurrentPosition(result => {
    this.setState({
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    })
  })
} 
else {
  console.log( "ACCESS_FINE_LOCATION permission denied" )
}
    // Geolocation.getCurrentPosition(info => alert(info));
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

 handleLocationSelected( data, { geometry }) {
  const { location: { lat: latitude, lng: longitude } } = geometry;
  // setDestination({
  //     latitude,
  //     longitude,
  //     title: data.structured_formatting.main_text
  // })
  this.setState({
    latitude: latitude,
    longitude: longitude
  })
  console.log("clicked, ", latitude)
}

}


