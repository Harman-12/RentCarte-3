import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import AppHeader from '../components/AppHeader'

import * as firebase from 'firebase'
import 'firebase/firestore';
import db from '../config';

import {Icon, Input, Button, ListItem, PricingCard} from 'react-native-elements';

export default class ListingsScreen extends Component{

    constructor(){
        super()
        this.state = {
          allRequests : []
        }
      this.requestRef = null
      }

    getAllRequests =()=>{
        this.requestRef = db.collection('rent_requests')
        .onSnapshot((snapshot)=>{
        var allRequests = []
        snapshot.forEach((doc) => {
            allRequests.push(doc.data())
        })
        this.setState({allRequests:allRequests})
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
        <ListItem
            key={i}
            contentContainerStyle={{backgroundColor: '#faf4f0'}}
            containerStyle={{backgroundColor: '#faf4f0'}}
            leftElement={
            <Image 
                style={{width:120, height:120, borderRadius: 10, marginRight: -13, marginLeft: -5}}
                source={{
                    uri: item.homeImage,
                }}
            />
            }
            
            rightElement={
                <PricingCard
                containerStyle={{width:200, marginLeft:-5, height: 150, marginTop: -5, marginBottom: -5}}
                pricingStyle={{fontSize:17}}
                titleStyle={{fontSize: 20, marginTop: -13, marginBottom: -7 }}
                infoStyle={{marginBottom: -5, marginTop: 1}}
                    color="#9a8c98"
                    title="Rent"
                    price={'₹' + item.rent_range}
                    info={['Place:' + " "+ item.city, 'Status:' +" "+ item.rent_status]}
                    button={{ title: 'VIEW', buttonStyle: styles.ViewButton }}
                    

                />
            }
            bottomDivider
        />
        )
    }

  componentDidMount(){
    this.getAllRequests()
  }

  componentWillUnmount(){
    this.requestRef();
  }
  
    render(){
        return(
                <View style={{backgroundColor: '#f2e9e4', flex:1}}>
                  <AppHeader/>
                  <View>
                    {
                      this.state.allRequests.length === 0
                      ?(
                        <View style={{flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'}}>
                          <Text style={{ fontSize: 20, color: '#4a4e69', marginTop: 600, alignSelf: 'center'}}>List of all Places on Rent</Text>
                        </View>
                      )
                      :(
                        <FlatList
                          keyExtractor={this.keyExtractor}
                          data={this.state.allRequests}
                          renderItem={this.renderItem}
                        />
                      )
                    }
                  </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"blue",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    },
    ViewButton:{
        width: 80, height:30,
        alignSelf:"center"
    }
  })