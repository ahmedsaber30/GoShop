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
import {  addDoc,getFirestore, collection, query, where, getDocs,orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { register } from "../firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth , db} from "../firebase/Config";


const Register = () => {
    // const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phone, setphone] = useState("");
    const [age, setage] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const Ref = collection(db, 'users');
    useEffect(() => {
    const checkEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        router.navigate('/home');
      }
    };

    checkEmail();
  }, []);

  const handlePress = async () => {
    try {
        const credentials = await register(email, password);
        console.log('credentials', JSON.stringify(credentials.user));
        addDoc(Ref,{fname:firstName,lname:lastName,phone:phone,age:age,email:email,imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'})
        router.navigate(`/account/login`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };

  const createUserWithAdditionalInfo = (email, password, firstName, lastName) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User is created, now let's add additional info to the database
      const uid = userCredential.user.uid;
      database.ref('users/' + uid).set({
        firstName: firstName,
        lastName: lastName,
        // You can add more fields here
      });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

  return (
    <View style={styles.container}>
      {/* <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      /> */}
      <TextInput
        placeholder="firstName"
        value={firstName}
        onChangeText={setfirstName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="lastName"
        value={lastName}
        onChangeText={setlastName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setphone}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setage}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
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
      <Button title="Register" onPress={handlePress} />
      <Pressable onPress={()=>router.navigate("/account/ForgetPassword")}>
        <Text style={{ marginTop: 10 }}>Login</Text>
      </Pressable >
      <Pressable onPress={()=>router.navigate("/account/")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
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

export default Register;
