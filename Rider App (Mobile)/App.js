
import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  StyleSheet,
   View,
  Text,
    AsyncStorage,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Share,
    Linking
 
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { openComposer } from 'react-native-email-link'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import{createDrawerNavigator, DrawerItems}from "react-navigation-drawer";
import {createAppContainer} from 'react-navigation';
import{Feather} from "@expo/vector-icons";
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen'
import Dashboard from './screens/dashboard'
import splash from './screens/splash'



import  Tracker from './screens/Tracker'
import Details from './screens/Details'

import Billing from './screens/Billing'

import{
 
  
  Faqscreen,
 Logoutscreen,Mapscreen,HistoryScreen


  
  
} from "./myscreens"


import HomeSceen from './screens/HomeScreen';
import { ScrollView } from 'react-native-gesture-handler';
const Stack = createStackNavigator();
export const app= function App({ navigation }) {
  
  const [isloggedin,setLogged] = useState(null)
  const [show, setShow] = useState(false)

   const detectLogin= async ()=>{
      const token = await AsyncStorage.getItem('token')
      if(token){
          setLogged(true)
      }else{
          setLogged(false)
      }
   }
  useEffect(()=>{
     detectLogin()
  },[])


  return (
    <NavigationNativeContainer>
    <Stack.Navigator
    headerMode="none"
    >
      {/* <Stack.Screen name="Tracker" component={Tracker} /> */}
       <Stack.Screen name="splash" component={splash} />

      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="dashboard" component={Dashboard}/>
     <Stack.Screen name="Tracker" component={Tracker} />
     <Stack.Screen name="Billing" component={ Billing } />
     <Stack.Screen name="Details" component={Details} />

           </Stack.Navigator>
  </NavigationNativeContainer>
  );
}

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

const DrawerNavigator=createDrawerNavigator({
  Mainscreen:{
    screen:app,
    navigationOptions:{
      title:"Dashboard",
      // drawerIcon:({tintColor})=><Feather name="user"/>
    },    

  },
  Aboutusscreen:{
    screen:HistoryScreen,
    navigationOptions:{
      title:"Order History",
      // drawerIcon:({tintColor})=><Feather name="user"/>
    },    

  },
  Contactusscreen:{
    screen:Logoutscreen,
    navigationOptions:{
      title:"Log out",
      // drawerIcon:({tintColor})=><Feather name="user"/>
    },    

  },
  
  
  // Mapscreen:{

  //   screen:Mapscreen,
  //   navigationOptions:{
  //     title:"Maps",
  //     drawerIcon:({tintColor})=><Feather name="help-circle"/>
  //   }
  // },


},
{
  contentComponent: props => 
  <ScrollView>
  <View style={{backgroundColor:'#8E0438', height: 120, paddingTop:40, paddingHorizontal:20}}>
      <Image/>
    <Text style={{color:'white', fontSize: 20}}>Rider</Text>
    <View style={{flexDirection:'row'}}>
      <Text style={{flex:1, color:'white', fontSize:15}}>rider@gmail.com</Text>
    </View>
<Text style={{flex:1, color:'white', fontSize:15}}>033242344521</Text>
    </View>
<SafeAreaView
  style={{flex: 1}}
  forceInset={{ top: 'always', horizontal: 'never' }}
>
<DrawerItems {...props} />
    {/* <TouchableOpacity onPress={() => props.navigation.navigate('dashboard')} activeOpacity={0.3}>
   <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
    Home
    </Text>
    </TouchableOpacity> */}
    {/* <TouchableOpacity onPress={() => props.navigation.navigate('Faq')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
    FAQ
    </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.navigation.navigate('About')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
    About Us
    </Text>
    </TouchableOpacity> */}
    {/* <TouchableOpacity onPress={() => props.navigation.navigate('HistoryScreen')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, marginLeft:20, fontWeight:'500'}}>
    History
    </Text>
    </TouchableOpacity>*/}
    <View style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginTop:20, marginBottom:10}}/> 
    {/* <TouchableOpacity onPress={() => props.navigation.navigate('Cart')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
    My Cart
    </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.navigation.navigate('MyOrder')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
    My Order
    </Text>
    </TouchableOpacity> */}
    {/* <TouchableOpacity onPress={() => setShow(!show)} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
    {show == true ? 'History' : 'History'}
    </Text>
    </TouchableOpacity> */}
    {/* {show == true && (
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
    </TouchableOpacity> */}
    <TouchableOpacity onPress={() => shareMessage()} activeOpacity={0.3}>
    <Text style={{fontSize:16, marginTop:20, fontWeight:'bold', marginLeft:17}}>
    Invite
    </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleSupport()} activeOpacity={0.3}>
    <Text style={{fontSize:16, marginTop:20, fontWeight:'bold', marginLeft:17}}>
    Support
    </Text>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={() => props.navigation.navigate('Logout')} activeOpacity={0.3}>
    <Text style={{fontSize:20, marginTop:20, fontWeight:'300', marginLeft:20}}>
    Logout
    </Text>
    </TouchableOpacity> */}

    <Text style={{fontSize:16, marginTop:20, fontWeight:'bold', marginLeft:17}}>
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
})
export default createAppContainer(DrawerNavigator);
