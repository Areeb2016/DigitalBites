import React, { Component } from "react";
import { Container, Header, Content, Body, Accordion, Title, Left, Icon, Right } from "native-base";
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image, StatusBar} from 'react-native';


const dataArray = [
  { title: "How do I use it?", content: "Can be done online when ordering takeout or delivery as well as in store." },
  { title: "Is it free?", content: "Digital Bites is free to use" },
  { title: "Which phones are supported?", content: "Digital Bites is available on Apple IOS" },
  { title: "Can I cancel my order?", content: " Call the restaurant to change the order. After leaving the supplier is not possible to change.  With regards to any refund of a payment you have made online, you must always contact us and not the restaurant." },
  { title: "What happens if I am missing items from my order when it is delivered?", content: "Call us within one hour of delivery, so we may contact the restaurant about the shortage. Any credits will be based upon the restaurant's decision. Our drivers do not open up containers to verify your food. We rely on the restaurant who is packaging your order to pack it correctly. If the restaurant decides to offer a credit, then we apply a credit to your account to be used on your next order, from any restaurant." },
  { title: "Who do I call if there is a mistake with my order?", content: "Please call WE DELIVER at 254-383-9177 within thirty minutes of delivery (even if it is after the office hours) if there is anything missing or incorrect. We will get incorrect items replaced; missing items delivered or arrange for a credit towards your next order. Credits cannot be applied to online orders. To use your credit, please call the office to place your order. Thank you for reporting your concerns to us so we can continue improving our service." },
  { title: "What if the restaurant has changed its prices?", content: "If there has been a menu change and there is a difference of more than 5.00 we will contact you to make sure the price difference is ok or if you want to change an item." },
  { title: "Why are there more restaurants in the delivery catalog than on the website?", content: "We deliver for restaurants all over the city. When you log in to the app, the restaurants within your general delivery range will appear." },
  { title: "How do I use it?", content: "Can be done online when ordering takeout or delivery as well as in store." },
  { title: "Is it free?", content: "Digital Bites is free to use" },
  { title: "Which phones are supported?", content: "Digital Bites is available on Apple IOS" },
  { title: "How do I use it?", content: "Can be done online when ordering takeout or delivery as well as in store." },
  { title: "Is it free?", content: "Digital Bites is free to use" },
  { title: "Which phones are supported?", content: "Digital Bites is available on Apple IOS" },
  { title: "How do I use it?", content: "Can be done online when ordering takeout or delivery as well as in store." },
  { title: "Is it free?", content: "Digital Bites is free to use" },
  { title: "Which phones are supported?", content: "Digital Bites is available on Apple IOS" }
];
  
export default class Faq extends Component {
  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
            <Icon style={{color:'white'}} name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>FAQ</Text></Body>
          <Right></Right>
        </Header>  
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0}/>
        </Content>
      </Container>
    );
  }
}