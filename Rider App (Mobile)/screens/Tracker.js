// import React, { Component } from "react";
// import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, Text, PermissionsAndroid } from "react-native";
// //import { Container, Text } from "native-base";
// import MapView from 'react-native-maps';
// import Polyline from '@mapbox/polyline';
// import { Container, Header, Left, Icon, Body, Right, Content } from "native-base";
// import { Button ,TextInput} from 'react-native-paper';
// import PubNub from "pubnub";
// import { PubNubProvider, usePubNub } from "pubnub-react"

// const pubnub = new PubNub({
//   subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
//   publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd"
// });

// class LocationA extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: 33.56425599439081,
//       longitude: 73.12568990766728,
//       error: null,
//       concat: null,
//       coords:[],
//       x: 'false',
//       cordLatitude:33.720000,
//       cordLongitude:73.060000,
//     };

//     this.mergeLot = this.mergeLot.bind(this);

//   }

//   async componentDidMount() {
//     const granted = PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
//     if(granted){
//     this.watchID = await navigator.geolocation.watchPosition(
//        (position) => {
//          this.setState({
//            latitude: position.coords.latitude,
//            longitude: position.coords.longitude,
//            error: null,
//          });
//          console.log(this.state.latitude)
//          this.mergeLot();
//        },
//        (error) => this.setState({ error: error.message }),
//        { enableHighAccuracy: true, timeout: 20000, maximumAge: 100, distanceFilter: 0 },
//      );
//       }
//    }

//    subscribeToPubNub = () => {
//     pubnub.subscribe({
//       channels: ['location'],
//       withPresence: true,
//     });
//     pubnub.addListener({
//      message : MessageEvent => { 
//        console.log(MessageEvent),
//     ('location', msg => {
//       console.log(msg)
//       alert("Here is this ", msg, MessageEvent)
//       const { coordinate } = this.state;
//       const { cordLatitude, cordLongitude } = msg.message;
//       const newCoordinate = { cordLatitude, cordLongitude };

//       if (Platform.OS === 'android') {
//         if (this.marker) {
//           this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//         }
//       } else {
//         coordinate.timing(newCoordinate).start();
//       }

//       this.setState({
//         cordLatitude,
//         cordLongitude,
//       });
//     });
//   }
//   })
//   };

//    componentDidUpdate(prevProps, prevState) {
//     if (this.props.latitude !== prevState.latitude) {
//       pubnub.publish({
//         message: {
//           latitude: this.state.latitude,
//           longitude: this.state.longitude,
//         },
//         channel: 'location',
//       });
//       this.subscribeToPubNub();
//     }
//   }

//    componentWillUnmount(){
//      navigator.geolocation.clearWatch(this.watchID);
//    }

//   mergeLot(){
//     if (this.state.latitude != null && this.state.longitude!=null)
//      {
//        let concatLot = this.state.latitude +","+this.state.longitude
//        this.setState({
//          concat: concatLot
//        }, () => {
//          this.getDirections(concatLot, "33.720000,73.060000", "AIzaSyDqC_afyOZbsUZ1vCGgXCZ7kABXkPFbDvE");
//        });
//      }

//    }

//    async getDirections(startLoc, destinationLoc, API) {

//          try {
//           // var proxy_url = 'https://cors-anywhere.herokuapp.com/';
//           // var target_url = 'https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }';
//           // var google_api_key = '&key=${ API }'
//           // let resp = await fetch(`${proxy_url}${target_url}${google_api_key}`)   
//            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${ API }`)
//              let respJson = await resp.json();
//              console.log(respJson)
//              let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//              let coords = points.map((point, index) => {
//                  return  {
//                      latitude : point[0],
//                      longitude : point[1]
//                  }
//              })
//              this.setState({coords: coords})
//              this.setState({x: "true"})
//              return coords
//          } catch(error) {
//            console.log('Error', error)
//              this.setState({x: "error"})
//              return error
//          }
//      }

   

//   render() {

//     return (
//       <Container style={{backgroundColor:''}}>
//         <Header style={{backgroundColor:'#8E0438'}}>
//         <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
//         <Left>
//               <Icon name='arrow-back' style={{color:'white'}} onPress={()=>this.props.navigation.goBack()}/>
//           </Left>
//           <Body>
//             <Text style={{fontSize:20, color:'white'}}>Track</Text>
//           </Body>
//           <Right/>
//         </Header>
//         <View style={{flex:1}}>
//       <MapView 
//       style={styles.map} 
//       initialRegion={{
//        latitude:this.state.latitude,
//        longitude:this.state.longitude,
//        latitudeDelta: 0.0005,
//        longitudeDelta: 0.005
//       }}
//       showsUserLocation={ true }
// //         region={ this.state.region }
// //         onRegionChange={ region => this.setState({region}) }
// //         onRegionChangeComplete={ region => this.setState({region}) }
//       >

//       {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
//          coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
//          title={"Your Location"}
//        />}

//        {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
//           coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
//           title={"Your Destination"}
//         />}

//        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
//             coordinates={this.state.coords}
//             strokeWidth={2}
//             strokeColor="red"/>
//         }

//         {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
//           coordinates={[
//               {latitude: this.state.latitude, longitude: this.state.longitude},
//               {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
//           ]}
//           strokeWidth={2}
//           strokeColor="red"/>
//          }
//       </MapView>
//       </View>
//      <View>
//       <Button
//         mode="contained"
//         style={{marginLeft:18, marginRight:18, marginBottom:10, backgroundColor:'#8E0438'}}
//        //onPress={() => sendCred(props)}
//        onPress={() => {
//         this.props.navigation.replace('Billing',{itemId:this.props.route.params. itemId , createdAt:this.props.route.params. createdAt});
//       }}
//        >
//         End Ride
//       </Button>
//       </View>
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// export default LocationA;

import React, { Component, useEffect, useState } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity, Text, PermissionsAndroid, Modal, SafeAreaView, KeyboardAvoidingView, ScrollView, ActivityIndicator, Linking, Platform } from "react-native";
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react"
import { Button ,TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import * as Location from 'expo-location';
import { Container, Header, Left, Body, Right, Content, Icon } from 'native-base';

console.disableYellowBox = true;

const pubnub = new PubNub({
  subscribeKey: "sub-c-44dc460e-6f61-11ea-bbe3-3ec3e5ef3302",
  publishKey: "pub-c-6dbdc9ba-d87d-4e15-813c-1e6a76fe12bd"
});

function LocationA(props) {
  
  const [latitude, setLatitude] = useState(props.route.params.lat)
  const [longitude, setLongitude] = useState(props.route.params.lon)
  const [error, setError] = useState(null)
  const [concat, setConcat] = useState(null)
  const [cordLatitude, setCordLatitude] = useState(33.56)
  const [cordLongitude, setCordLongitude] = useState(73.12)
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


  useEffect(() => {
    (async() => {
      let location;
    let { status } = await Location.requestPermissionsAsync();
      if (status == 'granted') {
    console.log( "You can use the ACCESS_FINE_LOCATION" )
   location = await Location.watchPositionAsync( {
      enableHighAccuracy: true,
      distanceInterval: 0,
      timeInterval: 300
  },
  locations => {
      // alert(locations.coords.latitude)
      setCordLatitude(locations.coords.latitude)
      setCordLongitude(locations.coords.longitude)
    // console.log("HERE", props.route.params.lat)
    pubnubhandel();
  })
  }

  else {
    console.log( "ACCESS_FINE_LOCATION permission denied" )
  }

  function pubnubhandel() {
    pubnub.publish({
        message: {
          latitude: cordLatitude,
          longitude: cordLongitude,
        },
        channel: 'location',
      });
      mergeLot();
  }

    // const listenerR = {
    //   message: location => {
    //     setLatitude(location.message.latitude);
    //     setLongitude(location.message.longitude);
    //   }
    // }
    // pubnub.addListener(listenerR)
    // pubnub.subscribe({channels: ["location"]})

  pubnub.setUUID('R')

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
    pubnub.removeListener(listener);
    pubnub.unsubscribeAll();
    // location.remove();
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
        // console.log(respJson)
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
})();   
  },[cordLatitude, cordLongitude, pubnub, status]);

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

    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='arrow-back' style={{color:'white'}} onPress={()=>props.navigation.goBack()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>Ongoing Order</Text>
          </Body>
          <Right/>
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
       latitude:cordLatitude,
       longitude:cordLongitude,
       latitudeDelta: 0.005,
       longitudeDelta: 0.05
      }}
      // region={{
      //   latitude:cordLatitude,
      //   longitude:cordLongitude,
      //   latitudeDelta: 0.0005,
      //   longitudeDelta: 0.005
      // }}
      showsUserLocation={ true }
//         region={ this.state.region }
//         onRegionChange={ region => this.setState({region}) }
//         onRegionChangeComplete={ region => this.setState({region}) }
      >

      {!!latitude && !!longitude && <MapView.Marker
         coordinate={{"latitude":latitude,"longitude":longitude}}
         title={"Your Location"}
       />}

       {!!cordLatitude && !!cordLongitude && <MapView.Marker
          coordinate={{"latitude":cordLatitude,"longitude":cordLongitude}}
          title={"Rider"}
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
      <View style={{position:'absolute', bottom:20, right:50, left:50}}>
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
      {/* <TouchableOpacity onPress={RiderData}>
              <FontAwesome name='user-alt' size={40} color={'#008f2b'} style={{ alignSelf:'flex-end', marginHorizontal:'15%', marginBottom: '25%'}} />
        </TouchableOpacity> */}
      {/* <Button
        mode="contained"
        style={{marginLeft:'2%', marginBottom:'5%', backgroundColor:'#008f2b'}}
       onPress={RiderData}
       >
        User
      </Button> */}
      <Button
        mode="contained"
        style={{ backgroundColor:'#8E0438'}}
       onPress={() => {
        props.navigation.replace('Billing',{itemId:props.route.params.itemId , createdAt:props.route.params.createdAt, lat:props.route.params.lat, lon:props.route.params.lon});
      }}
       >
        End Ride
       </Button>
      </View>
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