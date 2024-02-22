import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteRoomView from './deleteRoom';

const RoomCardAdmin = ({ roomsAdmin, navigation, handleRoomDelete }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: roomsAdmin.id, room: roomsAdmin.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{roomsAdmin.id}</Text>
      <Text style={styles.title}>{roomsAdmin.name}</Text>
      <Text style={styles.title}>{roomsAdmin.enabled}</Text>
      <Text style={styles.userId}>User ID: {roomsAdmin.userId}</Text>
      <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
        <DeleteRoomView 
        room={roomsAdmin} 
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

export default RoomCardAdmin;
