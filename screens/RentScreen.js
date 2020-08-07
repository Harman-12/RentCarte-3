import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid, ImageBackground, ScrollView, Image } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';
import db from '../config';
import AppHeader from '../components/AppHeader'

import {Icon, Input, Button, Avatar} from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';

import * as Permissions from 'expo-permissions';


export default class RentScreen extends Component{

    constructor(){
        super()
        this.state = {
          userName : firebase.auth().currentUser.email,
          address : "",
          description : "",
          city:"",
          rentId:"",
          rentStatus:"",
          docId: "",
          pincode:"",
          state:"",
          area:"",
          rentRange: "",
          homeImage1: "",
          name: "",
        }
      }

      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }

      selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!cancelled) {
          this.uploadImage(uri, this.state.rentId);
        }
      };
    
      uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
        
        var ref = firebase
          .storage()
          .ref()
          .child("rent_homes/" + imageName);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };

      fetchImage = (imageName) => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("rent_homes/" + imageName);
    
        // Get the download URL
        storageRef
          .getDownloadURL()
          .then((url) => {
            this.setState({ homeImage1: url });
          })
          .catch((error) => {
            this.setState({ homeImage1: "https://document-export.canva.com/DAED7PTy8cc/16/thumbnail/0001-9233683638.png" });
          });
      };

      getUserProfile() {
        db.collection("users")
          .where("username", "==", this.state.userName)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                name: doc.data().first_name + " " + doc.data().last_name,
                docId: doc.id,
                homeImage1: doc.data().image,
              });
            });
          });
      }
    

      addPlace=(description)=>{
        var userName = this.state.userName
        this.setState({rentId: this.createUniqueId()})
        db.collection('rent_requests').add({
          'username' : userName,
          'address': this.state.address,
          'description' : description,
          'rentId'  : this.state.rentId,
          "rent_status" : "active",
          "rent_range"  : this.state.rentRange,
          "city": this.state.city,
          "pincode": this.state.pincode,
          "state": this.state.state,
          "area": this.state.area,
          "date"       : firebase.firestore.FieldValue.serverTimestamp(),
          "homeImage": this.state.homeImage1
         })
         .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
         this.setState({
            address : "",
            description : "",
            city:"",
            rentId:"",
            rentStatus:"",
            pincode:"",
            state:"",
            area:"",
            rentRange: "",
            homeImage1: 'https://document-export.canva.com/DAED7PTy8cc/16/thumbnail/0001-9233683638.png'
         })
    
         
         return Alert.alert(
              'Ready to display your place',
              '',
              [
                {text: 'OK', onPress: () => {
    
                }}
              ]
          );
      }

      componentDidMount() {
        this.fetchImage(this.state.rentId);
        this.getUserProfile();
      }

    render(){
        return(
            <ScrollView style={{backgroundColor: '#f2e9e4', flex:1}}>
                
                <AppHeader/>

                <Text style={{marginTop: 20, flex: 0.2, marginBottom: 15, color:'#4a4e69', fontSize: 30, alignSelf: 'center'}}>FORM</Text>
            
                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Address</Text>
                <Input 
                    placeholder="House no, Street, Locality"
                    numberOfLines={2}
                    multiline
                    leftIconContainerStyle={{marginRight:10}}
                    leftIcon={
                    <Icon
                        name='map-marker'
                        type="font-awesome"
                        size={24}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          address: text
                        })
                      }}
                    value={this.state.address}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>City</Text>
                <Input 
                    placeholder="eg. Jammu"
                    leftIconContainerStyle={{marginRight:2}}
                    leftIcon={
                    <Icon
                        name='city'
                        type="font-awesome-5"
                        size={20}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          city: text
                        })
                      }}
                    value={this.state.city}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>State</Text>
                <Input 
                    placeholder="eg. Punjab"
                    leftIconContainerStyle={{marginRight:10}}
                    leftIcon={
                    <Icon
                        name='map-marker'
                        type="font-awesome"
                        size={24}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          state: text
                        })
                      }}
                    value={this.state.state}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Pincode</Text>
                <Input 
                    placeholder="eg. 180011"
                    leftIconContainerStyle={{marginRight:10}}
                    leftIcon={
                    <Icon
                        name='map-pin'
                        type="font-awesome-5"
                        size={24}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          pincode: text
                        })
                      }}
                    value={this.state.pincode}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Description</Text>
                <Input 
                    placeholder="eg. bedrooms, kitchen, floors etc."
                    leftIconContainerStyle={{marginRight:4}}
                    multiline
                    numberOfLines={4}
                    leftIcon={
                    <Icon
                        name='couch'
                        type="font-awesome-5"
                        size={20}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          description: text
                        })
                      }}
                    value={this.state.description}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Area</Text>
                <Input 
                    placeholder="eg. 250 sq. feet, 10 marlas"
                    leftIconContainerStyle={{marginRight:6}}              
                    leftIcon={
                    <Icon
                        name='ruler-combined'
                        type="font-awesome-5"
                        size={20}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          area: text
                        })
                      }}
                    value={this.state.area}
                />

                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Rent range (monthly)</Text>
                <Input 
                    placeholder="eg. 10000 - 15000"
                    leftIconContainerStyle={{marginRight:8}}
                    leftIcon={
                    <Icon
                        name='rupee-sign'
                        type="font-awesome-5"
                        size={24}
                        color='#9a8c98'
                    />
                    }
                    onChangeText={(text)=>{
                        this.setState({
                          rentRange: text
                        })
                      }}
                    value={this.state.rentRange}
                />


                <Text style={{marginLeft:10, color: '#4a4e69', fontSize: 18}}>Select image of house</Text>
                <Avatar
                    
                    source={{
                        uri: this.state.homeImage1,
                    }}
                    size="xlarge"
                    onPress={() => this.selectPicture()}
                    containerStyle={{
                    marginTop: 20,
                    borderRadius: 40,
                    alignSelf: 'center',
                    width: 300, 
                    height:300,
                    borderRadius: 30,
                    marginBottom: 30
                    }}
                    avatarStyle={{borderRadius: 10}}
                    showEditButton
                />

                <Button
                    icon={
                        <Icon
                        type="font-awesome-5"
                        name="check-circle"
                        size={15}
                        color="white"
                        />
                    }
                    title="   SUBMIT"
                    raised
                    containerStyle={{width: 120, alignSelf: 'center', marginBottom: 30, backgroundColor: '#9a8c98'}}
                    buttonStyle={{backgroundColor: '#4a4e69'}}
                    onPress = {()=>{this.addPlace(this.state.description)}}
                />
                
               
            </ScrollView>
        )
    }
}