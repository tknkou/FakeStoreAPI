import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { ImgButton } from "../../ImgButton";

export default function Home({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Welcome to Home</Text>
            <Text>This is the shopping application that you can enjoy your shopping without paying😘</Text>
            <View style={styles.btnContainer}>
            <ImgButton name="cart" label="Cart"/>
            <ImgButton name="shirt" label="Products"/>
            <ImgButton name="body" label="Account"/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:`center`,
        alignItems:`center`,
    },
    btnContainer: {
        display: "flex",
        gap: 10,
    }
})
  