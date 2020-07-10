import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions,AsyncStorage,ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content, Button, Body, Title, Icon, Left, Right,  List, ListItem, Label} from 'native-base';
import AlertPro from "react-native-alert-pro";

var { width } = Dimensions.get("window")

export default class ListDividerExample extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataCart:[],
    };
 }
 componentDidMount()
 {
   AsyncStorage.getItem('cart').then((cart)=>{
     if (cart !== null) {
       // We have data!!
       const cartfood = JSON.parse(cart)
       this.setState({dataCart:cartfood})
     }
   })
   .catch((err)=>{
     alert(err)
   })
 }
 onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     this.setState({dataCart:dataCar})
    } 
  }
 
  onloadtotal()
{
  var total=0
  const cart=this.state.dataCart
 
  for (var i=0;i<cart.length;i++){
    total=total+(cart[i].price*cart[i].quantity)
  }
  return total
}

// placeorder=async()=>{
//   const token = await AsyncStorage.getItem("token")
//   const res = await AsyncStorage.getItem("restaurant")
//   const {dataCart} = this.state;

//   console.log(JSON.stringify(dataCart))
//   fetch('http://192.168.1.7:4000/orders/'+res,{
//     method:"POST",
//     headers: new Headers({
//       Authorization:"Bearer "+token,
//       'Content-Type': 'application/json'
//     }),
//    body:JSON.stringify({
//      "order":dataCart,
//    })
//   })
//   .then(res=>res.json())
//   .then(async (data)=>{
//     this.AlertPro.open()
//     await AsyncStorage.removeItem('cart')
//   }) 
//   .catch(this.AlertProt.open())
//  }

 render() {
 
  return (
   
    <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>Cart</Text>
          </Body>
          <Right>
              <Icon name='ios-home' style={{color:'white'}}  onPress={()=>this.props.navigation.replace("Restaurantscreen")}/>
          </Right>
        </Header>

    <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
       
       <View style={{height:10}} />

       <View style={{flex:1}}>

         <ScrollView>
           {
             this.state.dataCart.map((item,i)=>{
               return(
                 <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                 
                   <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.food.image}} />
                   <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                     <View style={{marginTop:10}}>
                       <Text style={{fontWeight:"bold", fontSize:20, color:"black"}}>{item.food.name}</Text>
               <Text>{item.food.description}</Text>
                     </View>
                     <View style={{flexDirection:'row',justifyContent:'space-between', marginBottom:7}}>
                       <Text style={{fontWeight:'bold',color:"black",fontSize:20}}>PKR {item.price*item.quantity}</Text>
                       <View style={{flexDirection:'row', alignItems:'center'}}>
                         <TouchableOpacity onPress={()=>this.onChangeQual(i,false)}>
                           <Icon name="ios-remove-circle" size={35} style={{color:"#8E0438"}} />
                         </TouchableOpacity>
                         <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.quantity}</Text>
                         <TouchableOpacity onPress={()=>this.onChangeQual(i,true)}>
                           <Icon name="ios-add-circle" size={35} style={{color:"#8E0438"}} />
                         </TouchableOpacity>
                       </View>
                     </View>
                   </View>
                 </View>
               )
             })
           }
 </ScrollView>

           <View style={{height:20}} />
          <View style={{alignItems:'center', backgroundColor:'lightgrey', height:50}}>
            <Text style={{marginTop:13, color:'white', fontSize:20, fontWeight:'bold', fontStyle:'italic'}}>Total: PKR {this.onloadtotal()}</Text>
            </View>

           <TouchableOpacity style={{
               backgroundColor:"#8E0438",
               width:width-40,
               alignItems:'center',
               padding:10,
               borderRadius:5,
               margin:20
             }}
             onPress={() => this.props.navigation.replace('LocationY', {dataC: this.state.dataCart})}
             >
             <Text style={{
                 fontSize:24,
                 fontWeight:"bold",
                 color:'white'
               }}>
               CHECKOUT
             </Text>
           </TouchableOpacity>
           <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          title="Order Sent"
          message="Your order is sent"
          textConfirm="OK"
          onConfirm={() => this.AlertPro.close()}
          showCancel={false}
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
          title="Not Send"
          message="Your order is sent"
          textConfirm="OK"
          onConfirm={() => this.AlertProt.close()}
          showCancel={false}
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
           <View style={{height:10}} />
        
       </View>

    </View>
    </Container>
  );
}


}