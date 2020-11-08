import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, FlatList,
        TouchableOpacity, Animated, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { AppColors } from '../theme';
import Cards from '../components/Cards';
import Constants from '../common/Constants';
import api from '../api/musicApi';

import { Octicons } from '@expo/vector-icons';

const WIDTH=Dimensions.get('screen').width;
const HEIGHT=Dimensions.get('screen').height;


export interface props {
  navigation: any;
}

const headerHeight=100;
let dataLength=1;


const SearchScreen = ({navigation}:props) => {
  const [searchResults, setSearchResults]=useState([]);
  const [search, setSearch]=useState('');
  const [loading, setLoading]=useState(false);

  const scrollY=new Animated.Value(0);
  const diffClamp=Animated.diffClamp(scrollY,0,headerHeight);
  const translateY=diffClamp.interpolate({
      inputRange:[0,headerHeight],
      outputRange:[0,-headerHeight]
  })

    
  const header=()=>{
    return(
      <Animated.View style={[ styles.header, {transform:[{translateY:translateY}]} ]}>
        <View style={styles.searchBar}>

          <TextInput
            placeholder='Search tracks, albums and artists...'
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={txt=>{
              setSearch(txt);
              startSearch(txt);
            }}
            onSubmitEditing={()=>{
              startSearch();
              Keyboard.dismiss();
              search.trim().length<1&&Alert.alert('','Enter data to search')
            }}
            style={styles.searchText}
          />

          <TouchableOpacity activeOpacity={0.8} style={styles.searchBtn} onPress={()=>{
            startSearch();
            Keyboard.dismiss();
            search.trim().length<1&&Alert.alert('','Enter data to search')
          }}>
            <Octicons name='search' color='white' size={22}/>
          </TouchableOpacity>

        </View>
      </Animated.View>
    )
  }


  const startSearch=(search='')=>{
    
    if(search.trim().length>0){

      setLoading(true);

      api.get(`?q=${search}&limit=30`)
      .then(res=>{
        dataLength=res.data.length;
        if(res.data.success){
          setSearchResults(res.data.result);
          setLoading(false);
        }else if(!res.data.success || res.data.length===0){
          setSearchResults([]);
          setLoading(false);
        }
      })
      .catch(err=>{
        setLoading(false);
        alert('Something went wrong');
      });

    }
    else{}
  }



  return (
    <View style={styles.container}>

      {header()}

      {loading?
        <ActivityIndicator size='large' color={AppColors.primary}/>
        :<FlatList
          data={searchResults}
          numColumns={2}
          removeClippedSubviews
          keyExtractor={(item, index)=>index.toString()}
          style={{width:WIDTH, flex:1}}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={()=>dataLength===0&&<Text style={styles.noResults}>No results found</Text>}
          onScroll={e=>{scrollY.setValue(e.nativeEvent.contentOffset.y);Keyboard.dismiss()}}
          renderItem={({item, index})=>
            <Cards onPress={()=>navigation.navigate('LyricsScreen', {data:item})} cover={item.cover} track={item.track} artist={item.artist} index={index}/>
          }
        />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: AppColors.lightGray,
  },
  header:{
    width:WIDTH,
    height:headerHeight,
    backgroundColor:AppColors.lightGray,
    borderBottomEndRadius:30,
    borderBottomStartRadius:30,
    justifyContent:'flex-end',
    position:'absolute',
    paddingBottom:12,
    top:0,
    right:0,
    left:0,
    zIndex:10,
    elevation:10,
    shadowColor: "#000",
    shadowOffset: {height: 2,width:0},
  },
  searchBar:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    borderWidth:1.5,
    borderColor:AppColors.primary,
    borderRadius:50,
  },
  searchText:{
    width:'75%',
    height:40,
    borderRadius:10,
    paddingVertical:0,
    paddingHorizontal:10,
    fontSize:16,
    fontFamily:'RegularFont',
  },
  searchBtn:{
    width:WIDTH*0.12,
    height:WIDTH*0.12,
    borderRadius:50,
    backgroundColor:AppColors.primary,
    alignItems:'center',
    justifyContent:'center',
  },
  listContainer:{
    alignItems:'center',
    paddingHorizontal:(WIDTH-Constants.cardsWidth*2)/6,
    paddingBottom:20,
    paddingTop:headerHeight
  },
  noResults:{
    fontSize:26,
    color:'gray',
    alignSelf:'center',
    fontStyle:'italic',
    marginTop:HEIGHT/3
  },
});

export default SearchScreen;
