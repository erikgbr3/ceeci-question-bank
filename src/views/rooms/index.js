import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View , Text, TouchableOpacity, ScrollView,} from "react-native";
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
      <View style={styles.container2}>
        <ScrollView>
          <View style={styles.buttonC}>
            {user.rol === 'admin' && (
              <TouchableOpacity
                style={styles.button}
                buttonColor='#6a9eda'
                mode="contained"
                onPress={toggleModal}
              >
                <Icon name="add" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <AddRomView
            isVisible={isModalVisible}
            closeModal={() => {
              toggleModal();
              handleUpdateRoom();
            }}
          />
          <View style={styles.roomContainer}>
                {rooms.map(room => (
                  <RoomCard
                    key={room.id.toString()}
                    room={room}
                    navigation={navigation}
                    handleRoomDelete={handleRoomDelete}
                  />
                ))}
                {rooms.length === 0 && <Text>No hay habitaciones disponibles</Text>}
          </View>
        </ScrollView>
      </View>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E78EE'
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  roomContainer: {
    flex: 1,
  },
  buttonC: {
    position: 'relative', // Cambiar a relativo
    justifyContent: 'center', // Centrar el botón verticalmente
    alignItems: 'center', // Centrar el botón horizontalmente
    marginTop: 20, // Espacio superior
  },
  button: {
    backgroundColor: '#6a9eda',
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default RoomsView;
