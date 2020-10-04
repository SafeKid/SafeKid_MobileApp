import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import firebase from '@react-native-firebase/app';

class NotificationScreen extends React.Component{

  constructor(props){
    super(props)

    this.state=({dataList:[]})

  }

   componentDidMount(){
    firebase.database().ref('/Confirmations').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          user:child.val().user,
          pname:child.val().pname,
          cname:child.val().cname,
          sno:child.val().sno,
          phoneNo:child.val().phoneNo,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
    });

   }
   render(){

    return (
      
      <ImageBackground source={require('../assets/child2.jpg')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
        {this.state.dataList.reverse().map((item, key) => ((item.user==firebase.auth().currentUser.email)?
        <View style={styles.textcard}>
        <Text style={{textAlign:'center', fontSize:15, fontStyle:"italic" }}>Pending your Device Confirmation ...</Text>
        <View style={styles.device}>
        <Text style={{textAlign:'center', fontStyle:"italic", fontWeight:"bold", color:'#FBF8EF'}}>{item.sno}</Text>
        <Text style={{textAlign:'center', fontStyle:"italic", fontWeight:"bold", color:'#FBF8EF'}}>{item.cname}</Text>
        </View>
        </View>:null
        ))}
      </View>
      </ImageBackground>
    );
        }
  };

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex:1, 
  },
  textcard:{
    backgroundColor:'#E0E0F8',
    margin:10,
    borderWidth:2,
    borderRadius:15
  },
  device:{
    borderColor:'#071914',
    borderWidth:2,
    margin:10,
    marginHorizontal:50,
    borderRadius:20,
    backgroundColor:'#088A68'

  }
  
});
