import React, { useEffect, useState } from "react";
import { Button, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, View , FlatList, Text, Animated, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddUserView from "./addUser";
import UserCard from "./getUser";
import UserController from "../../controllers/userController";

const UsersView = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDataUpdate = () => {
    fetchUsers();
    setDataUpdated(false);
  };

  const handleUpdateUser = () => {
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

  const fetchUsers = async () => {
    try {
      const usersData = await UserController.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
    <View style={styles.container2}>
        <ScrollView>

        <View style={styles.buttonC}>
          <TouchableOpacity 
            style={styles.button} 
            buttonColor='#6a9eda' 
            mode="contained" 
            onPress={toggleModal}>
                  <Icon name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <AddUserView
          isVisible={isModalVisible}
          closeModal={() => {
            toggleModal();
            handleUpdateUser();
          }}
        />
        <View style={styles.userContainer}>
            {users.map(user => (
              <UserCard 
                key={user.id.toString()} 
                user={user} 
                navigation={navigation} 
              />
            ))}
            {users.length === 0 && <Text>No hay Usuarios</Text>}
        </View>
     </ScrollView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E78EE',
    width: '100%',
  },
  container2:{
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: 'center'
  },
  userContainer:{
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
})

export default UsersView;