import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Redux 用
import { addToCart } from "../features/cart/cartSlice";
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator, TouchableOpacity} from "react-native";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  // 初期状態では空の配列
  const dispatch = useDispatch(); // Redux の dispatch を取得

  //addボタンを押した時に起動＝＞reduxのaddcartをディスパッチ＝＞
  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Redux の addToCart を dispatch
    alert(`The item has been correctly added to your cart!`);
  };

  //選択されたカテゴリに基づいてフィルタリングされた商品を返す関数
  const filterProducts = (category) => {
    const filteredItems = products.filter((product) => product.category === category);
    setFilteredProducts(filteredItems);  // filteredProductsに該当する商品をセット
  };
    
  //プロダクトページに移動した際に最初に読み込む。
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //商品情報を取得
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data)
        //カテゴリを取得。Setで重複するデータを取り除き、一意のデータのみ格納。...で配列にデータを再び格納。
        const categories = [ ... new Set(data.map((product) => product.category))];
        setCategories(categories);  // categoriesステートに設定
        console.log(categories)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    //ここでfetchProducts();を起動することでデータを取得。
    fetchProducts();
  }, []);
  

  


//商品一つ一つのボックス
  const renderProduct = ({ item }) => (
    //ProductパラメータをProductDetailページに渡す。データはそれぞれのアイテムitem
    <Pressable onPress={() => navigation.navigate("ProductDetail", { product: item })}>
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ImgBtnContainer}>
          <ImgButton label="Add to Cart" fun={() => handleAddToCart(item)}/>
        </View>
      </View>
    </Pressable>
  
  );


  return (
    //Productsページ全体の構成。<view <flatlist スクロールするため<touchable <text>>>
    <View style={styles.container}>
      {/* カテゴリボタン（FlatListを使用） */}
    <FlatList
      data={categories}  // categories 配列をデータソースとして使用
      renderItem={({ item: category }) => (
        <TouchableOpacity
            key={category}
            style={styles.categoryButton} // スタイルを適用
            onPress={() => filterProducts(category)} // カテゴリの選択
        >
            <Text style={styles.categoryButtonText}>{category}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(category) => category}  // 各カテゴリのユニークなキー（カテゴリ名をキーにする）
      horizontal  // 横スクロールにする
      contentContainerStyle={styles.btnContainer}  // スタイルを指定
    />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : products.length > 0 ? (
        <FlatList
          data={filteredProducts.length > 0 ? filteredProducts : products }
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
    backgroundColor : "#ffae00",
    padding: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    backgroundColor:"white",
    height: 60,
    backgroundColor : "#ffae00",
  },
  ImgBtnContainer: {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  categoryButton: {
    backgroundColor: "#f5f7f4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    height: 40,
  },
  categoryButtonText:{
    fontSize:18,
    fontWeight:"bold",
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
