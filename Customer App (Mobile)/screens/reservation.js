import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Label, Picker, Body, Left, Right } from 'native-base';
import { 
  AsyncStorage,Text, StatusBar, View, ToastAndroid, StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button ,TextInput} from 'react-native-paper';
import TimePicker from 'react-native-simple-time-picker';
import AlertPro from "react-native-alert-pro";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
// import RNPickerSelect from 'react-native-picker-select';
import MarterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class FloatingLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date(),
                    selected: '',
                   name:'',
                   mobileno:'',
                    time: "" ,
                    email:''
                  };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
 
  saveData=async()=>{
    this.AlertPro.close()
    const token = await AsyncStorage.getItem("token")
    const res = await AsyncStorage.getItem("restaurant")
    const rname = await AsyncStorage.getItem("rname")
    const rowner = await AsyncStorage.getItem("rowner")
    // alert(res)
    const {chosenDate,selected,name,time,mobileno} = this.state;
  
    fetch("https://digitalbites.herokuapp.com/reservation/"+res,{
      method:"POST",
      headers: new Headers({
        Authorization:"Bearer "+token,
        'Content-Type': 'application/json'
      }),
     body:JSON.stringify({
       "chosenDate":chosenDate,
       "name": name,
       "selected":selected,
       "time":time,
       "mobileno":mobileno,
       "rname": rname,
       "rowner": rowner
     })
    })
    .then(res=>{
      res.json()
      this.AlertProt.open()
    }).catch(console.log("ERRoR"))
  }
  
  render() {
    return (
      <Container style={{backgroundColor:''}}>
        <Header style={{backgroundColor:'#8E0438'}}>
        <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
          <Left>
              <Icon color='white' name='arrow-back' onPress={()=>this.props.navigation.replace("Restaurantdetailscreen")}/>
          </Left>
          <Body>
            <Text style={{fontSize:20, fontFamily:'Arial', color:'white'}}>Reservation</Text>
            </Body>
            <Right></Right>
            </Header>
        <Content>
          <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 36, marginTop:20, color:'black'}}>BOOK NOW</Text>
          </View>
          
            
            <Input
              placeholder="abc@gmail.com"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              inputStyle={{marginLeft: 14}}
              inputContainerStyle={{borderBottomColor: '#8E0438', marginRight:40}}
              containerStyle={{marginVertical: 20, marginLeft:20, marginRight:20}}
              leftIcon={
                <MaterialCommunityIcons
                  name="email"
                  size={30}
                  color="#8E0438"
                />
              }
              leftIconContainerStyle={{marginLeft: 0}}
              onChangeText={email => this.setState({email})}
            />

                            <Input
                                
                                placeholder='Name'
                                autoCapitalize='words'
                                autoCompleteType='name'
                                autoCorrect={false}
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438', marginRight:40 }}
                                containerStyle={{marginVertical: 20, marginLeft:20, marginRight:20}}
                                leftIcon={ <Ionicons name='md-person' size={30} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                onChangeText={name => this.setState({name})}
                            />

                            <Input
                                placeholder='+92-3xx-xxxxxxx'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='tel'
                                keyboardType='number-pad'
                                inputStyle={{ marginLeft: 14 }}
                                inputContainerStyle={{ borderBottomColor: '#8E0438', marginRight:40 }}
                                containerStyle={{marginVertical: 20, marginLeft:20, marginRight:20}}
                                leftIcon={ <FontAwesome name='phone' size={30} color='#8E0438' /> }
                                leftIconContainerStyle={{ marginLeft: 0 }}
                                onChangeText={mobileno => this.setState({mobileno})}
                            />

      {/* <View style={{flexDirection:'row'}}>
      <MarterialIcon name='people' size={40} color='#8E0438' />
      <View style={{marginLeft:20}}>
    <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
        </View>
</View> */}
<View style={{flexDirection:'row', marginLeft:28, marginRight:28, borderBottomColor:'#8E0438', borderBottomWidth:1, marginVertical:20}}>
<MarterialIcon name='people' size={38} color='#8E0438' style={{paddingTop:8}} />
              <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select number of people"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select number of people" value="" color="lightgrey"/>
              <Picker.Item label="1 person" value="1" />
              <Picker.Item label="2 persons" value="2" />
              <Picker.Item label="3 persons" value="3" />
              <Picker.Item label="4 persons" value="4" />
              <Picker.Item label="5 persons" value="5" />
            </Picker>
    </View>

<View style={{flexDirection:'row', marginVertical:20}}>
<DatePicker
        style={{width: 200}}
        date={this.state.chosenDate}
        mode="date"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        minDate={this.state.chosenDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconComponent={<FontAwesome name='calendar' size={30} color='#8E0438' />}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 20,
            marginRight:5
          },
        }}
        onDateChange={(date) => {this.setState({chosenDate: date})}}
      />

<DatePicker
        style={{width: 180}}
        date={this.state.time}
        mode="time"
        placeholder="Select Time"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconComponent={<FontAwesome name='clock-o' size={30} color='#8E0438' />}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 20,
            marginRight: 5
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({time: date})}}
      />
    
</View>
            
          <Button
        mode="contained"
        style={{marginLeft:25,marginRight:25,marginTop:25, backgroundColor:'#8E0438'}}
        onPress={() => this.AlertPro.open()}>
        Reserve
      </Button>
          
          <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          title="Add To Cart"
          message="Are you sure to add this item to your Cart?"
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
          onCancel={() => {
            this.AlertProt.close();
            this.props.navigation.replace("Restaurantdetailscreen");
          }}
          title="Table Reserved"
          message="Your Table has been reserved successfully"
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: 8,
    color: 'red',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginLeft:20
  },
});