import React, { useContext, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import { Button } from 'react-native-paper';
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
      console.error('Error al buscar las salas:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  /* useEffect(() => {
    fetchUsers();
  }, []) */

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
})

export default AddRomView;