import React from 'react';
import { Image, StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { AppColors } from '../theme';
import Constants from '../common/Constants';


const WIDTH = Dimensions.get('screen').width;


let cardsWidth=Constants.cardsWidth;
let cardsHeight=Constants.cardsHeight;


export interface props {
  track:string;
  artist:string;
  cover:any;
  index:number;
  disabled?:boolean;
  onPress:VoidFunction;
}


const Cards = ({track, artist, cover, index, disabled, onPress}:props) => {


  return (
    <Pressable delayLongPress={0} disabled={disabled} style={({pressed})=>pressed?styles.cardsPressed:styles.cards} onPress={()=>onPress()} key={index}>
      
        <Image defaultSource={require('../../assets/images/image.png')} source={{uri:cover}} style={styles.image} resizeMode='contain'/>

        <View style={{flex:1, width:'100%'}}>
          {track&&<Text adjustsFontSizeToFit numberOfLines={2} style={styles.trackName}>{track}</Text>}
          <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.artistName, {bottom:track?5:null, top:track?null:15, alignSelf:track?'flex-start':'center'}]}>{artist}</Text>
        </View>

    </Pressable>
  );
  
};


const styles = StyleSheet.create({
  cards:{
    alignSelf:'center',
    width:cardsWidth,
    height:cardsHeight,
    backgroundColor:AppColors.cardsColors,
    marginVertical:(WIDTH-cardsWidth*2)/6,
    marginHorizontal:(WIDTH-cardsWidth*2)/6,
    alignItems:'center',
    borderRadius:10,
    overflow:'hidden',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardsPressed:{
    alignSelf:'center',
    width:cardsWidth-6,
    height:cardsHeight-6,
    backgroundColor:AppColors.cardsColors,
    marginVertical:(WIDTH-cardsWidth*2)/6,
    marginHorizontal:(WIDTH-cardsWidth*2)/6+3,
    alignItems:'center',
    borderRadius:10,
    overflow:'hidden',
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  artistName:{
    fontSize:16,
    fontFamily:'MediumFont',
    position:'absolute',
    paddingHorizontal:5,
  },
  image:{
    width:cardsWidth,
    height:cardsWidth,
    backgroundColor:'white'
  },
  trackName:{
    fontSize:16,
    fontFamily:'MediumFont',
    textAlign:'left',
    padding:5
  },
});


export default Cards;
