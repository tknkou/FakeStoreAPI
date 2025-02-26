import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

export default function Cart() {
  const {cartItems,total} = useSelector((state) => state.cart); // Redux から cartItems を取得
  const dispatch = useDispatch(); // Redux の dispatch を取得

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Pressable onPress={() => dispatch(removeFromCart(item.id))} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </Pressable>
      <Button title="+"/>
      <Button title="-"/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      
      )}
      <View style={styles.totalContainer}> 
        <Text>Total{total}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f1f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    flex:1,
    numberOfLines: 1, // 1行で表示
    ellipsizeMode: "tail", // 省略時に "..." を表示
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
