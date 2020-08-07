//Importing components from libraries
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class AppHeader extends Component {

    //Displaying header component in render
    render(){
        return(
          
                <Header 
                    backgroundImage={require("../assets/headerbg.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90 }}
                    leftComponent={<Icon name="bars" type="font-awesome" size={29} color="white" />}
                    placement="center"
                    backgroundColor = {'#4a4e69'}
                    rightComponent={<Image
                        style={styles.tinyLogo}
                        source={require('../assets/rent-logo.png')}
                    />}
                
                />
      
        );
    }
}

//Using Stylesheet to create different styles
const styles = StyleSheet.create({
    tinyLogo: {
      width: 45,
      height: 45,
    }
});