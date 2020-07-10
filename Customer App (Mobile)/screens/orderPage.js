// import React from 'react';
// import { StyleSheet, View, Dimensions, Platform, SafeAreaView, PermissionsAndroid } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import PubNubReact from 'pubnub';
// import Geolocation from '@react-native-community/geolocation'

// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 33.56382816164258;
// const LONGITUDE = 73.12567095715602;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// console.disableYellowBox = true;

// const pubnub = new PubNubReact({
//   subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
//   publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd",
// });

// class Tracker extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       coordinate: new AnimatedRegion({
//         latitude: null,
//         longitude: null,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       }),
//     };

//     // Replace "X" with your PubNub Keys
//     // this.pubnub = new PubNubReact({
//     //   subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
//     //   publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd",
//     // });
//     // this.pubnub.init(this);
//   }
  

//   // code to receive messages sent in a channel
//   // componentDidMount() {
//   //   this.subscribeToPubNub();
//   // }

//   // subscribeToPubNub = () => {
//   //   pubnub.subscribe({
//   //     channels: ['location'],
//   //     withPresence: true,
//   //   });
//   //   pubnub.addListener({
//   //    message : MessageEvent => { 
//   //   getMessage('location', msg => {
//   //     alert("Here is this ", msg, MessageEvent)
//   //     const { coordinate } = this.state;
//   //     const { latitude, longitude } = msg.message;
//   //     const newCoordinate = { latitude, longitude };

//   //     if (Platform.OS === 'android') {
//   //       if (this.marker) {
//   //         this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//   //       }
//   //     } else {
//   //       coordinate.timing(newCoordinate).start();
//   //     }

//   //     this.setState({
//   //       latitude,
//   //       longitude,
//   //     });
//   //   });
//   // }
//   // })
//   // };
//   componentDidMount(){
//     this._getLocation();
//   }

//   async _getLocation()
//   {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => {
//     //     this.setState({
//     //       latitude: position.coords.latitude,
//     //       longitude: position.coords.longitude,
//     //       error: null,
//     //     });
//     //     alert("hey",position)
//     //   },
//     //   (error) => {alert("error",error),this.setState({ error: error.message })},
//     //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 100 },
//     // );
//     const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

// if (granted) {
//   console.log( "You can use the ACCESS_FINE_LOCATION" )
//   Geolocation.getCurrentPosition(info => alert(JSON.stringify(info)));
//   Geolocation.getCurrentPosition(result => {
//     this.setState({
//       latitude: result.coords.latitude,
//       longitude: result.coords.longitude,
//     })
//   })
// } 
// else {
//   console.log( "ACCESS_FINE_LOCATION permission denied" )
// }
//     // Geolocation.getCurrentPosition(info => alert(info));
//   }

//   getMapRegion = () => ({
//     latitude: this.state.latitude,
//     longitude: this.state.longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <MapView
//             style={styles.map}
//             showUserLocation
//             followUserLocation
//             loadingEnabled
//             ref={c => (this.mapView = c)}
//             region={this.state.latitude ? this.getMapRegion() : null}
//           >
//             <Marker.Animated
//               ref={marker => {
//                 this.marker = marker;
//               }}
//               coordinate={this.state.coordinate}
//             />
//           </MapView>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default Tracker;

// // import React from 'react';
// // import { Text, View, TouchableOpacity } from 'react-native';
// // import SocketIOClient from 'socket.io-client';

// // export default class Play extends React.Component {
	
// // 	constructor(props) {
// // 		super(props);
// //     this.socket = SocketIOClient("http://192.168.1.12:4000",{transports: ['websocket'], jsonp: false, forceNew: true }); // replace 'environment.serverUrl' with your server url
// //     this.socket.connect()
// //     this.socket.on('connect', () => { 
// //       alert('connected to socket server'); 
// //     });
// // 		this.socket.emit('chat', 'Hi server'); // emits 'hi server' to your server
		
// // 		// Listens to channel2 and display the data recieved
// //     // this.socket.on('client', data => {
// //     //     alert('Data recieved from server', data); //this will console 'channel 2'
// //     //   });
// //     }
	
// // 	clicked(){
		
// // 		const dataObj = {
// //       latitude: 33,
// //       longitude: 73
// // 		};
		
// //     this.socket.emit('chat', dataObj);
// //     this.socket.on('client', data => {
// //       alert('Data recieved from server', data); //this will console 'channel 2'
// //     });
// //   }

// //     render() {
// //         return(
// //             <View>
// //     					<Text> Socket.io with react native </Text>
// //               <TouchableOpacity onPress={this.clicked()}>
// //                 <Text> Click </Text>
// //                 </TouchableOpacity>
// // 					</View>
// //         );
// //     }
// // }

import React, { Component, useEffect, useState } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, Text, PermissionsAndroid, Modal, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator, Linking, Platform, AsyncStorage } from "react-native";
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react"
import { Button ,TextInput} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { Container, Header, Left, Body, Right, Content } from "native-base";
import { Icon } from "react-native-elements";

console.disableYellowBox = true;

const pubnub = new PubNub({
  subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
  publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd"
});

function LocationA(props) {
  
  const [latitude, setLatitude] = useState(33.570803)
  const [longitude, setLongitude] = useState(73.144497)
  const [error, setError] = useState(null)
  const [concat, setConcat] = useState(null)
  const [cordLatitude, setCordLatitude] = useState(33.570803)
  const [cordLongitude, setCordLongitude] = useState(73.570803)
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
  const [pstatus, setPstatus] = useState('')

  useEffect(() => {

    
 
    const granted = PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
  if (granted) {
    console.log( "You can use the ACCESS_FINE_LOCATION" )
    var watchID = Geolocation.watchPosition(info => {
      console.log(JSON.stringify(info))
      // setCordLatitude(info.coords.latitude)
      // setCordLongitude(info.coords.longitude)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 100, distanceFilter: 0 },
    )
    // setPstatus('assighned')
    _getorders()
  } 
  else {
    console.log( "ACCESS_FINE_LOCATION permission denied" )
  }

  function _getorders(){
    
  //   const token =  props.navigation.state.params.toki;
  //   // alert(token)
  //   const id = props.navigation.state.params.itemId;
  // // alert("here")
  //   fetch('https://digitalbites.herokuapp.com/orders/' +id,{
  //       headers:new Headers({
  //         Authorization:"Bearer "+token
  //       })
  //       }).then((response) => response.json())
  //   .then((responseJson) => {
  //   setPstatus(responseJson.status);
  //   if(responseJson.status == "Completed"){
  //     props.navigation.replace('OrderDetails', { itemId: props.navigation.state.params.itemId, createdAt: props.navigation.state.params.createdAt, lat: props.navigation.state.params.lat, lon: props.navigation.state.params.lon})
  //   }
  //   mergeLot();
  //   // alert(pstatus)
  //   })
  //   .catch((error) => {
  //   console.log("error");
  //   });

  setPstatus("pending")

 }

  // function pubnubhandel() {
  //   pubnub.publish({
  //       message: {
  //         latitude: cordLatitude,
  //         longitude: cordLongitude,
  //       },
  //       channel: 'location',
  //     });
  // }

    const listenerR = {
      message: location => {
        setLatitude(location.message.latitude);
        setLongitude(location.message.longitude);
      }
    }
    pubnub.addListener(listenerR)
    pubnub.subscribe({channels: ["location"]})



  pubnub.setUUID('C')

  const listener = {
    message: envelope => {
      setMessages(msgs => [
        ...msgs,
        {
          id: envelope.message.id,
          author: envelope.publisher,
          content: envelope.message.content,
          timetoken: envelope.timetoken
        }
      ]);
    }
  };

  pubnub.addListener(listener);
  pubnub.subscribe({ channels: ["chat"] });

  return function cleanup(){
    Geolocation.clearWatch(watchID);
    pubnub.removeListener(listener, listenerR);
    pubnub.unsubscribeAll();
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
    
  },[latitude, longitude, pubnub, pstatus])

  const handleSubmit = () => {
    // Clear the input field.
    setInput("");
    // Create the message with random `id`.
    const message = {
      content: input,
      id: Math.random()
        .toString(16)
        .substr(2)
    };
    // Publish our message to the channel `chat`
    pubnub.publish({ channel: "chat", message });
  };

  const makeCall = () => {
    let phoneNumber = rphone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${rphone}`;
    } else {
      phoneNumber = `telprompt:${rphone}`;
    }
    Linking.openURL(phoneNumber);
  };

  function RiderData() {
      setShowu(true)
  }

  const screenHeight = Math.round(Dimensions.get('window').height)/2;

  if(pstatus == "assighned"){
    return (
      <Container style={{backgroundColor:''}}>
      <Header style={{backgroundColor:'#8E0438'}}>
      <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
      <Left>
          <Icon color='white' name='menu' onPress={()=>props.navigation.toggleDrawer()}/>
        </Left>
        <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Order Tracking</Text></Body>
        <Right>
            <MIcon name='home' color='white' size={30} onPress={()=>props.navigation.replace("Restaurantscreen")}/>
        </Right>
      </Header>  
        <View style={{flex:1, flexDirection:'row'}}>
          <Modal animationType='fade' transparent={true} visible={show}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', width:'90%', height:'80%', flexDirection:'row'}}>
                        <SafeAreaView style={styles.outerContainer}>
     <KeyboardAvoidingView
       style={styles.innerContainer}
       behavior="height"
       keyboardVerticalOffset={Platform.select({
         ios: 78,
         android: 0
       })}
     >
       <ScrollView style={styles.topContainer}>
         {messages.map(message => (
           <View key={message.timetoken}       
                 style={styles.messageContainer}>
             <View style={styles.avatar}>
               <Text style={styles.avatarContent}>{message.author}</Text>
             </View>
             <View style={styles.messageContent}>
               <Text>{message.content}</Text>
             </View>
           </View>
         ))}
       </ScrollView>
       <View style={styles.bottomContainer}>
         <TextInput
           style={styles.textInput}
           value={input}
           onChangeText={setInput}
           onSubmitEditing={handleSubmit}
           returnKeyType="send"
           enablesReturnKeyAutomatically={true}
           placeholder="Type your message here..."
         />
         <View style={styles.submitButton}>
           {input !== "" && <Button mode="contained" onPress={handleSubmit}>Send</Button>}
         </View>
       </View>
                        
                        <Button
                          mode="contained"
                          style={{marginBottom:'1%', backgroundColor:'#008f2b', marginHorizontal:'20%'}}
                          onPress={() => setShow(false)}
                        >
                          Close
                          </Button>
                          
                          </KeyboardAvoidingView>
   </SafeAreaView>
                        </View>
                    </View>
                </Modal>

                <Modal animationType='fade' transparent={true} visible={showu}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', width:'70%', height:'40%', flexDirection:'row'}}>
                        <SafeAreaView style={styles.outerContainer}>
     
                        <View style={styles.HeaderImage}>
                <MIcon style={{alignSelf:'center'}} name="account-circle"  size={100} />
                <Text style={[styles.HeaderText,{alignSelf:'center'}]}>
                    {rider}
                </Text>
                <Text style={[styles.HeaderText,{alignSelf:'center'}]}>
                    {rphone}
                </Text>
            </View>

            <View style={{flexDirection:'row', marginBottom:'5%', marginTop:'5%', alignItems:'center'}}>
            
            <TouchableOpacity onPress={() => makeCall()}>
              <MIcon name='phone' size={30} color={'#008f2b'} style={{ alignSelf:'flex-start', marginHorizontal:'25%'}} />
            </TouchableOpacity>
            
 <TouchableOpacity onPress={() => setShow(true)}>
              <MIcon name='message' size={30} color={'#008f2b'} style={{ alignSelf:'flex-end', marginHorizontal:'5%'}} />
            </TouchableOpacity>

                          </View>
                        
                        <Button
                          mode="contained"
                          style={{ backgroundColor:'#008f2b', marginHorizontal:'10%'}}
                          onPress={() => setShowu(false)}
                        >
                          Close
                          </Button>
                        
                        </SafeAreaView>
                        </View>
                    </View>
                </Modal>

      <MapView 
      style={styles.map} 
      initialRegion={{
       latitude:latitude,
       longitude:longitude,
       latitudeDelta: 0.005,
       longitudeDelta: 0.05
      }}
      showsUserLocation={ true }
//         region={ this.state.region }
//         onRegionChange={ region => this.setState({region}) }
//         onRegionChangeComplete={ region => this.setState({region}) }
      >

      {!!latitude && !!longitude && <MapView.Marker
         coordinate={{"latitude":latitude,"longitude":longitude}}
         title={"Rider"}
       />}

       {!!cordLatitude && !!cordLongitude && <MapView.Marker
          coordinate={{"latitude":cordLatitude,"longitude":cordLongitude}}
          title={"Your Order Location"}
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
      <View style={{flexDirection:'row', alignItems:'flex-end', alignSelf:'flex-end'}}>
      {/* <Button
        mode="contained"
        style={{marginLeft:'2%', marginBottom:'5%', backgroundColor:'#008f2b'}}
       onPress={makeCall}
       >
        Call
      </Button>
      <Button
        mode="contained"
        style={{marginLeft:'2%', marginBottom:'5%', backgroundColor:'#008f2b'}}
       onPress={() => setShow(true)}
       >
        Chat
      </Button> */}
      <TouchableOpacity onPress={RiderData}>
              <FontAwesome name='user-alt' size={40} color={'#008f2b'} style={{ alignSelf:'flex-end', marginHorizontal:'15%', marginBottom: '25%'}} />
        </TouchableOpacity>
      {/* <Button
        mode="contained"
        style={{marginLeft:'2%', marginBottom:'5%', backgroundColor:'#008f2b'}}
       onPress={RiderData}
       >
        User
      </Button> */}
      </View>
      </View>
      </Container>
    );
  }
  else{
    return(
    <Container style={{backgroundColor:''}}>
    <Header style={{backgroundColor:'#8E0438'}}>
    <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
    <Left>
        <Icon color='white' name='menu' onPress={()=>props.navigation.toggleDrawer()}/>
      </Left>
      <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Order Tracking</Text></Body>
      <Right>
          <MIcon name='home' color='white' size={30} onPress={()=>props.navigation.replace("Restaurantscreen")}/>
      </Right>
    </Header>  
    <Content>
      <View style={{paddingVertical:screenHeight-50, alignItems:'center'}}>
      <Text style={{fontWeight:'bold', marginBottom:5}}>Order is Processing</Text>
    <ActivityIndicator color='#8E0438'/>
    </View>
    </Content>
    </Container>
    )
  }
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