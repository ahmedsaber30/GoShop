import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import { router } from "expo-router";
import AddToCart from './AddToCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase/Config";

const screenWidth = Dimensions.get('window').width;

const ProductBox = ({ name, image, price, onAddToCart }) => (
  <View style={styles.productBox}>
    <Image source={{ uri: image }} style={styles.productImage} />
    <Text style={styles.productName}>{name}</Text>
    <Text style={styles.priceText}>${price}</Text>
    <AddToCart onAddToCart={onAddToCart} />
  </View>
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [profileData, setProfileData] = useState({ imageUrl: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const email = await AsyncStorage.getItem('email');
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data())[0];
      setProfileData(data);
    };
    fetchProfileData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const cartItems = JSON.parse(await AsyncStorage.getItem('cartItems')) || [];
      if (!cartItems.some(item => item.id === product.id)) {
        const updatedCartItems = [...cartItems, product];
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const navigateToCart = async () => {
    const cartItems = JSON.parse(await AsyncStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + Number(item.price), 0);
    router.navigate({
      pathname: `/account/Components/CartPage`,
      params: { cartItems: JSON.stringify(cartItems), totalPrice: totalPrice }
    });
  };

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable onPress={() => router.navigate("/account/Components/UserProfile")}>
          <Image style={styles.logo} source={{ uri: profileData.imageUrl }} />
        </Pressable>
        <TextInput
          placeholder="Search Products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.cartFlag}
          onPress={navigateToCart}
        >
          <Image style={styles.cartFlag} source={{uri:'https://t3.ftcdn.net/jpg/03/14/84/68/360_F_314846831_5jJsC7Us9obgwMjRDqFhs04dodzvnZvi.jpg'}} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {filteredProducts.map(product => (
          <ProductBox key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cartFlag: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
  productBox: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 300,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomePage;
