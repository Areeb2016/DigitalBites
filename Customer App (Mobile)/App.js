import React, { Component, useState, useEffect } from "react";
import { createStackNavigator, createAppContainer, HeaderBackButton, createDrawerNavigator, ScrollView } from "react-navigation";
import { Button, View, Text, SafeAreaView, Image, TouchableOpacity, Share, Linking, AsyncStorage } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { openComposer } from 'react-native-email-link'
import Sighnupscreen from "./screens/SignupScreen"
import Loginscreen from "./screens/LoginScreen"
import Restaurantscreen from "./screens/restaurantimages"
import Restaurantdetailscreen from "./screens/Restaurantdetails"
import VRscreen from "./VR"
import Menu from "./screens/menu"
import Ratings from "./screens/ratings"
import Reservation from "./screens/reservation"
import Products from "./screens/productPage"
import OrderItem from "./screens/orderPage"
import Cart from "./screens/cart"
import Faq from "./myscreens/faq"
import About from "./myscreens/aboutus"
import Contact from "./myscreens/contactus"
import ARscreen from "./AR"
import FRating from "./screens/foodrating"
import Profile from "./myscreens/profile"
import Splash from "./screens/splash"
import Logout from "./myscreens/Logout"
import Address from "./myscreens/Address"
import PubnubScreen from "./screens/pubnub"
import OHistory from "./myscreens/order history"
import RHistory from "./myscreens/reservation history"
import ResMap from "./screens/ResMap"
import LocationY from "./screens/location"
import MyOrder from "./screens/myOrders"
import OrderDetails from "./screens/orderDetails"
import OrderPageF from "./screens/orderPage" 

const CustomDrawer = (props) =>{
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    console.log('testing')

    useEffect(() => {
    
        const check = async () => {
    const token = await AsyncStorage.getItem("token")
    
     fetch('https://digitalbites.herokuapp.com/',{
      headers:new Headers({
        Authorization:"Bearer "+token
      })
      }).then(res=>res.json())
      .then(data=>{
        setEmail(data.email)
        setName(data.name)
        setPhone(data.phone)
      })
    }
      check();
    },[])

    const shareMessage=() =>{
        Share.share({
          message: 'App link '  
        })
      }

    const handleSupport =  () =>{
        openComposer({
         to: 'bitesdigital@gmail.com',
         subject: 'I have a question',
         body: 'Hi, can you help me with...'
       })
       }

    const facebook = () => {
        Linking.openURL('https://www.facebook.com/Digital-Bites-111616913929021/?modal=admin_todo_tour')
    }

    const Instagram = () => {
        Linking.openURL('https://www.facebook.com/Digital-Bites-111616913929021/?modal=admin_todo_tour')
    }

    const twitter = () => {
        Linking.openURL('https://twitter.com/bites_digital')
    }

   return(
     <ScrollView>
       <View style={{backgroundColor:'#8E0438', height: 120, paddingTop:40, paddingHorizontal:20}}>
           <Image/>
         <Text style={{color:'white', fontSize: 20}}>{name}</Text>
         <View style={{flexDirection:'row'}}>
           <Text style={{flex:1, color:'white', fontSize:15}}>{email}</Text>
         </View>
   <Text style={{flex:1, color:'white', fontSize:15}}>{phone}</Text>
         </View>
     <SafeAreaView
       style={{flex: 1}}
       forceInset={{ top: 'always', horizontal: 'never' }}
     >
         <TouchableOpacity onPress={() => props.navigation.navigate('Restaurantscreen')} activeOpacity={0.3}>
        <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
         Home
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => props.navigation.navigate('Faq')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
         FAQ
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => props.navigation.navigate('About')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
         About Us
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => props.navigation.navigate('Contact')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
         Contact Us
         </Text>
         </TouchableOpacity>
         <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginTop:20}}/>
         <TouchableOpacity onPress={() => props.navigation.navigate('Cart')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         My Cart
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => props.navigation.navigate('MyOrder')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         My Order
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         {show == true ? 'History' : 'History'}
         </Text>
         </TouchableOpacity>
         {show == true && (
             <View>
         <Text onPress={() => props.navigation.navigate('OHistory')} style={{fontSize:20, marginTop:20, fontWeight:'200', marginLeft:40}}>
         Orders
         </Text>
         <Text onPress={() => props.navigation.navigate('RHistory')} style={{fontSize:20, marginTop:20, fontWeight:'200', marginLeft:40}}>
         Reservations
         </Text>
             </View>
         )}
         <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         Profile
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => shareMessage()} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         Invite
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => handleSupport()} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         Support
         </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => props.navigation.navigate('Logout')} activeOpacity={0.3}>
         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         Logout
         </Text>
         </TouchableOpacity>

         <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
         Follow Us
         </Text>
         <View style={{flexDirection:'row', marginTop:5}}>
         <TouchableOpacity onPress={() => facebook()} activeOpacity={0.3} style={{marginLeft:20}}>
            <FontAwesome name='facebook' size={30} color='#3b5998'/>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => Instagram()} activeOpacity={0.3} style={{marginLeft:20}}>
            <FontAwesome name='instagram' size={30} color='#e1306c'/>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => twitter()} activeOpacity={0.3} style={{marginLeft:20}}>
         <FontAwesome name='twitter' size={30} color='#00acee'/>
         </TouchableOpacity>
         </View>
     </SafeAreaView>
   </ScrollView>
   )}

export const RootNavigator = createStackNavigator({
    // PubnubScreen:{
    //     screen: PubnubScreen,
    //     navigationOptions:{
    //         header: null,
    //         headerMode: 'none'
    //     }},
    Splash:{
        screen:Splash,
        navigationOptions:{
            header: null,
            headerMode: 'none',
        }},
    Loginscreen:{
        screen:Loginscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none',
        }},
    Restaurantscreen:{
        screen:Restaurantscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Restaurantdetailscreen:{
        screen:Restaurantdetailscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    VRscreen:{
        screen:VRscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Menu:{
        screen:Menu,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Products:{
        screen:Products,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    ARscreen:{
        screen:ARscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Cart:{
        screen:Cart,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    OrderItem:{
        screen:OrderItem,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    OrderDetails:{
        screen:OrderDetails,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    PubnubScreen:{
        screen: PubnubScreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    ResMap:{
        screen: ResMap,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    FRating:{
        screen:FRating,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Ratings:{
        screen:Ratings,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Reservation:{
        screen:Reservation,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    OrderPageF:{
        screen:OrderPageF,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Sighnupscreen:{
        screen:Sighnupscreen,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Logout:{
        screen:Logout,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Profile:{
        screen:Profile,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},  
    Address:{
        screen:Address,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }}, 
    LocationY:{
        screen:LocationY,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},   
  })
  //export createAppContainer(RootNavigator);

  const DrawerNavigator = createDrawerNavigator({
    RootNavigator:{
        screen:RootNavigator,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Faq:{
        screen:Faq,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    About:{
        screen:About,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    Contact:{
        screen:Contact,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    MyOrder:{
        screen:MyOrder,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},
    OHistory:{
        screen:OHistory,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},  
    RHistory:{
        screen:RHistory,
        navigationOptions:{
            header: null,
            headerMode: 'none'
        }},  
    },
    {contentComponent: CustomDrawer})
  
  export default createAppContainer(DrawerNavigator);