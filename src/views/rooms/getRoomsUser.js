import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoomCardUser = ({ room, navigation }) => {

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: room.id, room: room.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{room.id}</Text>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.userId}>User ID: {room.userId}</Text>
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

export default RoomCardUser;
