import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Modal from 'react-native-modal';
import RoomController from "../../controllers/roomControler";
import UserController from "../../controllers/userController";
import { AuthContext } from "../../context/AuthContext";

const AddRomView = ({isVisible, closeModal}) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const userId = user?.id;
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchUsers = async () => {
    try {
      const roomsData = await UserController.getAllUsers();
      setUsers(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(()=> {
    fetchUsers();
  },[])

  const createRoom = async () => {
    try {

      const userIdToSend = selectedUserId || userId;

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
            <SelectDropdown
              data={users}
              defaultButtonText='Selecciona aquí'
              onSelect={(selectedItem, index) => {
                if(selectedItem){
                  setSelectedUserId(selectedItem.id);
                  console.log(selectedItem.id);
                } else {
                  console.log("alerta de error");  
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
            />
          </View>
        )}

        <View style={styles.haku}>
          <TouchableOpacity onPress={createRoom}>
              <Button style={styles.button} buttonColor='#6a9eda'>
                <Text>Crear</Text>
              </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressCloseModal}>
            <Button style={styles.button} buttonColor='#f45572'>
              <Text>Cancelar</Text>
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
    borderRadius: 10,
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
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8  
  },  
})

export default AddRomView;