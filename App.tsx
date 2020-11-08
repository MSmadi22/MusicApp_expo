import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet, Dimensions, Text} from 'react-native';
import AppNavigator from './app/navigation';
import {AppColors} from './app/theme/Colors';
import * as Font from 'expo-font';
import NetInfo from "@react-native-community/netinfo";

import { Feather } from '@expo/vector-icons';


const App = () => {
  const [internet, setInternet]=useState(true);


  useEffect(() => {
    NetInfo.addEventListener(net=>setInternet(net.isConnected));
    loadFonts()
  }, [])


  const loadFonts=async()=>{
    await Font.loadAsync({
      BoldFont:require('./assets/fonts/Ubuntu-Bold.ttf'),
      LightFont:require('./assets/fonts/Ubuntu-Light.ttf'),
      MediumFont:require('./assets/fonts/Ubuntu-Medium.ttf'),
      RegularFont:require('./assets/fonts/Ubuntu-Regular.ttf'),
    });
  }


  if(internet === false)
    return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={Dimensions.get('screen').width*0.33} color="#e8e8e8" />
      <Text style={styles.txt}>Please connect to the internet</Text>
    </View>)
  else return(
      <SafeAreaView style={{flex: 1, width: '100%', backgroundColor: AppColors.lightGray}}>
        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content'/>
        <AppNavigator />
      </SafeAreaView>
  )
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary
  },
  txt:{
    color:'#e8e8e8',
    fontFamily:'MediumFont',
    fontSize:22,
    marginTop:30
  }
});

export default App;
