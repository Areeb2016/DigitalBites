
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid
} from 'react-native';
import { Container, Toast } from 'native-base';


const SignupScreen = (props) => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [mobileno,setMobileno]=useState('')
  const [address,setAddress]=useState('')
  const [cpassword, setCpassword]=useState('')

  const sendCred= async (props)=>{
    if(password == cpassword){
     fetch('https://digitalbites.herokuapp.com/signup',{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "name":name,
        "email":email,
        "password":password,
        "address":address,
        "phone":mobileno,
        "role":"Customer"
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              ToastAndroid.show(
                "Signup Successful!",
                ToastAndroid.SHORT
              )
              props.navigation.replace("Loginscreen")
            } catch (e) {
              console.log("error hai",e)
              ToastAndroid.show(
                "Signup Failed!",
                ToastAndroid.SHORT
              )
            }
     })
    }
    else{
      alert("Password Mismatch")
    }
  }

  _comparePass = () => {
    const{password, cpassword} = this.state;
    Alert(password, cpassword)
  }

  return (
    <Container style={{backgroundColor:''}}> 
   <KeyboardAvoidingView behavior="position">
     <StatusBar backgroundColor="#8E0438" barStyle="light-content" />
      <Text 
      style={{fontSize:15,marginLeft:18,marginTop:10}}></Text>
      <Text 
      style={{fontSize:40, textAlign:'center', color:"#8E0438"}}
      >DIGITAL BITES</Text>
      <View
      style={{
        borderBottomColor:"#8E0438",
        borderBottomWidth:4,
        borderRadius:10,
        marginLeft:20,
        marginRight:20,
        marginTop:4
      }}
       />
      <Text
      style={{
        fontSize:25,marginLeft:18,marginTop:15
      }}
      >Create New Account</Text>
      <TextInput
        label='Name'
        mode="outlined"
        placeholder='John Doe'
        value={name}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}
        onChangeText={(text)=>setName(text)}
      />
      <TextInput
        label='Email'
        mode="outlined"
        autoCompleteType='email'
        placeholder='johndoe@example.com'
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}
        onChangeText={(text)=>setEmail(text)}
      />
      <TextInput
        label='Mobile Number'
        mode="outlined"
        placeholder='0333-2432742'
        value={mobileno}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}
        onChangeText={(text)=>setMobileno(text)}
      />
      <TextInput
        label='Address'
        mode="outlined"
        placeholder='Street 23, sun drive avenue '
        value={address}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}
        onChangeText={(text)=>setAddress(text)}
      />
      <TextInput
        label='Password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}  
      />
      <TextInput
        label='Confirm Password'
        mode="outlined"
        secureTextEntry={true}
        value={cpassword}
        onChangeText={(text)=>{setCpassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:12}}
        theme={{colors:{primary:"#8E0438"}}}  
      />
      <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#8E0438'}}
       onPress={() => sendCred(props)}>
        signup
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:16,marginLeft:18,marginTop:15, color:'#8E0438', fontStyle:'italic'
      }}
      onPress={()=>props.navigation.replace("Loginscreen")}
      >already have a account ?</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
   </Container>
  );
};

export default SignupScreen;
