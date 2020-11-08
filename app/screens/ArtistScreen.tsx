import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import { AppColors } from '../theme';
import Cards from '../components/Cards';
import Constants from '../common/Constants';
import api from '../api/musicApi';


const WIDTH = Dimensions.get('screen').width;


export interface props {
  navigation: any;
}


const ArtistScreen = ({navigation}:props) => {
  const [artistsData, setArtistsData]=useState([]);
  const [currentPage, setCurrentPage]=useState(1);
  const [pages, setPages]=useState(1);

  const [loading, setLoading]=useState(true);
  const [nextPageLoading, setNextPageLoading]=useState(false);
  

  useEffect(() => {
    getData()
  }, [])


  const getData=()=>{
    setNextPageLoading(true);

    api.get(`/artists?page=${currentPage}`)
      .then(res=>{
        if(res.data.success){
          setArtistsData(artistsData.concat(res.data.result));
          setPages(res.data.pages);
          setNextPageLoading(false);
          setLoading(false);
          setCurrentPage(currentPage+1);
        }else{
          setNextPageLoading(false);
          setLoading(false);
        }
      })
      .catch(err=>{
        setNextPageLoading(false);
        setLoading(false);
        alert('Something went wrong');
      });

  }


  return (
    <View style={styles.container}>

      {loading?
        <ActivityIndicator size='large' color={AppColors.primary}/>
      :<FlatList
        data={artistsData}
        numColumns={2}
        removeClippedSubviews
        onEndReached={() => currentPage<=pages?getData():null}
        onEndReachedThreshold={0.1}
        style={{width:WIDTH, flex:1, paddingTop:StatusBar.currentHeight+10}}
        contentContainerStyle={{alignItems:'center', paddingHorizontal:(WIDTH-Constants.cardsWidth*2)/6}}
        keyExtractor={(item, index)=>index.toString()}
        ListFooterComponent={()=>nextPageLoading&&<ActivityIndicator size='large' color={AppColors.primary} style={{marginVertical:30}}/>}
        renderItem={({item, index})=>
          <Cards onPress={()=>navigation.navigate('ArtistDetailsScreen', {artist:item})} cover={item.cover} track={item.album} artist={item.artist} index={index}/>
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


export default ArtistScreen;
