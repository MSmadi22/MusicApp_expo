import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, FlatList, Dimensions, Pressable, ActivityIndicator, StatusBar } from 'react-native';
import { AppColors } from '../theme';
import Cards from '../components/Cards';
import Constants from '../common/Constants';
import api from '../api/musicApi';

/***
in this screen we must make 2 http calls,
one to get artists ID's and the other to get albums.
 ***/


const WIDTH = Dimensions.get('screen').width;


export interface props {
  navigation: any;
}


const AlbumsScreen = ({navigation}:props) => {
  const [artistAlbums, setArtistAlbums]=useState([]);
  const [albumsID, setAlbumsID]=useState([]);
  const [albums, setAlbums]=useState([]);

  const [loading, setLoading]=useState(true);
  

  useEffect(() => {
    getAlbumDetails('https://api.happi.dev/v1/music/artists/372/albums');
  }, [])



  const getAlbumDetails=(albumDetails)=>{
    api.get(`${albumDetails}`)
      .then(res=>{
        if(res.data.success){
          setAlbums(albums.concat(res.data.result.albums))
          setLoading(false);
        }else{
          setLoading(false);
          alert('Something went wrong');
        }
      })
      .catch(err=>{
        setLoading(false);
        alert(err);
      });
  }



  return (
    <View style={styles.container}>

      {loading?
        <ActivityIndicator size='large' color={AppColors.primary}/>
      :<FlatList
        data={albums}
        numColumns={2}
        removeClippedSubviews
        style={{width:WIDTH, flex:1, paddingVertical:StatusBar.currentHeight+10}}
        contentContainerStyle={{alignItems:'center', paddingHorizontal:(WIDTH-Constants.cardsWidth*2)/6}}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({item, index})=>
          <Cards onPress={()=>navigation.navigate('ArtistDetailsScreen', {artist:item})} disabled={true} cover={item.cover} track={item.album} artist={item.artist} index={index}/>
        }
      />}
      
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.lightGray,
  },
});


export default AlbumsScreen;
