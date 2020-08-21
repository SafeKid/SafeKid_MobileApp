import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
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
          city:child.key,
          village:child.key,
          date:child.key,
          description:child.key
          
        });
      });
      
     this.setState({dataList:dataList})
    });

}
render(){

    return (
      // <View style={styles.container}>
      //   <Text>Previuos Cases</Text>
      //   <Button
      //     title="Click Here"
      //     onPress={() => alert('Button Clicked!')}
      //   />
      // </View>

      <View style={styles.container}>
      <ScrollView>
        {/*Loop of JS which is like foreach loop*/}
        {this.state.dataList.map((item, key) => (
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={styles.item}>
            <Text style={styles.text}>{item.city.toString()} | {item.village.toString()} | {item.date.toString()} | {item.description.toString()}</Text>
            <View style={styles.separator} />
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
});