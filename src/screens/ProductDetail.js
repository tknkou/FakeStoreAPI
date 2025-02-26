import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import Order from "./Order";

const Tabs = createBottomTabNavigator();

export const ProductDetail = ({ route }) => {
  return (
    <Tabs.Navigator initialRouteName="ProdDetCom" screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="ProdDetCom"
        component={ProductDetailCom}
        initialParams={{ prod: route.params.product }}
        options={{
          headerShown: false,
          tabBarLabel: "Product Detail",
        }}
      />
      <Tabs.Screen name="Order" component={Order} />
    </Tabs.Navigator>
  );
};

const ProductDetailCom = ({ navigation, route }) => {
  const { title, price, image } = route.params.prod;

  return (
    <View style={styles.container}>
      {/* タイトルを画面上部に固定 */}
      <Text style={styles.title}>Product Detail</Text>

      {/* 画像 */}
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>Name: {title}</Text>
      <Text style={styles.text}>Price: ${price}</Text>

      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

// スタイル設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start', // コンテンツを上に寄せる
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    position: 'absolute', // 画面上部に固定
    top: 20, // 上からの余白を調整
    
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
    marginTop: 100,
  },
});
