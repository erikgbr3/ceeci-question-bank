import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View , Text, TouchableOpacity, ScrollView, RefreshControl, Image} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddRomView from "./addRoom";
import RoomCardAdmin from "./getRoomsAdmin";
import RoomCardMaster from "./getRoomsMaster";
import RoomController from "../../controllers/roomControler";
import { AuthContext } from "../../context/AuthContext";
import RoomCardUser from "./getRoomsUser";


  const RoomsView = ({navigation, onRoomIdReceived}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [roomsAdmin, setRoomsAdmin] = useState([]);
    const [roomsMaster, setRoomsMaster] = useState([]);
    const [roomsUser, setRoomsUser] = useState([]);
    const [isDataUpdated, setDataUpdated] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { user } = useContext(AuthContext);

    const passRoomId = (roomId) => {
      route.params?.onRoomIdReceived(roomId);
    };
  

    useFocusEffect(
      React.useCallback(() => {
        fetchRoomsAdmin();
        fetchRoomsMaster(user.id);
        fetchRoomsUser();
      }, [])
    );

    const handleRefresh = async () => {
      console.log('Refrescando salas...');
      setIsRefreshing(true);
      try {
        await fetchRoomsAdmin();
        await fetchRoomsMaster(user.id);
        await fetchRoomsUser();
      } catch (error) {
        console.error('Error al refrescar las salas:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

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
      <View style={styles.container2}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <View style={styles.buttonC}>
            {(user.rol === 'admin' || user.rol === 'maestro')&& (
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

          {user.rol === 'admin' && (
            <View style={styles.roomContainer}>
                {roomsAdmin.map(room => (
                  <RoomCardAdmin
                    key={room.id.toString()}
                    room={room}
                    navigation={navigation}
                    handleRoomDelete={handleRoomDelete}
                  />
                ))}
                {roomsAdmin.length === 0 && 
                <View style={styles.ContainerV}>
                  <Text style={styles.text}>
                    No hay salas disponibles
                  </Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/box.gif')}
                      style={styles.image2}
                    /> 
                  </View>
                </View>
                }
          </View>
          )}
          
          {user.rol === 'maestro' && (
            <View style={styles.roomContainer}>
                {roomsMaster.map(room => (
                  <RoomCardMaster
                    key={room.id.toString()}
                    room={room}
                    navigation={navigation}
                    handleRoomDelete={handleRoomDelete}
                  />
                ))}
                {roomsMaster.length === 0 && 
                <View style={styles.ContainerV}>
                <Text style={styles.text}>
                  No hay salas disponibles
                </Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../../assets/box.gif')}
                    style={styles.image2}
                  /> 
                </View>
              </View>}
          </View>
          )}
          
          {user.rol === 'usuario' && (
            <View style={styles.roomContainer}>
                {roomsUser.map(room => (
                  <RoomCardUser
                    key={room.id.toString()}
                    room={room}
                    navigation={navigation}
                    handleRoomDelete={handleRoomDelete}
                  />
                ))}
                {roomsUser.length === 0 && 
                <View style={styles.ContainerV}>
                  <Text style={styles.text}>
                    No hay salas disponibles
                  </Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/box.gif')}
                      style={styles.image2}
                    /> 
                  </View>
                </View>}
          </View>
          )}
          
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
    ContainerV: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: 30,
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
    },
    imageContainer: {
      position: 'relative',
    },
    image2: {
      width: 250,
      height: 250,
    },
  });

  export default RoomsView;
