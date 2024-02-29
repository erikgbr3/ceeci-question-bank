import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import DeleteRoomView from './deleteRoom';
import RoomController from '../../controllers/roomControler';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.titleC}>
          <Text style={styles.title}>{room.name}</Text>
            <Image
                source={require('../../../assets/materia2.png')}
                style={styles.image}
            />
            
          </View>
          <Switch
              style={styles.switch}
              trackColor={{ false: "black", true: "#77dd77" }}
              thumbColor={isEnabled ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleEnabled}
              value={isEnabled}
          />      
        <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={toggleModal}>
          <Icon name="delete" size={24} color="white" />
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
    backgroundColor: '#b0c2f2',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    alignItems: 'flex-end',
  },
  image:{
    width: 50,
    height: 50,
  },
  titleC:{
    top: 10 ,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
    width: '60%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f45572',
    borderRadius: 55,
    padding: 9,
    top: 22,
  },
  switch:{
    top: 22,
    right: 210,
  }
});

export default RoomCardMaster;
