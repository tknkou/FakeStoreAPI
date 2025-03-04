import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

export default function Cart() {
  const {cartItems,total} = useSelector((state) => state.cart); // Redux から cartItems を取得
  const dispatch = useDispatch(); // Redux の dispatch を取得


  // 商品の数量を更新する関数
  const handleUpdateQuantity = (itemId, action) => {
    dispatch(updateQuantity({ itemId, action }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text numberOfLines={3} ellipsizeMode="tail" style={styles.itemText}>{item.title}</Text>
      <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
      <Pressable onPress={() => dispatch(removeFromCart(item.id))} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </Pressable>
      <Button title="+"  onPress={() => handleUpdateQuantity(item.id, "increase")}/>
      <Button title="-"  onPress={() => handleUpdateQuantity(item.id, "decrease")}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You must shop ASAP!!</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      
      )}
      <View style={styles.totalContainer}> 
        <Text style={{fontSize : 20, marginBottom :20, }}>Total ${total.toFixed(2)}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f1f1",
    alignContent : "center",
    backgroundColor : "#ffae00",
  },
  totalContainer :{
    justifyContent : "center",
    alignItems : "center",
  },
  emptyContainer :{
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft : 120,
  },
  emptyText: {
    color: "#777",
    fontSize : 25,
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
  quantityText: {
    fontSize: 16,
    marginRight : 10,
  },
});
