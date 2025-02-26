import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Redux 用
import { addToCart } from "../features/cart/cartSlice";
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductDetail } from "./ProductDetail";
import { ImgButton } from "../../ImgButton";

const Stack = createStackNavigator();

export default function Products() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProdList"
        component={ProdList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProdList({ navigation }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // Redux の dispatch を取得

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Redux の addToCart を dispatch
    alert(`${item.title} has been added to your cart!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
//商品一つ一つのボックス
  const renderProduct = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("ProductDetail", { product: item })}>
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <ImgButton name="add" label="add" fun={() => handleAddToCart(item)} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No products available!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});
