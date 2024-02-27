import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddRomView from "./addRoom";
import RoomCardAdmin from "./getRoomsAdmin";
import RoomCardMaster from "./getRoomsMaster";
import RoomController from "../../controllers/roomControler";
import { AuthContext } from "../../context/AuthContext";
import RoomCardUser from "./getRoomsUser";


  const RoomsView = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [roomsAdmin, setRoomsAdmin] = useState([]);
    const [roomsMaster, setRoomsMaster] = useState([]);
    const [roomsUser, setRoomsUser] = useState([]);
    const [isDataUpdated, setDataUpdated] = useState(false);
    const { user } = useContext(AuthContext);

    useFocusEffect(
      React.useCallback(() => {
        fetchRoomsAdmin();
        fetchRoomsMaster(user.id);
        fetchRoomsUser();
      }, [])
    );

    const handleDataUpdate = () => {
      fetchRoomsAdmin();
      fetchRoomsMaster(user.id);
      fetchRoomsUser()
      setDataUpdated(false);
    };

    const handleUpdateRoom = () => {
      setDataUpdated(true);
    };

    useEffect(() => {
      if (isDataUpdated) {
        handleDataUpdate();
      }
    }, [isDataUpdated]);

    const fetchRoomsAdmin = async () => {
      try {
        const roomsData = await RoomController.getAllRoomsAdmin();
        setRoomsAdmin(roomsData);
      } catch (error) {
        console.error('Error al busacar las salas:', error);
      }
    };

    const fetchRoomsMaster = async (userId) => {
      try {
        const roomsData = await RoomController.getAllRooms(userId);
        setRoomsMaster(roomsData);
      } catch (error) {
        console.error('Error al buscar las salas del maestro:', error);
      }
    };

    const fetchRoomsUser = async () => {
      try {
        const roomsData = await RoomController.getAllRoomsUser();
        setRoomsUser(roomsData);
      } catch (error) {
        console.error('Error al busacr las salas para el usuario:', error);
      }
    };

    const handleRoomDelete = async () => {
      await fetchRoomsAdmin();
      await fetchRoomsMaster(user.id);
      await fetchRoomsUser()
      setDataUpdated(true);
    };

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
      <View style={styles.container}> 
        {(user.rol === 'admin'|| user.rol === 'maestro') && (
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

        {user.rol === 'admin' &&(
        <FlatList
          data={roomsAdmin}
          key={`roomsAdmin-${roomsAdmin.id}`}
          renderItem={({ item }) => (
            <RoomCardAdmin
            key={roomsAdmin.id}
              roomsAdmin={item}
              navigation={navigation}
              handleRoomDelete={handleRoomDelete}
            />
          )}
        />
        )}
        {(user.rol === 'admin' && !roomsAdmin.length === 0) && (<Text>No hay Salas disponibles</Text>)}

       {user.rol === 'maestro' &&(
        <FlatList
          data={roomsMaster}
          key={`roomsMaster-${roomsMaster.id}`}
          renderItem={({ item }) => (
            <RoomCardMaster
            key={roomsMaster.id}
              room={item}
              navigation={navigation}
              handleRoomDelete={handleRoomDelete}
            />
          )}
        />
        )}
        {(user.rol === 'maestro' && !roomsMaster.length === 0) && (<Text>No hay Salas disponibles</Text>)}

        {user.rol === 'usuario' &&(
        <FlatList
          data={roomsUser}
          key={`roomsUser-${roomsUser.id}`}
          renderItem={({ item }) => (
            <RoomCardUser
            key={roomsUser.id}
              room={item}
              navigation={navigation}
              handleRoomDelete={handleRoomDelete}
            />
          )}
        />
        )}
        {(user.rol === 'usuario' && !roomsUser.length === 0) && (<Text>No hay Salas disponibles</Text>)}

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