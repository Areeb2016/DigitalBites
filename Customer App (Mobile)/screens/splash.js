// import React from 'react';
// import { View, Text, Image, StatusBar } from 'react-native';

// class SplashScreen extends React.Component {
//   performTimeConsumingTask = async() => {
//     return new Promise((resolve) =>
//       setTimeout(
//         () => { resolve('result') },
//         2000
//       )
//     )
//   }

//   async componentDidMount() {
//     // Preload data from an external API
//     // Preload data using AsyncStorage
//     const data = await this.performTimeConsumingTask();

//     if (data !== null) {
//       this.props.navigation.replace('Loginscreen');
//     }
//   }

//   render() {
//     return (
//       <View style={styles.viewStyles}>
//           <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
//           <Image
//       style={{height:150, width:150}}
//       source={require('../assets/menu.png')}
//       />
//       <Text 
//       style={styles.textStyles}
//       >Digital Bites
//       </Text>  
//       </View>
//     );
//   }
// }

// const styles = {
//   viewStyles: {
//     marginTop:-70,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#8E0438'
//   },
//   textStyles: {
//     color: 'white',
//     fontSize: 40,
//     fontWeight: 'bold'
//   }
// }

// export default SplashScreen;

import * as React from 'react';
import { Text, View, StyleSheet, Animated, Image, Alert, AsyncStorage } from 'react-native';
import { Card } from 'react-native-paper';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fadeAnim = new Animated.Value(1);
  }

  componentDidMount() {
    Animated.timing(          // Animate over time
      this.fadeAnim, // The animated value to drive
      {
        toValue: 0,           // Animate to opacity: 1 (opaque)
        duration: 5000,
        // useNativeDriver: true
      }
    ).start(() => {
      
      setTimeout(() => {
        this.checkfunc();  
      }, 1000); 
    });
               
  }

   async checkfunc(){
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.props.navigation.replace("Restaurantscreen")
      }
      else{
        this.props.navigation.replace("Loginscreen")
      }
  }

  render() {
    return (
      <View style = {{flex:1 , alignItems:"center", justifyContent:'center', backgroundColor:'#8E0438'}}>
        <Animated.View style={{ ...this.props.style, opacity: this.fadeAnim }} >
        {this.props.children}

             <View style={styles.loginbutton}> 
              
            <Image
            style={styles.stretch}
            source={require('../assets/applogo5.png')}
          />
       
          </View>
          

        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bigbuttontext: {
          fontWeight: "bold",
          color: "white",
          fontFamily: 'Roboto-Bold',
          fontSize: 30,
          textAlign: "center",
          paddingTop: '1%',
          paddingBottom: '1%',
      
          // opacity: 1,
      
        },
        loginbutton: {
          // paddingHorizontal: 15,
          // backgroundColor: "#008f2b",
          // borderRadius: 100,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.9,
          shadowRadius: 6,
          elevation: 2,
          
          height:300,
          width:200,
        
          alignItems:'center',
          // minHeight: '6%',
          marginBottom:'10%',
          textAlign: "center",
          justifyContent: "center"
          // minHeight: '0%',
          // paddingVertical: 5,
          // paddingVertical: '5%',
      
          // alignItems: "center",
          // paddingTop: 10,
          // fontSize: 25,
          
        },
        inputIcon:{
          padding:"3%",
          width:'100%',
          height:'100%',
          // margin:10,
          justifyContent: 'center'
        },
        contact_head:{
          color:"orange",
          fontSize:50,
          fontStyle:"italic",
          fontWeight:'bold',
          textAlign:"center",alignSelf:'center'
    
          
        },
        stretch: {
          width: '200%',
          height: '200%',
          resizeMode: "contain",
          // paddingBottom: 10,
          // paddingEnd: 10,
          // paddingTop: 0,
        },

});

