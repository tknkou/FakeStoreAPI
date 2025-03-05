import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import Cart from './src/screens/Cart';
import Account from './src/screens/Account';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './store';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Drawer = createDrawerNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(()=>{
    setTimeout(() => {
      setIsShowSplash(false)
    }, 3000);
    //ログイン情報が情報がStorageに保存されているか確認
    const checkLoginStatus = async () =>{
      try{
        //getItemでサーチ
        const savedToken = await AsyncStorage.getItem("userToken")
        //if tokenが発見できればsetTokenに格納＝＞splashを終わり＝＞homeを表示 or ない場合でもsplash終了。
        if(savedToken){
          setToken(savedToken)
        } 
      }catch(e){
        console.log("Error getting Token", e)
      }
    }
    checkLoginStatus();
  },[]);


  //LoginScreenでログイン成功時にtokenを取得し、AsyncStrageに保存
  const handleLoginSuccess = async (newToken) => {
    try {
      //Login.jsで受け取ったトークンをAsyncStrageに保存
      await AsyncStorage.setItem("userToken" , newToken);
      //Home画面とLoginFormを切り替えるためにTokenをset。
      setToken(newToken);
    }catch(e) {
      console.log("Error saving token", e);
    }
  }

  return(
    <>
      {isShowSplash ? (
        <SplashScreen />
      //tokenがあればHomeScreenを表示。なければLoginScrenを表示。
      ) : token ? (
        <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="Cart" component={Cart} />
            <Drawer.Screen name="Account" component={Account} />
          </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
      ) :(
        <>
        {/* LoginScreenにコールバック関数（onLoginSuccess（）を渡す）なぜなら、
        LoginScreenで正しくログインが確認された場合にfetchしたトークンを親コンポーネント
        (App.js）に渡すため */}
        <Login onLoginSuccess={handleLoginSuccess} />
        </>
      )}
    </> 
  )
}
