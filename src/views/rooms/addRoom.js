import React, { useContext, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import RoomController from "../../controllers/roomControler";
import UserController from "../../controllers/userController";
import { AuthContext } from "../../context/AuthContext";
import ModalSelector from 'react-native-modal-selector';

const AddRoomView = ({isVisible, closeModal}) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const userId = user?.id;
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const usersData = await UserController.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error al buscar los usuarios:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const createRoom = async () => {
    try {
      const userIdToSend = selectedUser ? selectedUser.id : userId;
      const newRoomData = await RoomController.createRoom(name, parseInt(userIdToSend));
      console.log(newRoomData);
      closeModal();
      setName('');
      return newRoomData;
    } catch (error) {
      console.error('Error al crear la sala:', error);
    }
  };

  const handlePressCloseModal = () => {
    setName('');
    setSelectedUser(null);
    closeModal();
  };

  return (
    <Modal
      isVisible={isVisible}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.tagInput}>Nombre de la Sala</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {user.rol === 'admin' && (
          <View>
            <ModalSelector
              data={users}
              keyExtractor={(item) => item.id.toString()}
              labelExtractor={(item) => item.name}
              selectedItemTextStyle={{ color: 'black' }}
              initValue="Selecciona aquí"
              onChange={(option) => setSelectedUser(option)}
              style={styles.drop}
            />
          </View>
        )}

        <View style={styles.haku}>
          <TouchableOpacity onPress={createRoom}>
              <Button style={styles.button} buttonColor='#6a9eda'>
                <Text style={styles.buttonText}>Crear</Text>
              </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressCloseModal}>
            <Button style={styles.button} buttonColor='#f45572'>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  haku: {
    flexDirection: 'row',
  },
  tagInput: {
    fontSize: 20,
    color: 'black',
    marginBottom: 4
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 18,
    borderColor: 'rgba(198,198,199, 0.5)',
    borderWidth: 2,
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
  },
  button: {
    minWidth: 90,    
    marginLeft: 8,
    marginRight: 8  
  },
  buttonText: {
    color: 'black'
  },
  drop:{
    marginBottom: 15,
  }
});

export default AddRoomView;
