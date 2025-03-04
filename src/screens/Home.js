import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { ImgButton } from "../../ImgButton";


export default function Home({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
            <Text style={{fontSize: 30}}>Welcome to Home</Text>
            <Text style={{fontSize: 20}}>Shop for free and enjoy 😘</Text>
            </View>
                <View style={styles.btnContainer}>
                    <ImgButton name="cart" label="Cart" fun={() => navigation.navigate("Cart")}/>
                    <ImgButton name="shirt" label="Products" fun={() => navigation.navigate("Products")}/>
                    <ImgButton name="body" label="Account" />
                </View>

    </View>
    )}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:`center`,
        alignItems:`center`,
        backgroundColor : "#ffae00",
    },
    textContainer :{
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    btnContainer: {
        flex : 1,
        justifyContent :"space-evenly",
    }
})
  