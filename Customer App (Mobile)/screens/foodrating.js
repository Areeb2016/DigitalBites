import React, { Component,useEffect,useState } from 'react';

import { Container, Header, Content, Item, Input, Button, Left, Body, Right,List,ListItem,Thumbnail, CardItem} from 'native-base';
import { 
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet, TextInput, TouchableOpacity,AsyncStorage,FlatList, StatusBar
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import AlertPro from "react-native-alert-pro";

class TapRatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
       reviews: '',
       data : []
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
    });
  const data  = await response.json();

  this.setState({
    data:data.foodReviews
  })
}
   
  saveData=async() => {
    this.AlertPro.close()
    const food = await AsyncStorage.getItem("food")
    const token = await AsyncStorage.getItem("token")
    const {rating,reviews} = this.state;
  
    fetch('https://digitalbites.herokuapp.com/food/foodreview/'+food,{
      method:"POST",
     
      headers: new Headers({
        Authorization:"Bearer "+token,
        'Content-Type': 'application/json'
      }),
     body:JSON.stringify({
       "rating":rating,
       "reviews":reviews
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      this.AlertProt.open()
    }) 
    .catch(this.AlertProt.open())
  }

  render() {
    return (
      <Container style={{backgroundColor:''}}>
      <Header style={{backgroundColor:'#8E0438'}}>
      <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon color='white' name='arrow-back' onPress={()=>this.props.navigation.replace("Products")}/>
          </Left>
          <Body>
           <Text style={{fontSize:20, color:'white'}}>Ratings</Text>
          </Body>
          <Right></Right>
        </Header>

        
          <Card title="RATE?" containerStyle={styles.card}>
            
          <AirbnbRating
              count={5}
              reviews={["Terrible", "Meh", "OK", "Good", "Wow"]}
              defaultRating={null}
              size={20}
              onFinishRating={rating => this.setState({rating})}
            />
            <Item rounded>
            <Input placeholder='Write a Review'  
             onChangeText={reviews => this.setState({reviews})}
            />
          </Item>
          <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.AlertPro.open()} activeOpacity={0.7} style={{marginTop:10, backgroundColor:'#8E0438', padding:'2%'}} >
       
        <Icon name='send' color='white' size={30}/>
       
        </TouchableOpacity>  
          </Card>
        
          <View style={{backgroundColor:'grey', height:40, alignItems:'center'}}>    
          <Text style={{color:'white', marginTop:10}}>Previous Ratings</Text>
          </View> 
         
          <FlatList
   data = {this.state.data}

   renderItem = {({item}) =>
          <Card>
          <CardItem thumbnail>
           
            <Body style={{alignItems:'center'}}>
       <Text style={{color:"black"}}>Rating By:  {item.review.reviewby}</Text>

       <AirbnbRating            
              defaultRating={item.review.rating}
              size={14}
            />
    
      <Text style={{color:"green"}}>Review: {item.review.reviews}</Text>
      
            </Body>
            
          </CardItem>
          </Card>
        }
        keyExtractor={(item, index) => index.toString()}
    />

<AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          title="Rate Now"
          message="You are about to rate this item"
          textCancel="Cancel"
          textConfirm="Confirm"
          onConfirm={() => this.saveData()}
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
          title="Successfull"
          message="Item Rated"
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

        </Container>
    );
  }
}

const styles = StyleSheet.create( {
  flex: {
    flex: 1
  },
  center:  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    paddingBottom: 0
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
    color: '#27ae60'
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e'
  },
  card: {
    width: '90%', 
    marginBottom: 20
  },
});

export default TapRatingScreen;