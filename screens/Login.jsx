import { router } from "expo-router";
import React, { useState , useEffect} from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const checkEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        router.navigate('/home');
      }
    };

    checkEmail();
  }, []);

  const handleLogin = async () => {
    try {
        const credentials = await login(email, password);
        console.log('credentials', JSON.stringify(credentials.user));
       await storeData(email)
        router.navigate(`/home`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };
  const storeData = async (email) => {
  try {
    await AsyncStorage.setItem('email', email);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data', error);
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Pressable onPress={()=>router.navigate("/account/register")}>
        <Text style={{ marginTop: 10 }}>Register</Text>
      </Pressable>
      <Text>{error.code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
  },
});

export default Login;
