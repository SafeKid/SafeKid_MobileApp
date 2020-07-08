import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ImageBackground,Image} from 'react-native';
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" } backgroundColor="#1C1C1C"/>
        <ImageBackground source={require('../assets/child.jpg')} style={{width:'100%', height:'100%'}}>
          <Image source={require('../assets/logo-Transparent.png')} style={{width:150, height:135, marginLeft:110}}></Image>
        <Text style={{color: colors.text, fontSize:30, fontWeight:"bold", textAlign:"center"}}>Home Screen</Text>
      <Button
        title="Show my Devices"
        onPress={() => navigation.navigate("BookmarkScreen")}
      />
      </ImageBackground>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
     backgroundColor:'#F1F8E0'
  },
});
