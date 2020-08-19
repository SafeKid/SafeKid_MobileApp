import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import LocationScreen from './LocationScreen';
import NewsScreen from './NewsScreen';


const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const NewsStack= createStackNavigator();
const LocationStack=createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{
          tabBarLabel: 'News Feed',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-paper" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationStackScreen}
        options={{
          tabBarLabel: 'Location',
          tabBarColor: '#1C1C1C',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-pin" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1C1C1C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Overview',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const NotificationsStackScreen = ({navigation}) => (
<NotificationsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1C1C1C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <NotificationsStack.Screen name="Notifications" component={NotificationScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</NotificationsStack.Navigator>
);

const NewsStackScreen = ({navigation}) => (
  <NewsStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1C1C1C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <NewsStack.Screen name="News Feed" component={NewsScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </NewsStack.Navigator>
  );
  
  const LocationStackScreen = ({navigation}) => (
    <LocationStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1C1C1C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <LocationStack.Screen name="Location" component={LocationScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#1C1C1C" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </LocationStack.Navigator>
    );
      
  