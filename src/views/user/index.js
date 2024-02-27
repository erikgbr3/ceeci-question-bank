import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Button,} from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddUserView from "./addUser";
import UserCard from "./getUser";
import UserController from "../../controllers/userController";

const UsersView = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
    fetchUsers();
    }, [])
  );

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
      const usersData = await UserController.getAllUsersAdmin();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
      <Button style={styles.button} buttonColor='#6a9eda' mode="contained" onPress={toggleModal}>
              <Icon name="add" size={20} color="white" />
      </Button>
      <AddUserView
        isVisible={isModalVisible}
        closeModal={() => {
          toggleModal();
          handleUpdateUser();
        }}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
      />
      {users.length === 0 && <Text>No hay Usuarios</Text>}
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

export default UsersView;