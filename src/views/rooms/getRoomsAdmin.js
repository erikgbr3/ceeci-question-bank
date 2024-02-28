import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteRoomView from './deleteRoom';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RoomCard = ({ room, navigation, handleRoomDelete }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: room.id, room: room.name })}
    >
      <View style={{...styles.card}}>
        <View style={styles.titleC}>
          <Text style={styles.title}>{room.name}</Text>
          <Image
            source={require('../../../assets/3771417.png')}
            style={styles.image}
          />
        </View>
      
      <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
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
    backgroundColor: '#b8e4ff',
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
  deleteButton:{
    backgroundColor: '#f45572',
    borderRadius: 55,
    padding: 9,
    top: 22,
  },
});

export default RoomCard;