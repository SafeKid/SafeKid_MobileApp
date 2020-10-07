import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Alert,ImageBackground, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome'

var dataList=[];
class QA_Screen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    animating:true
  });
}
     
closeActivityIndicator=()=>{
    setTimeout(()=>this.setState({animating:false}),100)
  }
  
componentDidMount(){
    firebase.database().ref('/Reviews').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          date:child.val().date,
          user:child.val().user,
          name:child.val().name,
          title:child.val().title,
          time:child.val().time,
          respond:child.val().respond,
          description:child.val().description,
          ndate:child.val().ndate,
          ntime:child.val().ntime,
        //  respond:child.val().respond,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
     this.closeActivityIndicator()
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to delete?',
    '',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Reviews').child(val).remove()},
    ]
  );
  
}

render(){

    const animating=this.state.animating
    return (
    
      <ImageBackground source={require('../assets/children.jpg')} style={{width:'100%', height:'100%'}}>
       <View style={{margin:10}}> 
         <ActivityIndicator
         animating={animating}
         color="#bc2b78"
         size="large"
         style={styles.indicator}
        />
        </View>
      <View style={styles.container}>
      <ScrollView>
        {/*Loop of JS which is like foreach loop*/}
        {this.state.dataList.reverse().map((item, key) => (
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={{backgroundColor:'#E0F2F7', borderColor:'black', borderWidth:2,marginHorizontal:30, marginVertical:10}}>
            <View style={{flexDirection:'row'}}>
            <Text>{item.date}</Text>
            <Text style={{marginLeft:240}}>{item.time}</Text>
             </View>
         <Icon name="user-circle" style={{marginLeft:10}} size={25}/>    
        <Text style={{fontStyle:"italic"}}><Text style={{fontWeight:"bold"}}>  {item.name}</Text> ({item.user})</Text>
           <Text style={{fontWeight:"bold", fontSize:20, textAlign:'center', marginTop:20}}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            {((item.respond!='')?
            <View style={{backgroundColor:'#31B404',marginHorizontal:50, borderRadius:20, marginVertical:10, paddingVertical:20}}>
                <Text style={{fontStyle:'italic', fontWeight:'bold', textAlign:'center'}}>  Reply from Admin:-</Text>
                <Text style={styles.text}>  {item.respond}</Text>
            </View>    

            :null)}
            
            {((item.user==firebase.auth().currentUser.email)?
                <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:280,
                        backgroundColor:'#DF0101',
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity>
                :null)}
            <View style={styles.separator} />
          </View>
        ))}
       
      </ScrollView>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:120, marginHorizontal:30}}
                    onPress={() =>this.props.navigation.navigate('AddReviewScreen')}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add New</Text>
                </LinearGradient>
                </TouchableOpacity>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:120, marginHorizontal:30}}
                    onPress={() =>this.props.navigation.goBack()}
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
    </ImageBackground>

    );
        }
};


export default QA_Screen;

const styles = StyleSheet.create({
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
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
    paddingRight:10,
    textAlign:"center",
    
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