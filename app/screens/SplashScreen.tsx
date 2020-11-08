import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";



export interface props {
  navigation: any;
}



const Cards = ({ navigation }: props) => {

    useEffect(() => {
        setTimeout(() =>navigation.replace('App'), 2000);
    }, [])


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/musicSplash.png')} styles={{width:'80%', height:'80%'}} resizeMode='contain' />
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cards;
