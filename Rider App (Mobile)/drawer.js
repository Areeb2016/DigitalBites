


import React,{Component} from 'react';

import{createDrawerNavigator}from "react-navigation-drawer";
import {createAppContainer} from 'react-navigation';
import{Feather} from "@expo/vector-icons";

import{
  HomeScreen,
  
  Faqscreen


  
  
} from "./myscreens"

const DrawerNavigator=createDrawerNavigator({

  
  
  HomeScreen1:{
    screen:ListDividerExample,
    navigationOptions:{
      title:"User Pofile",
      drawerIcon:({tintColor})=><Feather name="user"/>
    },    

  },
  HomeScreen:{
    screen:HomeScreen,
    navigationOptions:{
      title:"User Pofile",
      drawerIcon:({tintColor})=><Feather name="user"/>
    },    

  },
  
  
  
  
  // MapScreen:{

  //   screen:Mapscreen,
  //   navigationOptions:{
  //     title:"View map",
  //     drawerIcon:({tintColor})=><Feather name="help-circle"/>
  //   }
  // },
  Faqscreen:{

    screen:Faqscreen,
    navigationOptions:{
      title:"FAQS",
      drawerIcon:({tintColor})=><Feather name="help-circle"/>
    }
  },
  // Aboutusscreen:{

  //   screen:Aboutusscreen,
  //   navigationOptions:{
  //     title:"About Us",
  //     drawerIcon:({tintColor})=><Feather name="help-circle"/>
  //   }
  // },
  // Contactusscreen:{

  //   screen:Contactusscreen,
  //   navigationOptions:{
  //     title:"Contact us",
  //     drawerIcon:({tintColor})=><Feather name="help-circle"/>
  //   }
  
  // }

})
export default createAppContainer(DrawerNavigator);







//-------------------------------------------------------------------------------
// import React,{Component} from 'react';
// import { TouchableHighlight,Text, View,FlatList,Image} from 'react-native';




// export default class lv extends Component {
//   
//   render(){
//   return (
//     <View>
//    
//     </View>
    
//   );
// }}


// --------------------------------------------------------------------------------------




//  import React, { Component } from 'react';




// import { StyleSheet ,Button, TextInput, View,Text} from 'react-native';


// export default class PizzaTranslator extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {Num1:0,Num2:0};
//     }
//      Mul=()=>
//       {
//         var N1 = parseInt(this.state.Num1);
//         var N2 = parseInt(this.state.Num2);
//         var result = N1*N2
//         alert("The Multiplicationof above two numbers is " + result);
//       }
//     Minus=()=>
//       {
//         var N1 = parseInt(this.state.Num1);
//         var N2 = parseInt(this.state.Num2);
//         var result = N1-N2
//         alert("The subtraction of above two numbers is " + result);
//       }
//     Sum=()=>
//       {
//         var N1 = parseInt(this.state.Num1);
//         var N2 = parseInt(this.state.Num2);
//         var result = N1+N2
//         alert("The sum of above two numbers is " + result);
//       }
//     divide=()=>
//       {
//         var N1 = parseInt(this.state.Num1);
//         var N2 = parseInt(this.state.Num2);
//         var result = N1/N2
//         alert("The division of above two numbers is " + result);
//       }
//     render() {
//       return (
//         <View style={styles.containe}>
//          <Text h1  style={{borderWidth:1,margin:10,width:400,height: 40,marginTop:45,fontSize:26}}>
//            This is simple calculator app
//          </Text>
//           <TextInput
//             style={{borderWidth:1,margin:10,width:200,height: 40,marginTop:45}}
//             placeholder="Num1"
//             onChangeText={(Num1) => this.setState({Num1})}
            
//           />
//            <TextInput
//             style={{borderWidth:1,margin:10,width:200,height: 40}}
//             placeholder="Num2"
//             onChangeText={(Num2) => this.setState({Num2})}
            
//           />
//           <Button
//            title="Sum"
//           style={{marginTop:45}}
//           color="blue"
//           onPress={this.Sum}
//           />
          
//           <Button
//            title="Minus"
//           color="red"
          
//           onPress={this.Minus}
//           />
//           <Button
//            title="Multiply"
//           color="green"
//           onPress={this.Mul}
//           />
//           <Button
//            title="Divide"
//           color="black"
//           onPress={this.divide}
//           />


          
//         </View>
//       );
//       }}
//       const styles = StyleSheet.create({
//           container: {
//             flex: 1,
//             backgroundColor: '#fff',
//             alignItems: 'center',
//             justifyContent: 'center',
//           },
//         });
        
//----------------------------------------------------------------------------------------
        // import React from 'react';
        // import {TextInput, StyleSheet, Text, View,TouchableOpacity, AsyncStorage, Button } from 'react-native';
        
        // export default class App extends React.Component {
        //   
        //  render(){
        //   return (
        //     <View style={styles.container}>
        //      
        
        
        // const styles = StyleSheet.create({
        //   container: {
        //     flex: 1,
        //     backgroundColor: '#fff',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //   },
        //   input:{
        //     backgroundColor:'#fff',
        //     padding:10,
        //     margin:10,
        //     borderWidth:1,
        //     borderColor:'#ccc'
        //   }
        // });
        