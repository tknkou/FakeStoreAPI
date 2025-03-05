import React, { useState } from 'react'
import { View, Text, StyleSheet,TextInput, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({onLoginSuccess}) {
  //userName, passWord stateでユーザー空の入力を管理。
  const [userName, setuserName ] = useState("");
  const [passWord, setpassWord ] = useState("");

  const handleLogin =() => {
    console.log("clicked")
  }

  return(
    <View style={styles.conatiner}>
      <TextInput
        style={styles.textInput}
        placeholder='Username'
        value={userName}
        onChangeText={setuserName}  
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        placeholder='Password'
        value={passWord}
        onChangeText={setpassWord}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <Pressable 
      style={({ pressed }) => [
        styles.loginBtn, 
        { backgroundColor: pressed ? 'lightgray' : 'Orange' }
      ]}
      onPress={handleLogin}
    >
      <Text style={styles.buttonText}>Login</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner :{
        flex : 1,
        justifyContent :"center",
        alignItems : "center",
    },
    textInput :{
      borderWidth : 2,
      height : 30,
      width : 250,
      margin : 5, 
    },
    loginBtn : {
      width : 80,
      height : 30,
      borderWidth : 2,
      borderRadius : 10,
      margin :10,
      justifyContent : "center",
      alignItems : "center",
    },
    buttonText : {
      fontSize : 20,
      fontWeight : "bold",
    }
})

