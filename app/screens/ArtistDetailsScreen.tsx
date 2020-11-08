import React, {useState, useEffect, useRef} from 'react';
import { Image, StyleSheet, Text, View, Dimensions, FlatList,
        ActivityIndicator, Pressable, StatusBar } from 'react-native';
import { AppColors } from '../theme';
import api from '../api/musicApi';
import Cards from '../components/Cards';
import Constants from '../common/Constants';
import Modal from 'react-native-modalbox';

import { MaterialIcons } from '@expo/vector-icons'; 

const WIDTH=Dimensions.get('screen').width;
const HEIGHT=Dimensions.get('screen').height;

export interface props {
  navigation: any;
  route:any;
}


const ArtistDetailsScreen = ({navigation, route}:props) => {
  const [artist, setArtist]=useState(route.params?.artist)
  const [artistData, setArtistData]=useState([]);
  const [loading, setLoading]=useState(true);

  const imageRef=useRef<Modal>();

  useEffect(() => {
    getArtistSongs()
  }, [])


  const getArtistSongs=()=>{
    api.get(`/artists/${artist.id_artist}/smart-playlist`)
      .then(res=>{
        setArtistData(res.data.result);
        setLoading(false);
      })
      .catch(err=>{
        setLoading(false);
        alert('Something went wrong');
      });
  }


  const header=()=>{
    return(
      <View style={styles.header}>
        <Pressable onPress={()=>imageRef.current.open()}>
          <Image defaultSource={require('../../assets/images/image.png')} source={{uri:artist.cover}} style={{width:WIDTH, height:WIDTH}} resizeMode='contain'/>
        </Pressable>
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.moreFromArtist}>{`More from ${artist.artist}:`}</Text>
      </View>
    )
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
            <Image source={{uri:artist.cover}} style={{width:WIDTH, height:WIDTH, borderWidth:2, borderColor:AppColors.primary}} resizeMode='contain'/>
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
      
      {loading?
        <ActivityIndicator size='large' color={AppColors.primary}/>
      :<FlatList
      data={artistData}
      keyExtractor={(item, index)=>index.toString()}
      numColumns={2}
      removeClippedSubviews
      ListHeaderComponent={()=>header()}
      style={{width:WIDTH, flex:1}}
      contentContainerStyle={{alignItems:'center', paddingHorizontal:(WIDTH-Constants.cardsWidth*2)/6}}
      renderItem={({item, index})=><Cards onPress={()=>navigation.navigate('LyricsScreen', {data:item})} cover={item.cover} track={item.track} artist={item.artist} index={index}/>}
      />}

    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    alignItems: 'center',
    justifyContent:'center',
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
  header:{
    width:WIDTH,
    paddingBottom:20,
    alignItems:'center',
    justifyContent:'flex-start',
  },
  moreFromArtist:{
    fontSize:22,
    fontFamily:'MediumFont',
    alignSelf:'flex-start',
    padding:(WIDTH-Constants.cardsWidth*2)/3
  }
});


export default ArtistDetailsScreen;
