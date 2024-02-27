import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DeleteRoomView from './deleteRoom';
import RoomController from '../../controllers/roomControler';

const RoomCardMaster = ({ room, navigation, handleRoomDelete }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(room.enabled);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEnabled = async () => {
    try {
      const updatedRoom = await RoomController.updateEnabled(room.id, !isEnabled);
      setIsEnabled(!isEnabled);
      console.log('Estado Enabled en Room actualizado:', updatedRoom);
    } catch (error) {
      console.error('Error al actualizar el estado Enabled en Room:', error.message);
    }
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: room.id, room: room.name })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{room.id}</Text>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.userId}>User ID: {room.userId}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEnabled}
          value={isEnabled}
        />
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
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default RoomCardMaster;
