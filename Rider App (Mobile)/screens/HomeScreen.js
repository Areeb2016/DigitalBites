import React, { Component } from "react";
import { View, Text, Container, Header, Content, Icon, Left, Body, Right } from "native-base";
import { Input, Button } from "react-native-elements";
import { TouchableOpacity, StatusBar,AsyncStorage } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';   
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Profile extends Component{
    constructor(props){
            super(props);
    this.state = {
                name: '',
                editName: false,
                email: '',
                password: '',
                editPassword: false,
                phone: '',
                editPhone: false,
                originalProfile: { name: 'Areeb', email: 'tahamian37@gmail.com', password: '123456', phone: '+92-335-5199903' }
            };
            

    }
    componentDidMount(){
      this.getData()
    }
    getData = async()=>{
              
      const token = await AsyncStorage.getItem("token")
        
           fetch('https://digitalbites.herokuapp.com/',{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(data=>{
      
      this.setState({
        email:data.email,
        password:data.password,
        phone:data.phone

      })
      
      
    }
    )
      
      
    }  
    render(){
        return(
            <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
            <Icon style={{color:'white'}} name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Profile</Text></Body>
          <Right>
              <Icon name='ios-home' style={{color:'white'}}  onPress={()=>this.props.navigation.replace("Restaurantscreen")}/>
          </Right>
        </Header>  
                <Content>
                <View style={{ margin: 20 }}>
                <View style={{borderWidth: 1, borderColor: '#DDD', borderRadius: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 2, elevation: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#8E0438', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                                <Ionicons name='md-person' size={30} color='white' />
                            </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 2 }}>{this.state.email}</Text>
                            <View style={{ alignSelf: 'center', marginBottom: 20 }}/>
                            <Input
                                editable={this.state.editName}
                                placeholder='Name'
                                autoCapitalize='words'
                                autoCompleteType='name'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <Ionicons name='md-person' size={22} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() =>  this.setState({ editName: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#8E0438' />
                                    </TouchableOpacity>
                                }
                                value={this.state.name}
                                onChangeText={(value) => this.setState({ name: value })}
                            />

                            <Input
                                placeholder='abc@gmail.com'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <MaterialCommunityIcons name='email' size={22} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                value={this.state.email}
                                onChangeText={(value) => this.setState({ email: value })}
                            />

                            <Input
                                editable={this.state.editPassword}
                                secureTextEntry={true}
                                placeholder='********'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='off'
                                keyboardType='default'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <MaterialCommunityIcons name='lock' size={22} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() => this.setState({ editPassword: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#8E0438' />
                                    </TouchableOpacity>
                                }
                                value={this.state.password}
                                onChangeText={(value) => this.setState({ password: value })}
                            />

                            <Input
                                editable={this.state.editPhone}
                                placeholder='+92-3xx-xxxxxxx'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='tel'
                                keyboardType='number-pad'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438' }}
                                containerStyle={{ marginBottom: 20 }}
                                leftIcon={ <FontAwesome name='phone' size={22} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                rightIcon={
                                    <TouchableOpacity onPress={() => this.setState({ editPhone: true })}>
                                        <FontAwesome5 name='pen' size={18} color='#8E0438' />
                                    </TouchableOpacity>
                                }
                                value={this.state.phone}
                                onChangeText={(value) => this.setState({ phone: value })}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 10 }}>
                                <Button
                                    title='Cancel'
                                    buttonStyle={{ backgroundColor: 'white', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, borderColor: '#8E0438', borderWidth: 2 }}
                                    titleStyle={{ color: 'black' }}
                                    onPress={() => {
                                        this.setState({
                                            name: this.state.originalProfile.name,
                                            editName: false,
                                            email: this.state.originalProfile.email,
                                            password: this.state.originalProfile.password,
                                            editPassword: false,
                                            phone: this.state.originalProfile.phone,
                                            editPhone: false
                                        })
                                    }}
                                />
                                <Button
                                    title='Update'
                                    buttonStyle={{ backgroundColor: '#8E0438', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10, borderColor: '#8E0438', borderWidth: 2 }}
                                    onPress={() => {
                                        let name = this.state.name;
                                        let email = this.state.email;
                                        let password = this.state.password;
                                        let phone = this.state.phone;
                                        this.setState({
                                            editName: false,
                                            editPassword: false,
                                            editPhone: false,
                                            originalProfile: { name, email, password, phone }
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        </View>
                        </Content>
                        </Container>
        )
    }
}

















// import React,{useEffect,useState} from 'react';
// import { Button ,TextInput} from 'react-native-paper';
// import {
//   ActivityIndicator,StyleSheet,
//   Text,AsyncStorage
// } from 'react-native';


// const HomeScreen = (props) => { 
//    const [email,setEmail] = useState("loading")
//    const Boiler = async ()=>{
//       const token = await AsyncStorage.getItem("token")
//       alert(token)
      
//     fetch('http://10.113.54.111:3000/',{
//     headers:new Headers({
//       Authorization:"Bearer "+token
//     })
//     }).then(res=>res.json())
//     .then(data=>{
      
//       setEmail(data.email)
      
      
//     }
//     )
//    }
// useEffect(()=>{
//    Boiler()
// },[])

//    const logout =(props)=>{
//       AsyncStorage.removeItem("token").then(()=>{
//         props.navigation.replace("login")
//       })
//    }

//   return (
//    <> 
//     <Text style={{fontSize:18}}>your email is {email}</Text>
//     <Button 
//         mode="contained"
//         style={{marginLeft:18,marginRight:18,marginTop:18}}
//          onPress={() => logout(props)}>
//         logout
//       </Button>
//    </>
//   );
// };



// export default HomeScreen;
