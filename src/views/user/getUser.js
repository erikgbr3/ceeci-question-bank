import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserCard = ({ user, navigation }) => {
  return (
    <TouchableOpacity 
    >
      <View style={styles.card}>
      <Text style={styles.title}>{user.id}</Text>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.title}>{user.lastName}</Text>
      <Text style={styles.title}>{user.email}</Text>
      <Text style={styles.title}>{user.password}</Text>
      <Text style={styles.title}>{user.rol}</Text>
    </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    color: '#555',
  },
  keyRoom: {
    marginTop: 5,
    color: '#555',
  },
});

export default UserCard;
