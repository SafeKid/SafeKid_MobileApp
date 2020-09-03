import React from 'react';
import { View, Text, Button, StyleSheet,StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps'

const LocationScreen = () => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 6.910857,
         longitude: 79.945024,
         latitudeDelta: 1.015,
         longitudeDelta: 1.0121,
       }}
     >
       <Marker
       coordinate={{
        latitude: 6.910857,
        longitude: 79.945024,
       }}
       title="My Home"
       description="This is my first location"
       />
        <Marker
       coordinate={{
        latitude: 7.286575,
        longitude: 80.626975,
       }}
       title="My Home"
       description="This is my first location"
       />
    </MapView>
   </View>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 510,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 
