import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserCard = ({ user, navigation }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Nombre: {user.name}</Text>
        <Text style={styles.title}>Apellidos: {user.lastName}</Text>
        <Text style={styles.title}>Correo: {user.email}</Text>
        <Text style={styles.title}>Rol: {user.rol}</Text>
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
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
