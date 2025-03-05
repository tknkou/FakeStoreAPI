import React, { useState } from 'react'
import { View, Text, StyleSheet,TextInput, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

export default function Login({onLoginSuccess}) {
  //userName, passWord stateでユーザー空の入力を管理。
  const [userName, setuserName ] = useState("");
  const [passWord, setpassWord ] = useState("");

  const handleLogin =() => {
    axios({
      url : "https://fakestoreapi.com/auth/login",
      method : "POST",
      data : {
        username : userName,
        password : passWord,
      },
    }).then((res)=>{
      const newToken = res.data.token
      onLoginSuccess(newToken)
      console.log(res.data.token)
      console.log(userName, passWord)
    }).catch((error)=>{
      if (error.response) {
        // サーバーからのエラーレスポンス
        console.log("Error Status:", error.response.status);
        console.log("Error Data:", error.response.data);
      } else if (error.request) {
        // リクエストが送信されたが、レスポンスがない場合
        console.log("No response received:", error.request);
      } else {
        // その他のエラー
        console.log("Axios Error:", error.message);
      }
    })
    // console.log("clicked")
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
        { backgroundColor: pressed ? 'lightgray' : 'white' }
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
        backgroundColor : "#ffae00" 
    },
    textInput :{
      backgroundColor : "white",
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

