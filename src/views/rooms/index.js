import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddRomView from "./addRoom";
import RoomCard from "./getRooms";
import RoomController from "../../controllers/roomControler";
import { AuthContext } from "../../context/AuthContext";

const RoomsView = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDataUpdate = () => {
    fetchRooms();
    setDataUpdated(false);
  };

  const handleUpdateRoom = () => {
    console.log('Before setDataUpdated:', isDataUpdated);
    setDataUpdated(true);
    console.log('After setDataUpdated:', isDataUpdated);
  };

  useEffect(() => {
    if (isDataUpdated) {
      console.log('handleDataUpdate called');
      handleDataUpdate();
    }
  }, [isDataUpdated]);

  const fetchRooms = async () => {
    try {
      const roomsData = await RoomController.getAllRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomDelete = async () => {
    await fetchRooms();
    setDataUpdated(true);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}> 
      {user.rol === 'admin' && (
      <Button
        style={styles.button}
        buttonColor='#6a9eda'
        mode="contained"
        onPress={toggleModal}
      >
        <Icon name="add" size={20} color="white" />
      </Button>
    )}
      <AddRomView
        isVisible={isModalVisible}
        closeModal={() => {
          toggleModal();
          handleUpdateRoom();
        }}
      />

      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <RoomCard
            room={item}
            navigation={navigation}
            handleRoomDelete={handleRoomDelete}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {rooms.length === 0 && <Text>No hay habitaciones disponibles</Text>}
    </View> 
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginTop: 10,
    width: 70,
    height: 70,
    justifyContent:'center',
    marginLeft: '30%',
    marginRight: 10
  },
})

export default RoomsView