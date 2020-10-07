import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps'
import  LinearGradient from 'react-native-linear-gradient'
import firebase from '@react-native-firebase/app'

const TrackScreen=({route,navigation})=>{

    let data=route.params;
   
    return (
     <View>
     <View style={{backgroundColor:'#1C1C1C', height:50, marginBottom:10}}>
          <Text style={styles.Header_text}>Current Location</Text>
        </View>
      <View style={styles.container}>
      {((data.lat!='' && data.long!='')?
     <MapView
       provider={PROVIDER_GOOGLE} 
       style={styles.map}
       region={{
         latitude:parseFloat(data.lat),
         longitude: parseFloat(data.long),
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker
       coordinate={{
        latitude:parseFloat(data.lat),
        longitude: parseFloat(data.long),
       }}
       title="My Home"
       description="This is my first location"
       />
    </MapView>
        
    :
    Alert.alert("Failed to find the location", "may be an issue with the device connection"))}
    </View>
    <View>
    <TouchableOpacity
                    style={styles.signIn, {marginTop:500,width:200, marginLeft:80}}
                    onPress={() =>navigation.goBack()}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
        </View>       
   </View>
    );

};


export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 570,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop:50
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Header_text:{
    textAlign:"center",
    color:"#FBF5EF",
    fontWeight:"bold",
    fontSize:25,
    marginTop:5
  },
  signIn: {
    width: '25%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
    },
    textSign: {
    fontSize: 15,
    fontWeight: 'bold'
},
signIn1: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
 });
 
