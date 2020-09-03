import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, StyleSheet, ScrollView, StatusBar } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'


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
      <View style={styles.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
      <ScrollView>
        {this.state.dataList.map((item, key) => (
          <View key={key} style={styles.item}>
            <Text style={styles.text}>{item.date} | {item.case} | {item.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

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
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  item: {
    backgroundColor:'#F8E0E6',
    borderColor:'black',
    borderWidth:2,
    margin:10

  }
});