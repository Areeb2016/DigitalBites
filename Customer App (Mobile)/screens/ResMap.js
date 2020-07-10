import React, { Component, useEffect, useState } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, Text, PermissionsAndroid, Modal, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator, Linking, Platform } from "react-native";
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import PubNub from "pubnub";
import { Container, Header, Content, Left, Body, Right} from 'native-base';
import { PubNubProvider, usePubNub } from "pubnub-react"
import { Button ,TextInput} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Icon } from "react-native-elements";

console.disableYellowBox = true;

const pubnub = new PubNub({
  subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
  publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd"
});

function LocationA(props) {
  
  const [latitude, setLatitude] = useState(props.navigation.state.params.lat)
  const [longitude, setLongitude] = useState(props.navigation.state.params.lon)
  const [clatitude, setCLatitude] = useState(props.navigation.state.params.lat)
  const [clongitude, setCLongitude] = useState(props.navigation.state.params.lon)
  const [error, setError] = useState(null)
  const [concat, setConcat] = useState(null)
  const [cordLatitude, setCordLatitude] = useState(props.navigation.state.params.lat)
  const [cordLongitude, setCordLongitude] = useState(props.navigation.state.params.lon)
  const [x, setX] = useState('false')
  const [coords, setCoords] = useState([])
  const [show, setShow] = useState(false)
  const [showu, setShowu] = useState(false)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [picked, setPicked] = useState("false")
  const [status, setStatus] = useState("Not")
  const [rider, setRider] = useState('')
  const [rphone, setRphone] = useState('')
  const [res, setRes] = useState(props.navigation.state.params.rest)

  useEffect(() => {


    if(status == true){
    const granted = PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
  if (granted) {
    console.log( "You can use the ACCESS_FINE_LOCATION" )
    var watchID = Geolocation.watchPosition(info => {
      console.log(JSON.stringify(info))
      setCordLatitude(info.coords.latitude)
      setCordLongitude(info.coords.longitude)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 100, distanceFilter: 0 },
    )
    mergeLot();
  } 
  else {
    console.log( "ACCESS_FINE_LOCATION permission denied" )
  }

  return function cleanup(){
    Geolocation.clearWatch(watchID);
   }

  function mergeLot(){
    if (latitude != null && longitude!=null)
     {
      let concatLot = latitude +","+longitude
      let concatLotCoord = cordLatitude +","+ cordLongitude
      setConcat(concatLot)
      getDirections(concatLot, concatLotCoord, "AIzaSyDqC_afyOZbsUZ1vCGgXCZ7kABXkPFbDvE");
     }

   }

   async function getDirections(startLoc, destinationLoc, API) {
    try {  
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${ API }`)
        let respJson = await resp.json();
        console.log(respJson)
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        setCoords(coords)
        setX("true")
        return coords
    } catch(error) {
      console.log('Error', error)
        setError("error")
        return error
    }
}
}
else{
    
}   
  },[cordLatitude, cordLongitude, status])

  async function _getLocation(){
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

if (granted) {
  console.log( "You can use the ACCESS_FINE_LOCATION" )
  Geolocation.getCurrentPosition(result => {
    setCLatitude(result.coords.latitude)
    setCLongitude(result.coords.longitude)
  })
} 
else {
  console.log( "ACCESS_FINE_LOCATION permission denied" )
}
  }

    return (
        <Container style={{backgroundColor:''}}>
      <Header style={{backgroundColor:'#8E0438'}}>
      <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
      <Left><Icon color='white' name='arrow-back' onPress={()=>props.navigation.replace("Restaurantdetailscreen")}/></Left>
    <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>{res}</Text></Body>
        <Right/>
      </Header>  
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView 
      style={styles.map} 
      initialRegion={{
       latitude:latitude,
       longitude:longitude,
       latitudeDelta: 0.005,
       longitudeDelta: 0.05
      }}
      region={{
        latitude:cordLatitude,
       longitude:cordLongitude,
       latitudeDelta: 0.005,
       longitudeDelta: 0.05
      }}
      showsUserLocation={ true }
      showsBuildings={true}
      showsCompass={true}
      showsPointsOfInterest={true}
      showsMyLocationButton={true}
    //   showsTraffic={true}
      >

      {!!latitude && !!longitude && <MapView.Marker
         coordinate={{"latitude":latitude,"longitude":longitude}}
         title={res}
       />}

       {!!cordLatitude && !!cordLongitude && <MapView.Marker
          coordinate={{"latitude":cordLatitude,"longitude":cordLongitude}}
          title={"Your Location"}
        />}

       {!!latitude && !!longitude && x == 'true' && <MapView.Polyline
            coordinates={coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!latitude && !!longitude && x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: latitude, longitude: longitude},
              {latitude: cordLatitude, longitude: cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
      </MapView>

      {/* <TouchableOpacity style={{
            borderRadius:40,
            alignItems:'center',
            padding:5,
            position:"absolute",
            bottom: '5%',
            left:'3%',
          }} onPress={() => _getLocation()}>
          <Ionicon name="md-locate" size={40} color={"#8E0438"} />
          <Text style={{fontSize:12, fontWeight:'normal'}}>Your Location</Text>
        </TouchableOpacity> */}

<TouchableOpacity style={{
            borderRadius:40,
            alignItems:'center',
            padding:5,
            position:"absolute",
            bottom: '5%',
            right:'3%',
          }} onPress={() => setStatus(true)}>
          <FontAwesome name="directions" size={40} color={"#8E0438"} />
          <Text style={{fontSize:12, fontWeight:'normal'}}>Get Directions</Text>
        </TouchableOpacity>

      </View>
    </Container>
    );
  }

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  outerContainer: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    flexDirection: 'column-reverse',
    paddingHorizontal: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 8,
    borderRadius: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16
  },
  avatarContent: {
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center"
  },
  messageContent: {
    flex: 1
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
  },
  submitButton: {
    marginLeft:'1%',
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LocationA;