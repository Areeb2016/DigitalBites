import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Left, Button, Icon, Body, Right } from 'native-base';
import { TouchableOpacity, StatusBar, Text, AsyncStorage } from 'react-native';
import AlertPro from 'react-native-alert-pro';


export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
       email: '',
       Message : ''   
    }
}

sendmessage=async()=>{
  
  const{name,email,Message}=this.state
  const token = await AsyncStorage.getItem("token")
  this.AlertPro.open()
    fetch("http://192.168.1.10:3000/message",{
      method:"POST",
      headers: new Headers({
        Authorization:"Bearer "+token,
        'Content-Type': 'application/json'
      }),
     body:JSON.stringify({
       "name":name,
       "email": email,
       "message":Message,
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
           try {
            console.log("sucessfull")
            this.AlertPro.open()
           } catch (e) {
             console.log("error hai",e)
             this.AlertPro.open()
           }
    })
} 

  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
            <Icon style={{color:'white'}} name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Contact Us</Text></Body>
          <Right></Right>
        </Header>  
        <Content>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 24}}>Leave Us A Message</Label>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 14}}>We will appreciate if we are of any of your help</Label>
          <Form>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Name</Label>
              <Input onChangeText={name => this.setState({name})} style={{marginLeft:10}}/>
            </Item>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Email</Label>
              <Input onChangeText={email => this.setState({email})} style={{marginLeft:5}}/>
            </Item>
            <Label style={{marginTop:20, textAlign:'center', fontSize: 20}}>Your Message</Label>    
            <Textarea onChangeText={Message => this.setState({Message})} rowSpan={5} bordered placeholder="Enter Your Message" style={{marginLeft:10, marginRight:10}}/>
            
        <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#8E0438', alignItems:'center', alignContent:'center', justifyContent:'center'}}
       onPress={this.sendmessage}
       >
        <Icon name='ios-send'onPress={this.sendmessage}/>
        <Text style={{color:'white'}}>SEND MESSAGE</Text>
      </Button>
          </Form>
          <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          onCancel={() => {
            this.AlertPro.close()
            this.props.navigation.navigate("Restaurantscreen")
          }}
          title="Successfull"
          message="Message Sent"
          textCancel="Ok"
          showConfirm={false}
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonCancel: {
              backgroundColor: "#4da6ff"
            },
            buttonConfirm: {
              backgroundColor: "#ffa31a"
            }
          }}
        />
        </Content>
      </Container>
    );
  }
}