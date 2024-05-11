import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { db } from "../../../firebase/Config";
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

const EditProfile = () => {
  const { profileData: profileDataParam } = useLocalSearchParams();
  const profileData = JSON.parse(profileDataParam);
  const [editedProfile, setEditedProfile] = useState(profileData);

  const handleSaveChanges = async () => {
    try {
      const q = query(collection(db, "users"), where("email", "==", profileData.email));
      const querySnapshot = await getDocs(q);
      const documentId = querySnapshot.docs[0]?.id || null;
      if (documentId) {
        await setDoc(doc(db, "users", documentId), editedProfile, { merge: true });
        alert('Profile updated successfully!');
      } else {
        alert('No document found with the provided email.');
      }
    } catch (error) {
      alert('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={editedProfile.fname}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, fname: text })}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={editedProfile.lname}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, lname: text })}
      />
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={editedProfile.age}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, age: text })}
      />
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={editedProfile.phone}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={editedProfile.imageUrl}
        onChangeText={(text) => setEditedProfile({ ...editedProfile, imageUrl: text })}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
