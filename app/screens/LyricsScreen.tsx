//@ts-nocheck
import React, {useState, useEffect, useRef} from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View,
        ScrollView, Dimensions, Pressable, StatusBar } from 'react-native';
import { AppColors } from '../theme';
import api from '../api/musicApi';
import Modal from 'react-native-modalbox';

import { MaterialIcons } from '@expo/vector-icons';

const WIDTH=Dimensions.get('screen').width;
const HEIGHT=Dimensions.get('screen').height;

export interface props {
  navigation: any;
  route:any;
}


const LyricsScreen = ({navigation, route}:props) => {
  let song=route.params?.data;
  
  const [track, setTrack]=useState([]);
  const [loading, setLoading]=useState(true);

  const imageRef=useRef<Modal>();

  useEffect(() => {
    getTrackDetails()
  }, [])


  const getTrackDetails=()=>{
    api.get(song.api_lyrics)
      .then(res=>{
        if(res.data.success){
          setTrack(res.data.result);
          setLoading(false);
        }else{
          setTrack([]);
          setLoading(false);
        }
      })
      .catch(err=>{
        setTrack([]);
        setLoading(false);
      });
  }


  const imageModal=()=>{
    return(
      <Modal
        ref={imageRef} 
        backButtonClose
        coverScreen
        swipeToClose
        backdropColor='rgba(128,128,128,0)'
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent:'center',
          width:WIDTH,
          height:HEIGHT
        }}>
        <View
          style={{
            height: Dimensions.get('window').height+100,
            width: Dimensions.get('window').width,
            justifyContent:'center',
            alignItems: 'center',
            backgroundColor:'rgba(128,128,128,0)',
          }}>
            <Pressable style={{width:WIDTH,flex:1}} onPress={()=>imageRef.current.close()}/>
            <Image source={{uri:song.cover}} style={{width:WIDTH, height:WIDTH, borderWidth:2, borderColor:AppColors.primary}} resizeMode='contain'/>
            <Pressable style={{width:WIDTH,flex:2}} onPress={()=>imageRef.current.close()}/>
        </View>
      </Modal>
    )
  }


  return (
    <View style={styles.container}>
      {imageModal()}

      <Pressable style={styles.backBtn} onPress={()=>navigation.goBack()}>
        <MaterialIcons name='arrow-back' size={26} color={AppColors.primary}/>
      </Pressable>

      <ScrollView style={{width:'100%', flex:1}}>

        <Pressable onPress={()=>imageRef.current.open()}>
          <Image defaultSource={require('../../assets/images/image.png')} source={{uri:song.cover}} style={{width:WIDTH, height:WIDTH}} resizeMode='contain'/>
        </Pressable>

        <View style={styles.trackInfo}>
          <Text style={styles.artist}>{song.artist} - <Text>{song.track}</Text></Text>
          <Text style={[styles.artist, {fontSize:20}]}>{song.album}</Text>
        </View>
        
        {loading?
          <ActivityIndicator size='large' color={AppColors.primary} style={{marginTop:50}}/>
        :
          song.haslyrics?<Text style={styles.lyric}>{track.lyrics}</Text>
          :<Text style={styles.noLyrics}>Lyrics not available for this song</Text>
        }

      </ScrollView>

    </View>
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    alignItems: 'center',
    backgroundColor: AppColors.lightGray,
  },
  backBtn:{
    width:40,
    height:40,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:StatusBar.currentHeight,
    left:10,
    backgroundColor:'rgba(200,200,200,0.5)',
    zIndex:99
  },
  trackInfo:{
    width:'100%',
    paddingHorizontal:20,
    borderBottomColor:'#e8e8e8',
    backgroundColor:'#f8f8f8',
    borderBottomWidth:1,
  },
  artist:{
    fontSize:22,
    fontFamily:'MediumFont',
    paddingVertical:10
  },
  noLyrics:{
    fontSize:22,
    fontFamily:'MediumFont',
    paddingVertical:25,
    alignSelf:'center',
    fontStyle:'italic',
    color:'gray'
  },
  lyric:{
    fontSize:16,
    textAlign:'center',
    padding:20,
    fontFamily:'MediumFont'},
});


export default LyricsScreen;
