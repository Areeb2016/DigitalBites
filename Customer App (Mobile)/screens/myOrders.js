import React, { Component } from "react";
import { Container, Header, Icon, Left, Body, Right, Text, Content,List } from "native-base";
import { StatusBar, FlatList, TouchableOpacity, StyleSheet, View ,AsyncStorage,ScrollView} from "react-native";

 import moment from "moment";
export default class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      orders : [],
      isLoading: true,
      toki:'' 
    };
  }   
        componentDidMount() {
        this.getData()
  
};


getData = async()=>{
     
  const token = await AsyncStorage.getItem("token")  
this.setState({toki: token});
 const response = await fetch('https://digitalbites.herokuapp.com/orders/Ohistory',{
   headers:new Headers({
     Authorization:"Bearer "+token
   })
   }).then((response) => response.json())
.then((responseJson) => {
 
// alert(JSON.stringify(responseJson))
  
 this.setState({orders:responseJson});

})
.catch((error) => {
console.error(error);
});
 }
       
 getListViewItem = async(item) => {
      //  alert("here")
  this.props.navigation.navigate(
    'PubnubScreen',
    { itemId: item._id, 
      createdAt:item.createdAt,
      lat: parseFloat(item.latitude),
      lon: parseFloat(item.longitude),
      toki: this.state.toki
    },
  
  );
     
 } 
    
    render(){
      console.disableYellowBox = true;
      if(this.state.orders == ''){
        return(
          <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>My Orders</Text>
          </Body>
          <Right/>
        </Header>
          <View style={{flex:1, alignItems:'center', marginTop:330}}>
            <Text style={{fontWeight:'bold', fontSize:20}}>You have no orders yet!</Text>
          </View>
          </Container>
        )
      }
      else{
        return(
            <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>My Orders</Text>
          </Body>
          <Right/>
        </Header>
        <ScrollView>

        {
  this.state.orders.map((item,i)=>{

    return(
      <Content>
{(item.status == "pending" || item.status == "assighned") &&(
 
            <TouchableOpacity
                onPress={this.getListViewItem.bind(this, item) }
                activeOpacity={0.7}
                style={Styles.MainCard}>
                <View style={Styles.Left}>
                  <Text style={Styles.MediumBoldText}>
                    {'Order #'}
                    {i+1}
                  </Text>
                  <Text
                    style={[
                      Styles.SmallText,
                      {color: '#8E0438'},
                      item.status=== 'In Kitchen' ? {color: '#8E0438'} : null,
                    ]}>
                    {item.status}
                  </Text>
                </View>
                <View style={Styles.Middle}>
                  <Text style={[Styles.MediumBoldText, {color: 'black'}]}>
                    {item.assighnedto}
                  </Text>
                  <Text style={[Styles.SmallText, {color: '#8E0438'}]}>    {moment(item.createdAt).startOf('hour').fromNow()}</Text>
                </View>
                <View style={Styles.Right}>
                  <Icon
                    name='ios-arrow-forward'
                    style = {{color:'black'}}
                  />
                </View>
              </TouchableOpacity>

)}
        </Content>
    
    )
  })
}

</ScrollView>
       
            </Container>
        )}
    }
}
const Styles = StyleSheet.create({
    contentContainerStyle: {
      paddingVertical: 20,
      width: '100%',
      alignSelf: 'center',
    },
    Seprator: {
      marginBottom: 10,
    },
    MainCard: {
      width: '90%',
      backgroundColor: 'white',
      alignSelf: 'center',
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
  
    SmallText: {
      color: '#8E0438',
      fontSize: 16,
    },
    MediumBoldText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    Left: {
      width: '50%',
      // backgroundColor: 'green',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    Middle: {
      width: '35%',
      // backgroundColor: 'red',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    Right: {
      width: '10%',
      // backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });