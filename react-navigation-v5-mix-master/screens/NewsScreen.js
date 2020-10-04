import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, StyleSheet, ScrollView, StatusBar, ImageBackground } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/Ionicons'


var dataList=[];
class NewsScreen extends Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[]
  });
}
componentDidMount(){
    firebase.database().ref('/Previous_Cases').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          case:child.val().case1,
          location:child.val().location,
          date:child.val().date
        });
      });
      
     this.setState({dataList:dataList})
    });

}
render(){

    return (
      <ImageBackground source={require('../assets/blood.jpg')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
        
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
      <ScrollView>
        {this.state.dataList.reverse().map((item, key) => (
          <View key={key} style={styles.item}>
            <View style={{flexDirection:"row"}}>
            <Text style={styles.text1}><Icon name="ios-calendar" size={26} /> {item.date}</Text>
            <Text style={styles.text2}><Icon name="ios-pin" size={26} /> {item.location}</Text>
            </View>
            <Text style={styles.text3}>{item.case}</Text>
          </View>
        ))}
      </ScrollView>
     
    </View>
    </ImageBackground>

    );
        }
};


export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text1: {
    fontSize: 16,
    color: '#606070',
    paddingHorizontal:10,
    paddingBottom:10,
    paddingTop:10,
    fontWeight:"bold",
    marginRight:110
    
  },
  text2: {
    fontSize: 16,
    color: '#606070',
    paddingHorizontal:10,
    paddingBottom:10,
    paddingTop:10,
    fontWeight:"bold",
    textAlign:"right",
    
  },
  text3: {
    fontSize: 16,
    color: '#606070',
    paddingHorizontal:10,
    paddingBottom:10,
    fontWeight:"normal",
    fontStyle:"italic",
    textAlign:"center"
  },
  item: {
    backgroundColor:'#F8E0E6',
    borderColor:'black',
    borderWidth:2,
    margin:10

  }
});