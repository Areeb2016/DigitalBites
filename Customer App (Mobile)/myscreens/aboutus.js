import React, { Component } from "react";
import { Container, Header, Content, Body, Left, Icon, Right, List, ListItem } from "native-base";
import { ImageComponent, View, Image, Text, ImageBackground, StatusBar, ScrollView } from "react-native";
import { Card } from "react-native-elements";
  
export default class AboutUs extends Component {
  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
            <Icon style={{color:'white'}} name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>About Us</Text></Body>
          <Right></Right>
        </Header>  
        <Content>
          <ScrollView>
        <View style={{alignItems: 'center'}}>
        <Image style={{width: 420, height: 300}}
          source={require('../assets/burger.jpg')} />
          </View>
          <List>
            <Card>
              <ListItem itemDivider>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
        </ListItem>
        <ListItem>
        <Text style={{justifyContent: "space-evenly", textAlign: 'justify', fontSize: 14, color:'black'}}>
          We are visual beings, and our world exists in 3D. Digital Bites lifts your brand into the real world. Digital Bites established its beachhead within the AR industry by creating the most lifelike models of cuisine. For years we perfected our modeling process to present dishes that look completely real, are platform agnostic and optimized for AR. We knew the same process would work for a whole myriad of brands and items – and thus Digital Bites was born. Now we work in many different verticals, including fashion, luxury, automotive, and more.We want to make rad experiences. We want to expand the medium of AR. We want people to see our work. Oh, and we are really really nice and good people.
        </Text>
        </ListItem>
        </Card>
        <Card>
          <ListItem>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Content</Text>
        </ListItem>
        <ListItem>
        <Text style={{justifyContent: "space-evenly", textAlign: 'justify', fontSize: 14, color:'black'}}>
          The world of Augmented Reality is here. It requires a paradigm shift in content. The new world of media will be in 3D. Digital Bites strives to make the most lifelike and beautiful 3D content in the world. With a proprietary process honed over the years, we can recreate your product in the most intimate detail. All of our content is optimized for AR and created to work through your entire ecosystem. 3D models have been around for a long time – used primarily for architectural purposes or pure animation. Those models while high in quality and detail, but lacked platform ambiguity limiting their reach and application. QReal creates models with a single beautiful texture, allowing the content to be accessed and shared across the web, social media, and any other digital distribution networks.
        </Text>
        </ListItem>
        </Card>
        </List>
        </ScrollView>
        </Content>
      </Container>
    )
  }
}