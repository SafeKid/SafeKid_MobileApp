import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet,StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps'
import firebase from '@react-native-firebase/app'
import react from 'react';

class LocationScreen extends React.Component{

  constructor(props){
    super(props)

    this.state=({dataList:[]})

  }


componentDidMount(){
    firebase.database().ref('/Devices').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          user:child.val().user,
          pname:child.val().pname,
          cname:child.val().cname,
          sno:child.val().sno,
          age:child.val().age,
          lat:child.val().lat,
          long:child.val().long,
          _key:child.key
        });
      });
      
      this.setState({dataList:dataList})
  })
}

render(){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 6.910857,
         longitude: 79.945024,
         latitudeDelta: 2.015,
         longitudeDelta: 2.0121,
       }}
     >
       {this.state.dataList.reverse().map((item, key) => (((item.user==firebase.auth().currentUser.email)&&(item.lat||item.long!=''))?
       <Marker key={key}
       coordinate={{
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.long),
       }}
       title={""+item.sno}
       description={item.cname}
       />:null))}
        {/* <Marker
       coordinate={{
        latitude: 7.286575,
        longitude: 80.626975,
       }}
       title="My Home"
       description="This is my first location"
       /> */}
    </MapView>
   </View>
    );
};
}

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
 
