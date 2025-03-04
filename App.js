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




const Drawer = createDrawerNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(()=>{
    setTimeout(() => {
      setIsShowSplash(false)
    }, 3000);
  });
  return(
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
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
      )}
    </>)
}
