import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import Cart from './src/screens/Cart';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './store';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Products" component={Products} />
          <Drawer.Screen name="Cart" component={Cart} />
        </Drawer.Navigator>
      </NavigationContainer>
      </Provider>

  );
}
