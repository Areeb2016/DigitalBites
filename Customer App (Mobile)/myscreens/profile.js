import React, { Component } from "react";
import { View, Text, Container, Header, Content, Icon, Left, Body, Right } from "native-base";
import { Input, Button } from "react-native-elements";
import { TouchableOpacity, StatusBar,AsyncStorage, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
                editEmail: false,
                editAddress: true,
                searchFocused: false,
                address: "",
                title: null,
                originalProfile: []
            };
            

    }
    componentDidMount(){
      this.getData()
    }

    handleLocationSelected( data, { geometry }) {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        // setDestination({
        //     latitude,
        //     longitude,
            // title: data.structured_formatting.main_text
        // })
        this.setState({
          latitude: latitude,
          longitude: longitude,
          title: data.structured_formatting.main_text + ", " + data.structured_formatting.secondary_text
        })
        console.log("clicked, ", latitude)
        // alert(JSON.stringify(this.state.title))
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
        name:data.name,
        email:data.email,
        password:data.password,
        phone:data.phone,
        address:data.address,
        originalProfile:data,
      })
    })
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 2 }}>{this.state.name}</Text>
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
                            editable={this.state.editEmail}
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

                            {/* <Input
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
                            /> */}

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
    
    <View style={{flexDirection:'row', borderBottomColor:'#8E0438', borderBottomWidth:1, marginLeft:10, marginRight:10}}>
    <FontAwesome name='map-marker' size={22} color='#8E0438' style={{bottom:15,position:'absolute', marginLeft:5}}/>
    <GooglePlacesAutocomplete
        placeholder={this.state.address}
        placeholderTextColor="black"
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
        // renderRightButton={() => {return( 
        //     <TouchableOpacity onPress={() => this.setState({ editPhone: true })}>
        //     <FontAwesome5 name='pen' size={18} color='#8E0438' />
        // </TouchableOpacity>
        // )}}
        
        fetchDetails
        editable = {this.state.editAddress}
        value = {this.state.address}
        enablePoweredByContainer={false}
        styles={{
            container: {
                // position: "absolute",
                // top: Platform.select({ ios: 60, android: 10 }),
                width: "100%",
                marginLeft:20
            },
            textInputContainer: {
                flex: 1,
                height: 54,
                marginHorizontal: 10,
                borderTopWidth:0
            },
            textInput: {
                height: 54,
                margin: 0,
                borderRadius: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                // elevation: 5,
                // shadowColor: "#000",
                // shadowOpacity: 0.1,
                // shadowOffset: { x: 0, y: 0 },
                // shadowRadius: 15,
                // borderWidth: 1,
                // borderColor: "#DDD",
                fontSize: 18,
                borderTopWidth:0,
                borderBottomColor:'#8E0438',
                borderBottomWidth:0
            },
            listView: {
                // borderWidth: 1,
                borderColor: "#DDD",
                backgroundColor: "#FFF",
                marginHorizontal: 10,
                // elevation: 5,
                // shadowColor: "#000",
                // shadowOpacity: 0.1,
                // shadowOffset: { x: 0, y: 0 },
                // shadowRadius: 15,
                // marginTop: 10
            },
            description: {
                fontSize: 16
            },
            row: {
                padding: 10,
                height: 58
            },
        }}
    />
    {/* <TouchableOpacity onPress={() => this.setState({ editAddress: true })}>
    <FontAwesome5 name='pen' size={18} color='#8E0438' style={{bottom:15,position:'absolute', right:2}}/>
    </TouchableOpacity> */}
    </View>
                            <View style={{marginBottom:20}}>
                            {/* <Button 
                            buttonStyle={{ backgroundColor: '#8E0438', borderColor: 'white'}}
                            title='Address' onPress={() => this.props.navigation.navigate("Address")}>
                            </Button> */}
                            </View>
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
                                            editPhone: false,
                                            address: this.state.originalProfile.address,
                                            title: this.state.originalProfile.address
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