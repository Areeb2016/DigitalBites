import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  BackHandler,
  AsyncStorage
} from 'react-native';
import moment from "moment";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import { Container, Header, Left, Body, Right, Content, Icon } from 'native-base';
import Geocoder from 'react-native-geocoding';

export default class Categories extends Component {
  constructor(props) {
    super(props);
 this. state = {
    orders:[],
    latitude: this.props.route.params.lat,
    longitude: this.props.route.params.lon,
    addressLocal: null
  };
  }
    
  async componentDidMount() {
    this.getorders()
    Geocoder.init("AIzaSyDqC_afyOZbsUZ1vCGgXCZ7kABXkPFbDvE");
    var ad = await Geocoder.from({
      latitude : this.state.latitude,
      longitude : this.state.longitude
    });
   this.setState({
     addressLocal: ad.results[0].formatted_address
   })
    this.getorders()
  }
  getorders=async()=>{
    const token = await AsyncStorage.getItem("token")  
    const id = this.props.route.params.itemId;
  
 
    const response = await fetch('https://digitalbites.herokuapp.com/orders/' +id,{
        headers:new Headers({
          Authorization:"Bearer "+token
        })
        }
        
        
        ).then
    
        ((response) => response.json())
    .then((responseJson) => {
      
    
    
    // console.log(responseJson.items)
       
    this.setState({orders: responseJson.items});
   
   
    
    })
    .catch((error) => {
    console.error(error);
    });
 
 }

 onloadtotal()
{
  var total=0
  const cart=this.state.orders
 
  for (var i=0;i<cart.length;i++){
  
    total=total+(cart[i].food.price*cart[i].quantity)
  }
  return total
}
_getAddress(){
  var ad = Geocoder.from({
    latitude : this.state.latitude,
    longitude : this.state.longitude
  });
  // this.setState({
  //   addressLocal: ad
  // })
}
 

  render() {
    console.disableYellowBox = true;
    return (
        <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='arrow-back' style={{color:'white'}} onPress={()=>this.props.navigation.goBack()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>Order Detail</Text>
          </Body>
          <Right/>
        </Header>
        <Content>
        <View style={Styles.Header}>
          <View style={Styles.HeaderTextView}>
            <Text style={Styles.HeaderLargeText}>
              {'Products'}
             
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop:10}}>
            <Text style={[Styles.ExtraSmallText, {color: '#8E0438'}]}>
              {'Ready '}
            </Text>
            <Text style={Styles.ExtraSmallText}>
              {' - '}
               {moment(this.props.route.params. createdAt).startOf('hour').fromNow()}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', width: '90%', alignSelf: 'center', marginRight:20, marginTop:5}}>
            <Text style={[Styles.ExtraSmallText, {color: '#8E0438'}]}>
              {'Address '}
            </Text>
            <Text style={Styles.ExtraSmallText}>
              {' - '}
              {this.state.addressLocal} 
              {/* ChakShahzad */}
            </Text>
          </View>
        </View>
      
        <ScrollView>

{
this.state.orders.map((item,i)=>{

return(
<Content style={{marginTop:15}}>

        <View style={Styles.MainCard}>
        <View style={Styles.InnerCardView}>
          <View style={Styles.Left}>
            <View style={{width: '20%', justifyContent: 'center'}}>
              <Icon name='ios-checkmark-circle-outline'/>
            </View>
            <View style={{width: '70%', justifyContent: 'center'}}>
              <Text style={[Styles.ExtraSmallText, {fontWeight: 'bold'}]}>
                {item.food.name}
              </Text>
              <Text
                style={[
                  Styles.ExtraSmallText,
                  {color: 'grey', fontSize: 14},
                ]}>
                {item.quantity}
                {' item'}
                {' x '}
                {'RS '}
                {item.food.price}
              </Text>
            </View>
          </View>
          <View style={Styles.Right}>
            <Text
              style={[
                Styles.ExtraSmallText,
                {
                  color: '#8E0438',
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              ]}>
              {'RS '}
              {item.food.price*item.quantity}
            </Text>
           
            
          </View>
        </View>
      </View>

</Content>

)
})
}

</ScrollView>

          <View style={Styles.TotalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text
                style={[
                  Styles.ExtraSmallText,
                  {color: 'grey', fontSize: 14},
                ]}>
                {'Total'}
              </Text>
              <Text
                style={[
                  Styles.ExtraSmallText,
                  {color: 'grey', fontSize: 14},
                ]}>
                {'RS '}
                {this.onloadtotal()}
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text
                style={[
                  Styles.ExtraSmallText,
                  {color: 'grey', fontSize: 14},
                ]}>
                {'Delivery'}
              </Text>
              <Text
                style={[
                  Styles.ExtraSmallText,
                  {color: 'grey', fontSize: 14},
                ]}>
                {'RS '}
                {'7.0'}
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text style={[Styles.ExtraSmallText, {color: '#8E0438'}]}>
                {'Total'}
              </Text>
              <Text style={[Styles.ExtraSmallText, {color: '#8E0438'}]}>
                {'RS '}
                {this.onloadtotal()+7}
              </Text>
            </View>
          </View>
          <View style={Styles.ButtonView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.replace('Tracker',{itemId:this.props.route.params.itemId, createdAt:this.props.route.params.createdAt, lat:this.props.route.params.lat, lon:this.props.route.params.lon });
              }}
              style={Styles.ButtonTouch}>
              <Text style={[Styles.ExtraSmallText, {color: 'white'}]}>
                Start Ride
              </Text>
            </TouchableOpacity>
          </View>
        
      </Content>
      </Container>
    );}
}

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    Header: {
      height: responsiveHeight(17),
      width: '100%',
      backgroundColor: 'white',
    },
    ArrowView: {
      height: responsiveHeight(10),
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    HeaderTextView: {
      paddingTop: responsiveHeight(1),
      width: '90%',
      alignSelf: 'center',
    },
    HeaderLargeText: {
      color: '#8E0438',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(4),
      letterSpacing: 1,
    },
    HeaderSmallText: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.2),
      letterSpacing: 1,
    },
    headerImageStyle: {
      width: responsiveWidth(8),
      height: responsiveHeight(5),
      resizeMode: 'contain',
    },
    ExtraSmallText: {
      fontSize: responsiveFontSize(1.8),
      color: 'black',
    },
    Seprator: {
      marginTop: responsiveHeight(2),
    },
    contentContainerStyle: {
      paddingVertical: responsiveHeight(5),
    },
    MainCard: {
      width: '90%',
      alignSelf: 'center',
      paddingVertical: responsiveHeight(1),
      justifyContent: 'center',
    },
    InnerCardView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItems: 'center',
      width: '100%',
    },
    Left: {
      width: '80%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    Right: {
      width: '20%',
      justifyContent: 'center',
    },
    TotalView: {
      width: '70%',
      height: responsiveHeight(10),
      alignSelf: 'center',
      marginLeft:25,
      marginTop:30
    },
    ButtonView: {
      width: '100%',
      height: responsiveHeight(15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    ButtonTouch: {
      width: '60%',
      height: responsiveHeight(6),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8E0438',
    },
  });