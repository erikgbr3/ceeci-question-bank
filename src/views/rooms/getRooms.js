import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteRoomView from './deleteRoom';

const RoomCard = ({ room, navigation, handleRoomDelete }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: room.id, room: room.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{room.id}</Text>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.userId}>User ID: {room.userId}</Text>
      <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
        <DeleteRoomView 
        room={room} 
        closeModal={toggleModal} 
        isVisible={isModalVisible}
        handleRoomDelete={handleRoomDelete}
        />
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

export default RoomCard;
