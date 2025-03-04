import { View,Text,StyleSheet,Pressable } from "react-native";
import {Ionicons} from"@expo/vector-icons"

export const ImgButton = ({
name,
label,
size,
fun =()=>{
    console.log("clicked, but the function hasn`t assigned")
},
})=>{
    return(
        <Pressable
        style={({pressed})=>{pressed?{opacity: 0.5}:{}}}
        onPress={fun}
        >
            <View style={styles.container}>
                <Ionicons name={name} color={"black"} />
                <Text style={styles.text}>{label}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 100,
        height: 30,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems: "center"
    },
    text :{
        color: "black",
        paddingRight : 10,
    },
})