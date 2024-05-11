import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { db } from "../../../firebase/Config";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    fname: '',
    lname: '',
    age: '',
    phone: '',
    email: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const Ref = collection(db, 'users');
        const q = query(Ref, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data())[0]; // Assuming there's only one document per email

        if (data) {
          setProfileData({
            ...data
          });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('email'); // Remove the email from AsyncStorage
    router.navigate('/account/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.imageUrl }} style={styles.image} />
      <Text style={styles.text}>First Name: {profileData.fname}</Text>
      <Text style={styles.text}>Last Name: {profileData.lname}</Text>
      <Text style={styles.text}>Age: {profileData.age}</Text>
      <Text style={styles.text}>Phone: {profileData.phone}</Text>
      <Text style={styles.text}>Email: {profileData.email}</Text>
      <Pressable onPress={() => router.navigate({ pathname: `/account/Components/EditProfile`,
      params: { profileData: JSON.stringify(profileData) }})} style={styles.editButton}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#007AFF', // Blue color for the button
    padding: 10,
    borderRadius: 5,
    // If you want the same text style as the logout button, use buttonText style
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30', // Red color for the button
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text inside the button
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 60,
  },
  text: {
    fontSize: 16,
    marginVertical: 16,
  },
});

export default UserProfile;
