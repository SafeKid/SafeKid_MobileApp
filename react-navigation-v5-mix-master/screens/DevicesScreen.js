
import React, {useState, useEffect, Component}from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground, StatusBar, ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';
import {Button, Card, Title, Paragraph} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'


var dataList=[];
class DevicesScreen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    animating:true
    
  });
}
    
closeActivityIndicator=()=>{
  setTimeout(()=>this.setState({animating:false}),200)
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
          phoneNo:child.val().phoneNo,
          lat:child.val().lat,
          long:child.val().long,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
     this.closeActivityIndicator()
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to remove this device??',
    'You will not be able to track using this device anymore',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Devices').child(val).remove()},
    ]
  );
  
}

render(){

    const animating=this.state.animating
    return (
     
      <ImageBackground source={require('../assets/children.jpg')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle="light-content"/>
        <View style={{backgroundColor:'#1C1C1C', height:50, marginBottom:10}}>
          <Text style={styles.Header_text}>Your Devices</Text>
        </View>
       
        <View style={{margin:10}}> 
         <ActivityIndicator
         animating={animating}
         color="#bc2b78"
         size="large"
         style={styles.indicator}
        />
        </View>
      <ScrollView>
      
      
        {this.state.dataList.map((item, key) => ((item.user==firebase.auth().currentUser.email)?
         
          // <View key={key} style={{backgroundColor:'#E6E6E6', margin:10, borderColor:'black', borderWidth:2, borderRadius:20}}>
            
          //   <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.sno}</Text>
          //   <Text style={styles.text}>{item.cname}</Text>
          //   <View style={{flexDirection:'row'}}>
              
          //       <TouchableOpacity
          //       onPress={()=>{this.DeleteMessage(item._key)}}
          //          style={[styles.signIn, {
          //               borderColor: '#3B0B0B',
          //               borderWidth: 2,
          //               marginBottom:2,
          //               marginRight:150,
          //               marginLeft:10,
          //               backgroundColor:'#FF0000',
          //               width:70
                       
          //           }]}
          //       >
          //           <Text style={[styles.textSign, {
          //               color: 'white',
          //               fontSize:13
          //           }]}>Remove</Text>
          //       </TouchableOpacity>
          //       <TouchableOpacity
          //       onPress={()=>{this.props.navigation.navigate('TrackScreen',{lat:item.lat, long:item.long})}}
          //          style={[styles.signIn, {
          //               borderColor: '#0B6138',
          //               borderWidth: 2,
          //               marginBottom:2,
          //               backgroundColor:'#04B431',
          //               width:100
                       
          //           }]}
          //       >
          //           <Text style={[styles.textSign, {
          //               color: 'white',
          //               fontSize:15
          //           }]}>Track</Text>
          //       </TouchableOpacity>
          //    </View>
          //   {/* <View style={styles.separator} /> */}
          // </View>
          <Card key={key} style={styles.item}>
            
          {/* <Card.Title title="Card Title"  left={LeftContent} />
          <Card.Title title="Card Title"  left={LeftContent1} />
           */}
          <Card.Content>
            <View style={{flexDirection:'column'}}>
               <View style={{flexDirection:'row'}}> 
                <Title> {item.sno}</Title>
                <Icon name="md-watch" size={50} style={{marginLeft:100}}/> 
               </View> 
            <Title style={{marginBottom:10}}> {item.cname}</Title>
            </View>
           <Paragraph style={styles.text3}>   Age: {item.age}</Paragraph>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          <Card.Actions>
          <Button icon="delete" color="red" mode="contained" style={{marginRight:90}} onPress={()=>{this.DeleteMessage(item._key)}}>
              Remove
           </Button>
           <Button icon="map-marker" color="blue" mode="contained" onPress={()=>{this.props.navigation.navigate('TrackScreen',{lat:item.lat, long:item.long})}}>
             Track
           </Button>
          </Card.Actions>
        </Card>
          :null ))}
        
      </ScrollView>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.navigate('AddDevicesScreen')}
                >
                <LinearGradient
                    colors={['#1C1C1C', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add New Device</Text>
                </LinearGradient>
                </TouchableOpacity>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.goBack()}
                >
                <LinearGradient
                    colors={['#1C1C1C', '#000000']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
               
    </View>
    </ImageBackground>

    );
        }
};


export default DevicesScreen;

const styles = StyleSheet.create({
  Header_text:{
    textAlign:"center",
    color:"#FBF5EF",
    fontWeight:"bold",
    fontSize:25,
    marginTop:5
  },
  item: {
    borderColor:'black',
    borderWidth:2,
    marginHorizontal:30,
    marginVertical:10

  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 10,
    paddingRight:10,
    textAlign:"center",
    fontStyle:"italic"
  },
  button: {
    alignItems: 'center',
    marginTop: 50
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
indicator:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  height:50
}
});