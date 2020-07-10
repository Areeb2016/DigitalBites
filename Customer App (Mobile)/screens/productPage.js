
import React, { Component } from 'react';
import {  Linking, Platform, ImageBackground, View, TouchableOpacity, Image,AsyncStorage,Text, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Header, Content, Body, Title, Left, Right,  List, ListItem, Label} from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import {Button} from 'react-native-paper';
import AlertPro from "react-native-alert-pro";
import { Card, Icon } from 'react-native-elements';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Mat from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
 
export default class ListDividerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      food:'',
      price:'',
      quantity:'',
       load: false
      }
    
  }
  componentDidMount(){
    this.getData()
  }
  getData = async()=>{
            
    const food = await AsyncStorage.getItem("food")
    const token = await AsyncStorage.getItem("token")  
    const response = await fetch('https://digitalbites.herokuapp.com/food/'+food,
    {
      headers:new Headers({
        Authorization:"Bearer "+token
      })
      })
    const data  = await response.json();
    this.setState({
      data:data,
      load: true
    })
    // alert(this.state.data) 
  }

  onClickAddCart=async()=>{
   
    this.AlertPro.close()
    const{food,price,quantity,data}=this.state;
    

    const itemcart = {
      food: data,
      quantity:  1,
      price: this.state.data.price
    }
 
    AsyncStorage.getItem('cart').then((datacart)=>{
        if (datacart !== null) {
        
          const cart = JSON.parse(datacart)
          cart.push(itemcart)
          AsyncStorage.setItem('cart',JSON.stringify(cart));
        }
        else{
          const cart  = []
          cart.push(itemcart)
          AsyncStorage.setItem('cart',JSON.stringify(cart));
        }
        this.AlertProt.open()
      })
      .catch((err)=>{
        alert(err)
      })
  }

  render() {
    const screenHeight = Math.round(Dimensions.get('window').height)/2;
    if(this.state.load == false){
      return(
        <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='arrow-back' color='white' onPress={()=>this.props.navigation.replace("Menu")}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>{this.state.data.name}</Text>
          </Body>
          <Right>
              <Ionicons name='ios-cart' color='white' size={28} onPress={()=>this.props.navigation.replace("Cart")}/>
          </Right>
        </Header>
        <Content>
        <ActivityIndicator color='#8E0438' style={{paddingVertical:screenHeight}}/>
        </Content>
        </Container>
      )
    }
    else{
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='arrow-back' color='white' onPress={()=>this.props.navigation.replace("Menu")}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>{this.state.data.name}</Text>
          </Body>
          <Right>
              <Ionicons name='ios-cart' color='white' size={28} onPress={()=>this.props.navigation.replace("Cart")}/>
          </Right>
        </Header>
        <Content>
        <ImageBackground source={{ uri: this.state.data.image }} style={{width: '100%', height: '50%'}}/>

          <List style={{marginTop:-220, marginBottom:500}}>  
          <Card>
          <ListItem itemDivider>
            <Text>Description</Text>
            </ListItem>  
           
          <ListItem>
    <Text style={{fontWeight:'bold'}}>{this.state.data.category}{'\n'}{this.state.data.description}</Text>
    </ListItem>
    <ListItem itemDivider>
            <Text>Order Time</Text>
            </ListItem>  
            <ListItem>
    <Text style={{fontWeight:'bold'}}>{this.state.data.Duration}</Text>
    </ListItem>

            <ListItem itemDivider>
            <Text>Servings</Text>
            </ListItem>  
            <ListItem>
    <Text style={{fontWeight:'bold'}}>{this.state.data.Serving}</Text>
    </ListItem>

    <Card>
          <ListItem style={{alignItems:'center', alignContent:'center', justifyContent:'center'}}>
    <Text style={{fontSize:30, fontWeight:'bold', color:'black'}}>PKR {this.state.data.price}</Text>
    </ListItem>
    </Card>

    <ListItem style={{borderBottomWidth:0, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
    <TouchableOpacity onPress={()=>this.props.navigation.replace("FRating")} style={{backgroundColor:'#8E0438', padding:'5%', borderRadius:30}}>
      <Mat name='rate-review' size={30} color='white' />
      </TouchableOpacity>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('ARscreen')} style={{backgroundColor:'#8E0438', padding:'5%', marginLeft:'40%', borderRadius:30}}>
<Material name='augmented-reality' size={30} color='white'/>
</TouchableOpacity>
    </ListItem>
    
    <ListItem style={{borderBottomWidth:0, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <Button
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:0, backgroundColor:'#8E0438'}}
        onPress={() => this.AlertPro.open()}>
        Add to Cart
      </Button>
      </ListItem>
      </Card>
          </List>
          <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          title="Add To Cart"
          message="Are you sure to add this item to your Cart?"
          textCancel="Cancel"
          textConfirm="Confirm"
          onConfirm={() => this.onClickAddCart()}
          onCancel={() => this.AlertPro.close()}
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
        <AlertPro
          ref={ref => {
            this.AlertProt = ref;
          }}
          onCancel={() => this.AlertProt.close()}
          title="Item Added to Cart"
          message="Item added successfully"
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
}