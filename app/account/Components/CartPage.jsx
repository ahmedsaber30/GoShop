import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RemoveFromCart from './RemoveFromCart';

const ProductBox = ({ name, image, price, onRemoveFromCart }) => (
  <View style={styles.productBox}>
    <Image source={{ uri: image }} style={styles.productImage} />
    <Text style={styles.productName}>{name}</Text>
    <Text style={styles.priceText}>${price}</Text>
    <RemoveFromCart onRemoveFromCart={onRemoveFromCart} />
  </View>
);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadCartItems = async () => {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        const items = JSON.parse(storedCartItems);
        setCartItems(items);
        setTotalPrice(calculateTotalPrice(items));
      }
    };

    loadCartItems();
  }, []);

  const calculateTotalPrice = (items) => items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleRemoveFromCart = async (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    setTotalPrice(calculateTotalPrice(updatedItems));
  };

  const handleClearCart = async () => {
    await AsyncStorage.removeItem('cartItems');
    setCartItems([]);
    setTotalPrice(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {cartItems.map((cartItem) => (
        <ProductBox
          key={cartItem.id}
          name={cartItem.name}
          image={cartItem.image}
          price={cartItem.price}
          onRemoveFromCart={() => handleRemoveFromCart(cartItem.id)}
        />
      ))}
      </ScrollView>
      <Text style={styles.priceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
      <Pressable onPress={handleClearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productBox: {
    flexDirection: 'column', 
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartPage;
