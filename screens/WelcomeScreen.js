import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, ImageBackground, TextInput, SafeAreaView} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import * as firebase from 'firebase'
import 'firebase/firestore';
import db from '../config';
import { StatusBar } from 'expo-status-bar';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      username : '',
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      mobileNumber:"",
      address : "",
      confirmPassword : "",
      city: "",
      country: "",
      pincode: ""
    }
  }

  userLogin = (username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(()=>{
        this.props.navigation.navigate('BottomTab')
    })
    .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
  }

  userSignUp = (username, password, confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("Password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((response)=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          mobile_number:this.state.mobileNumber,
          username:this.state.username,
          address:this.state.address,
          city:this.state.city,
          country:this.state.country,
          pincode:this.state.pincode
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>{
    return(
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      visible={this.state.isVisible}
      presentationStyle="overFullScreen"
      >
      <View style={{backgroundColor: '#ffffff'}}>
        <ScrollView style={{width:'100%'}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(20),fontWeight:"bold",color:"#4a4e69", marginBottom:20, marginTop:20}}> SIGN UP </Text>
          </View>
          <View style={{flex:0.95}}>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"City"}
            
            onChangeText={(text)=>{
              this.setState({
                city: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Pincode"}
            
            onChangeText={(text)=>{
              this.setState({
                pincode: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Country"}
            
            onChangeText={(text)=>{
              this.setState({
                country: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confirm Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          
        </View>
        <View style={{flex:0.2,alignItems:'center', marginTop:20, marginBottom: 30}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{  fontSize : RFValue(20),
                fontWeight:'bold',
                color: "#4a4e69",
                marginTop:RFValue(10)
                }}>
                  Cancel
                </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
    </Modal>
    )
              }


  render(){
    return(
      
      <SafeAreaView>
        
          <ImageBackground source={require('../assets/loginbg.png')} style={styles.container}>
        
          {
            this.showModal()
          }

        
        <KeyboardAvoidingView style={styles.buttonContainer}>
          <Text style={{color:'#f2e9e4', fontSize:18, fontWeight:'bold',marginLeft:55}}>USERNAME</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
            style={styles.loginBox}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
            />
          </View>
          <Text style={{color:'#f2e9e4', fontSize:18, fontWeight:'bold',marginLeft:55}}>PASSWORD</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
              >
              <Text style={{color:'#22223b', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:'#22223b', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        </SafeAreaView>
        
    )
  }
}


const styles = StyleSheet.create({
  container:{
    resizeMode: "cover",
    height: "100%"
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:60,
    fontWeight:'300',
    // fontFamily:'AvenirNext-Heavy',
    color : '#32867d'
  },
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor:'#f2e9e4',
    fontSize: 20,
    marginBottom:20,
    marginTop:5

  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    elevation:10
  },
  buttonContainer:{
    flex:1,
    marginTop: 340
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth:1,
      borderRadius:2,
      borderColor:"#9a8c98",
      paddingBottom:RFValue(10),
      marginLeft:RFValue(20),
      marginBottom:RFValue(14),
      borderRadius: 50
  },
  registerButton: {
    width: "85%",
    height: RFValue(50),
    marginTop:RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#4a4e69",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
})