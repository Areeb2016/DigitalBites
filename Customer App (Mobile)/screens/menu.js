import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem } from 'native-base';
// import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button ,Icon} from 'native-base';
import { Text, ScrollView ,FlatList,AsyncStorage, YellowBox, StatusBar, Image, TouchableOpacity, View, Modal, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchBar, Icon } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

export default class ListThumbnailExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      isLoading: true, 
      search: '',
      show: false,
      dataSource: [],
      refreshing: false
    };
    this.arrayholder = [];
  } 
componentDidMount(){
          this.getData()
        }

        getData = async()=>{
          const token = await AsyncStorage.getItem("token")  
          const res = await AsyncStorage.getItem("restaurant")
          const response = await fetch('https://digitalbites.herokuapp.com/restaurant/'+res ,{
            headers:new Headers({
              Authorization:"Bearer "+token
            })
            }
            ).then((response) => response.json())
        .then((responseJson) => {
          
          this.setState({
            data:responseJson.Menu,
            isLoading: false,
            dataSource: responseJson.Menu
          },
          function() {
            this.arrayholder = responseJson.Menu;
          }
          
          
        )
        })}

  getListViewItem = async(item) => {
    const foodid=   await AsyncStorage.setItem('food',item.food._id)
        this.props.navigation.replace("Products")
   } 

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {

    const newData = this.arrayholder.filter(function(item) {
    
      const itemData = item.food.name ? item.food.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      
      dataSource: newData,
      search: text,
    });
  }

  priceFilter(){
   var n = this.state.dataSource.sort((a, b) => (a.food.price > b.food.price) ? 1 : -1)
    this.setState({
      dataSource: n, 
      show:false,
      refreshing:true
    })
  }

  servingFilter(){
    var n = this.state.dataSource.sort((a, b) => (a.food.Serving > b.food.Serving) ? 1 : -1)
    this.setState({
      dataSource: n, 
      show:false,
      refreshing:true
    })
  }

  orderTimeFilter(){
    var n = this.state.dataSource.sort((a, b) => (a.food.Duration > b.food.Duration) ? 1 : -1)
    this.setState({
      dataSource: n, 
      show:false,
      refreshing:true
    })
  }

  categoryFilter(){
    var n = this.state.dataSource.sort((a, b) => (a.food.category > b.food.category) ? 1 : -1)
    this.setState({
      dataSource: n, 
      show:false,
      refreshing:true
    })
  }

  nameFilter(){
    var n = this.state.dataSource.sort((a, b) => (a.food.name > b.food.name) ? 1 : -1)
    this.setState({
      dataSource: n, 
      show:false,
      refreshing:true
    })
  }

  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
        <Left>
              <Icon name='arrow-back' color='white' onPress={()=>this.props.navigation.replace("Restaurantdetailscreen")}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, color:'white'}}>Menu</Text>
          </Body>
          <Right>
              <Ionicons name='ios-cart' color='white' size={28} onPress={()=>this.props.navigation.replace("Cart")}/>
          </Right>
        </Header>
        <Content>
        <Modal animationType='fade' transparent={true} visible={this.state.show}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View style={{ backgroundColor: 'white', width:'70%', height:'62%', flexDirection:'row'}}>
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
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:13, marginTop:5}}>Name</Text>
                            </TouchableOpacity>
                            </ListItem>
                            <ListItem>
                            <TouchableOpacity onPress={() => this.priceFilter()} activeOpacity={0.3} style={{flexDirection:'row', marginLeft:5}}>
                            <FontAwesome name='dollar' size={27} color='#8E0438' style={{marginTop:2, marginLeft:2}}/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:20, marginTop:5}}>Price</Text>
                            </TouchableOpacity>
                            </ListItem>
                            <ListItem>
                            <TouchableOpacity onPress={() => this.categoryFilter()} activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MCIcon name='food' size={30} color='#8E0438'/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:13, marginTop:5}}>Category</Text>
                            </TouchableOpacity>
                            </ListItem>
                            <ListItem>
                            <TouchableOpacity onPress={() => this.orderTimeFilter()} activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <Icon name='timer' size={30} color='#8E0438'/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:13, marginTop:5}}>Order Time</Text>
                            </TouchableOpacity>
                            </ListItem>
                            <ListItem>
                            <TouchableOpacity onPress={() => this.servingFilter()} activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MIcon name='people' size={35} color='#8E0438' style={{marginLeft:1}}/>
                            <Text style={{fontSize:16, fontWeight:'bold', marginLeft:7, marginTop:6}}>Serving</Text>
                            </TouchableOpacity>
                            </ListItem>
                            {/* <ListItem>
                            <TouchableOpacity activeOpacity={0.3} style={{flexDirection:'row'}}>
                            <MIcon name='star' size={30} color='#8E0438' style={{marginLeft:1}}/>
                              <Text style={{fontSize:16, fontWeight:'bold', marginLeft:13, marginTop:5}}>Ratings</Text>
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
          containerStyle={{backgroundColor:'white', borderColor:'white', borderBottomColor:'white', borderTopColor:'white'}}
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search Cuisine"
          value={this.state.search}
          inputContainerStyle={{backgroundColor:'white'}}
        />
         <TouchableOpacity onPress={() => this.setState({show:true})} activeOpacity={0.3} style={{marginTop:-38, alignSelf:'flex-end', marginRight: 10}}>
        <Entypo name='dots-three-vertical' size={20} />
        </TouchableOpacity>
        </View>
            <FlatList style={{marginTop:5}} refreshing={this.state.refreshing}
     data = {this.state.dataSource}
     renderItem = {({item}) =>
     <TouchableOpacity onPress={this.getListViewItem.bind(this, item)} activeOpacity={0.9}>
       <View style ={{marginLeft:10, marginRight:10, marginVertical:10, borderColor:'lightgrey', borderWidth:1, shadowOpacity:0.3, shadowColor:'grey', flexDirection:'row', paddingTop:10, paddingBottom:10}}>
         
         <Image source={{uri: item.food.image}} style={{height:120, width:200, resizeMode:'contain', marginLeft:5, marginRight:5}}/>
         <View style={{flexDirection:'column', marginTop:-1}}>
         <Text style={{paddingTop:2, fontSize:18, fontWeight:'bold' }}>{item.food.name}</Text>
         <Text style={{paddingTop:2, fontSize:18, fontWeight:'bold' }}>PKR {item.food.price}</Text>
         <Text style={{paddingTop:2, fontSize:16, fontWeight:'normal' }}>{item.food.category}</Text>
         <Text style={{paddingTop:2, fontSize:14, fontWeight:'normal', fontStyle:'italic' }}>{item.food.Serving} serving</Text>
         <Text style={{paddingTop:2, fontSize:14, fontWeight:'normal', fontStyle:'italic' }}>prepared in {item.food.Duration}</Text>
         </View>
         
       </View>
           
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
      />
           
           
      
        </Content>
      </Container>
    
    );
  }
}