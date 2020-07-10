import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar, RefreshControl, ScrollView, PermissionsAndroid, Modal} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Left, Body, Right, List, ListItem } from 'native-base';
import { SearchBar, Icon } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

 export default class fetchimages extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              search: '',
              refreshing: false,
              latitude: 33,
              longitude: 73,
              show:false,
              dataSource: []
            }
            this.arrayholder = [];
          }
          // _onRefresh = () => {
          //   this.setState({refreshing: true});
          //   this.getData();
          // }        
        componentDidMount(){
          this.getLocal()
        }

        sort_by = (field, reverse, primer) => {

          const key = primer ?
            function(x) {
              return primer(x[field])
            } :
            function(x) {
              return x[field]
            };
        
          reverse = !reverse ? 1 : -1;
        
          return function(a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
          }
        }

        sorting(){
          this.state.data.sort(this.sort_by('estimatedDeliveryTime', true, parseInt))
        }

        getLocal = async() => {
          const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        
          if (granted) {
            console.log( "You can use the ACCESS_FINE_LOCATION" )
            // Geolocation.getCurrentPosition(info => alert(JSON.stringify(info)));
            Geolocation.getCurrentPosition(result => {
              this.setState({
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
              })
            })
            this.getData()
          } 
          else {
            console.log( "ACCESS_FINE_LOCATION permission denied" )
          }
        }

        getData = async()=>{
          const token = await AsyncStorage.getItem("token")
          // alert(token)
            const response = await fetch('https://digitalbites.herokuapp.com/restaurant/R',{
              headers:new Headers({
                Authorization:"Bearer "+token
              })
              });
            const data  = await response.json();
            this.setState({ 
              data:data,
              isLoading: false,
              dataSource: data,
              refreshing: false
            },
            function() {
              this.arrayholder = data;
            }
            )
          }  
          search = text => {
            console.log(text);
          };
          clear = () => {
            this.search.clear();
          };
          SearchFilterFunction(text) {
            const newData = this.arrayholder.filter(function(item) {
              const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            this.setState({
              dataSource: newData,
              search: text,
            });
          }
          getListViewItem = async(item) => {
         const res = await AsyncStorage.setItem('restaurant',item._id)
         const rname = await AsyncStorage.setItem('rname',item.name)
         const rowner = await AsyncStorage.setItem('rowner',item.createdBy)
            this.props.navigation.replace("Restaurantdetailscreen")
        } 

        _getDistance = (lat, lon) => {
          var dis = getDistance(
            { latitude: lat, longitude: lon },
            { latitude: this.state.latitude, longitude: this.state.longitude }
          );
          var dist = dis/1000;
          return dist
        };

        timeFilter(){
          var n = this.state.dataSource.sort((a, b) => (a.estimatedDeliveryTime > b.estimatedDeliveryTime) ? 1 : -1)
          this.setState({
            dataSource: n,
            show:false,
            refreshing: true,
          })
          // this.clearfunc()
        }

        nameFilter(){
          var n = this.state.dataSource.sort((a, b) => (a.name > b.name) ? 1 : -1)
          this.setState({
            dataSource: n,
            show:false,
            refreshing: true,
          })
        }

        clearfunc(){
          this.setState({
            refreshing: false,
          })
        }
         
     render(){
         return(
        //   <ScrollView
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={this.state.refreshing}
        //       onRefresh={this._onRefresh}
        //     />
        //   }
        // >
<Container style={{backgroundColor:''}}>
<Header style={{backgroundColor:'#8E0438'}}>
<StatusBar backgroundColor='#8E0438' barStyle="light-content" />
          <Left>
            <Icon color='white' name='menu' onPress={()=>this.props.navigation.toggleDrawer()}/>
          </Left>
          <Body><Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Home</Text></Body>
          <Right>
              <Ionicons name='ios-cart' color='white' size={28} onPress={()=>this.props.navigation.replace("Cart")}/>
          </Right>
        </Header>
<Content>
<Modal animationType='fade' transparent={true} visible={this.state.show}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', width:'70%', height:'37%', flexDirection:'row'}}>
                        <SafeAreaView style={{width:'100%', height:'100%'}}>
                          <List>
                            <ListItem itemDivider>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>FILTER</Text>
                            </ListItem>
                            <ListItem itemDivider>
                            <Text style={{fontSize:18, fontWeight:'bold'}}>Sort By</Text>
                            </ListItem>
                            <ListItem>
                            <TouchableOpacity onPress={() => this.nameFilter()} activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MCIcon name='sort-alphabetical' size={30} color='#8E0438'/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:5, marginTop:5}}>Name</Text>
                            </TouchableOpacity>
                            </ListItem>
                            {/* <ListItem>
                            <TouchableOpacity activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MIcon name='directions-car' size={30} color='#8E0438'/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:5, marginTop:5}}>Distance</Text>
                            </TouchableOpacity>
                            </ListItem> */}
                            <ListItem>
                            <TouchableOpacity onPress={() => this.timeFilter()} activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <Icon name='timer' size={30} color='#8E0438'/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:5, marginTop:5}}>Delivery Time</Text>
                            </TouchableOpacity>
                            </ListItem>
                            {/* <ListItem>
                            <TouchableOpacity activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MIcon name='star' size={30} color='#8E0438'/>
                              <Text style={{fontSize:16, fontWeight:'bold', marginLeft:5, marginTop:5}}>Ratings</Text>
                              </TouchableOpacity>
                              </ListItem> */}
                          </List>
                          <TouchableOpacity onPress={() => this.setState({show: false})} activeOpacity={0.3} style={{backgroundColor:'#8E0438', padding:10, marginLeft:20, marginRight:20, alignItems:'center', marginVertical:10}}>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:5, color:'white'}}>Close</Text>
                          </TouchableOpacity>
                          </SafeAreaView>
                          </View>
                          </View>
                          </Modal>
  <View>
    <SearchBar
          round
          containerStyle={{backgroundColor:'white', borderColor:'white', borderBottomColor:'white', borderTopColor:'white', marginRight:30}}
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search Restaurant"
          value={this.state.search}
          inputContainerStyle={{backgroundColor:'white'}}
        />
        <TouchableOpacity onPress={() => this.setState({show:true})} activeOpacity={0.3} style={{marginTop:-38, alignSelf:'flex-end', marginRight: 10}}>
        <Entypo name='dots-three-vertical' size={20} />
        </TouchableOpacity>
        </View>
        
    <FlatList refreshing={this.state.refreshing}
     data = {this.state.dataSource}
     renderItem = {({item, index}) =>
     <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} activeOpacity={0.9} style={{marginTop:18}}>
          <Card style={{borderColor:'lightgrey', marginLeft:10, marginRight:10}}>
            <CardItem style={{backgroundColor:''}}>
              <Left>
                <Thumbnail source={{uri:item.image}}/>
                <Body>
                  <Text style={{color:'', fontWeight:'bold'}}>{item.name}</Text>
         <Text style={{color:''}} note>{item.address}</Text>
                </Body>
              </Left>
            </CardItem> 
            <CardItem cardBody style={{backgroundColor:''}}>
              <Image source={{uri:item.image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{backgroundColor:''}}>
              <Left>
                
         <View style={{flexDirection:'row'}}>
         <MIcon name='directions-car' size={30} color='#8E0438'/>
         <Text style={{fontWeight:'bold',marginLeft:'2%', marginTop:'5%'}}> 
            {this._getDistance(JSON.parse(item.latitude), JSON.parse(item.longitude))} KM 
            </Text>
            <Text style={{marginLeft:'3%',marginTop:'5%'}}>away</Text>
            </View>
                
              </Left>
              <Right>
                <View style={{flexDirection:'row'}}>
                <Icon name='timer' size={30} color='#8E0438'/>
                <Text style={{fontWeight:'bold', marginLeft:'3%', marginTop:'5%'}}>{item.estimatedDeliveryTime} min</Text>
                </View>
              </Right>

            </CardItem>
          </Card> 
          </TouchableOpacity>
    }
    keyExtractor={(item, index) => index.toString()}
     
     />
</Content>

</Container>

         )
     }
 }
 

 const styles = StyleSheet.create({
          container: {
              flex: 1,
             backgroundColor: '#fff',
              alignItems: 'center',
               justifyContent: 'center',
            },
           });





