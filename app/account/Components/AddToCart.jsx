// AddToCartButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddToCart = ({ onAddToCart }) => {
  return (
    <TouchableOpacity onPress={onAddToCart} style={styles.button}>
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddToCart;
