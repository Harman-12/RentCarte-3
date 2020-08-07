//Importing components from libraries
import React, { Component }  from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';

import ListingsScreen from '../screens/ListingsScreen'
import RentScreen from '../screens/RentScreen'

//Displaying the bootom tab navigator
export const AppTabNavigator = createMaterialBottomTabNavigator({

    Rent : {
        screen: ListingsScreen,
        navigationOptions :{
        tabBarIcon : ({ tintColor, focused }) => <Icon name="home" type="font-awesome" size={24} color={tintColor} focused={true}/>,
        tabBarColor: "#4a4e69",
        tabBarLabel : <Text style={{ fontSize: 12, textAlignVertical:"bottom", textAlign: 'center'}}>Rent</Text>
        }
    },
    List : {
        screen: RentScreen,
        navigationOptions :{
        tabBarIcon: ({ tintColor, focused }) => <Icon type="font-awesome-5" name="wpforms" size={24} color={tintColor} focused={true}/>,
        tabBarColor: '#9a8c98',
        tabBarLabel : <Text style={{ fontSize: 12, textAlignVertical:"bottom", textAlign: 'center'}}>Form</Text>,
        }
    }
    
},
{
    shifting: true,
    activeColor: '#fff',
    inactiveColor: '#fff',
    initialRouteName: 'Rent',
    
}
);