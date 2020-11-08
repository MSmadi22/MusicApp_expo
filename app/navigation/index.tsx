import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppColors } from '../theme';

import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'; 

import {
  SplashScreen,
  AlbumsScreen,
  ArtistScreen,
  SearchScreen,
  ArtistDetailsScreen,
  LyricsScreen
} from '../screens';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const ArtistStack = () =>
  (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ArtistScreen' component={ArtistScreen} />
      <Stack.Screen name='ArtistDetailsScreen' component={ArtistDetailsScreen} />
    </Stack.Navigator>
  )

const SearchStack = () =>
  (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
    </Stack.Navigator>
  )

const AlbumsStack = () =>
  (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AlbumsScreen' component={AlbumsScreen} />
    </Stack.Navigator>
  )




const BottomNavigation = () => (
  <Tab.Navigator tabBarOptions={{style: styles.bottomNavigatorView, keyboardHidesTabBar: true}}>


    {/*  Artists Stack  */}
    <Tab.Screen component={ArtistStack} name='ArtistStack'
      options={{
        tabBarIcon: (props) => (<View {...props} style={styles.BottomButtons}><MaterialCommunityIcons name='artist' size={24} color={props.focused ? AppColors.primary : '#b1b1b1'} /></View>),
        tabBarLabel: (props) => <Text {...props} style={{color:props.focused ? AppColors.primary : '#b1b1b1', fontSize:12, fontFamily:'MediumFont'}}>Artists</Text>
      }}/>
          
    {/*  Albums Stack  */}
    <Tab.Screen component={AlbumsStack} name='AlbumsStack'
      options={{
        tabBarIcon: (props) => (<View {...props} style={styles.BottomButtons}><Ionicons name='ios-albums' size={24} color={props.focused ? AppColors.primary : '#b1b1b1'} /></View>),
        tabBarLabel: (props) => <Text {...props} style={{color:props.focused ? AppColors.primary : '#b1b1b1', fontSize:12, fontFamily:'MediumFont'}}>Albums</Text>
      }}/>

    {/*  Search Stack  */}
    <Tab.Screen component={SearchStack} name='SearchStack'
      options={{
        tabBarIcon: (props) => (<View {...props} style={styles.BottomButtons}><AntDesign name='search1' size={24} color={props.focused ? AppColors.primary : '#b1b1b1'} /></View>),
        tabBarLabel: (props) => <Text {...props} style={{color:props.focused ? AppColors.primary : '#b1b1b1', fontSize:12, fontFamily:'MediumFont'}}>Search</Text>
      }}/>
    

  </Tab.Navigator>
)


const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='App' component={BottomNavigation} />
      <Stack.Screen name='LyricsScreen' component={LyricsScreen} />
      
    </Stack.Navigator>
  </NavigationContainer>
);



const styles = StyleSheet.create({
  BottomButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavigatorView: {
    backgroundColor: AppColors.darkGray,
    maxHeight:Platform.OS==='ios'?80:60,
    borderTopWidth:0,
    paddingBottom:5
  },
})

export default AppNavigator;