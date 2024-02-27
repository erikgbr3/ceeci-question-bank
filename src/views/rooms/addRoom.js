import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import RoomController from "../../controllers/roomControler";
import { AuthContext } from "../../context/AuthContext";

const AddRomView = ({isVisible, closeModal}) => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const userId = user?.id;

  const createRoom = async () => {
    try {
      const userIdInt = parseInt(userId);

      const newRoomData = await RoomController.createRoom(name, parseInt(userId));
 
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