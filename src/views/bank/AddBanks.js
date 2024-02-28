import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import BankController from "../../controllers/bankController";

const AddBankView = ({isVisible, roomId, closeModal}) => {
  const [name, setName] = useState('');

  const createBank = async () => {
    try {
      const roomIdInt = parseInt(roomId);

      const newBankData = await BankController.createNewBank(name, roomIdInt);
 
      console.log(newBankData);
      closeModal();
      setName('');
      return newBankData;
      
    } catch (error) {
      console.error('Error al crear el banco:', error);
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

        <Text style={styles.tagInput}>Nombre del banco</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        />

        <View style={styles.haku}>
          <TouchableOpacity onPress={createBank}>
              <Button style={styles.button} buttonColor='#6a9eda'>
                <Text  style={styles.buttonText}>Crear</Text>
              </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressCloseModal}>
            <Button style={styles.button} buttonColor='#f45572'>
              <Text  style={styles.buttonText}>Cancelar</Text>
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
    width: 90,
    marginLeft: 8,
    marginRight: 8  
  },  
  buttonText: {
    color: 'black'
  }, 
})

export default AddBankView;