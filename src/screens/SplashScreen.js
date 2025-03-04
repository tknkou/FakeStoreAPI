import { View, StyleSheet, Image} from "react-native";

export default function SplashScreen() {
    return (
        <View style={styles.container} >
            <View style={styles.image}>
                <Image 
                    source={require('../../assets/shopping_bag_icon.png')}/>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container :{
        flex : 1, 
        justifyContent : "center",
        alignContent : "center",
        backgroundColor : "#ffae00" 
    },
    image:{
        height: 100,
        width: 100,
        resizeMode:"center",
        marginLeft : 125,
    }
})