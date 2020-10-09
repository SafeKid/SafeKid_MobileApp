import React, {useState, useEffect, Component}from 'react';
import { View, Text,  StyleSheet, ScrollView, StatusBar,ActivityIndicator,ImageBackground } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/Ionicons'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="calendar" />
// const LeftContent1 = props => <Avatar.Icon {...props} icon="location" />

var dataList=[];
class NewsScreen extends Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    animating:true
  });
}

closeActivityIndicator=()=>{
  setTimeout(()=>this.setState({animating:false}),500)
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
     
    this.closeActivityIndicator()
    });
   

}
render(){

    const animating=this.state.animating
    return (
      <ImageBackground source={require('../assets/blood.jpg')} style={{width:'100%', height:'100%'}}>
      <View style={{margin:15}}>
        <ActivityIndicator
         animating={animating}
         color="#bc2b78"
         size="large"
         style={styles.indicator}
        /> 
      </View>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
      <ScrollView>
        {this.state.dataList.reverse().map((item, key) => (
          // <View key={key} style={styles.item}>
          //   <View style={{flexDirection:"row"}}>
          //   <Text style={styles.text1}><Icon name="ios-calendar" size={26} /> {item.date}</Text>
          //   <Text style={styles.text2}><Icon name="ios-pin" size={26} /> {item.location}</Text>
          //   </View>
          //   <Text style={styles.text3}>{item.case}</Text>
          // </View>
          <Card key={key} style={styles.item}>
            
          {/* <Card.Title title="Card Title"  left={LeftContent} />
          <Card.Title title="Card Title"  left={LeftContent1} />
           */}
          <Card.Content>
            <View style={{flexDirection:'column'}}>
            
            <Title><Icon name="ios-calendar" size={26} />  {item.date}</Title>
            
            <Title style={{marginBottom:10}}><Icon name="ios-pin" size={26} />  {item.location}</Title>
            </View>
           <Paragraph style={styles.text3}>{item.case}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
        </Card>
        ))}
      </ScrollView>
     
   
    </ImageBackground>

    );
        }
};


export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text1: {
    fontSize: 16,
    paddingHorizontal:10,
    paddingBottom:10,
    //paddingTop:10,
    fontWeight:"bold",
    marginRight:110
    
  },
  text2: {
    fontSize: 16,
    paddingHorizontal:10,
    paddingBottom:10,
    //paddingTop:10,
    fontWeight:"bold",
    textAlign:"right",
    
  },
  text3: {
    fontSize: 18,
    paddingHorizontal:10,
    paddingBottom:10,
    fontWeight:"normal",
    marginHorizontal:20
  },
  item: {
    borderColor:'black',
    borderWidth:2,
    margin:10

  },
  indicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:70
  }
});