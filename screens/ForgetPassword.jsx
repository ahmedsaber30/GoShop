import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { auth , db} from "../firebase/Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth"; 
import { addDoc, collection ,getDocs,where,query} from 'firebase/firestore';
 // Replace with your actual firebaseConfig path

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSendResetEmail = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await sendPasswordResetEmail(auth,email);

      alert('Password reset email sent successfully!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Forgot Password</Text>
      <TextInput
        style={{ padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Send Reset Email" onPress={handleSendResetEmail} />
      )}
    </View>
  );
};

export default ForgotPassword;
