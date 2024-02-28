import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import OptionController from "../../controllers/optionController";

const AddOptionView = ({isVisible, questionId, closeModal}) => {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [correctA, setCorrectA] = useState('');

  const createOption = async () => {
    try {
      const questionIdInt = parseInt(questionId);
      const newOptionData = await OptionController.createNewOption(option1, option2, option3, correctA, questionIdInt);
 
      console.log(newOptionData);
      closeModal();
      setOption1('');
      setOption2('');
      setOption3('');
      setCorrectA('');
      return newOptionData;
      
    } catch (error) {
      console.error('Error al crear las opciones:', error);
    }
  };

  const handlePressCloseModal = () => {
    setOption1('');
    setOption2('');
    setOption3('');
    setCorrectA('');
    closeModal();
  };


  return (
    <Modal
    isVisible={isVisible}
    >

      <View style={styles.modalContainer}>

        <Text style={styles.tagInput}>Opcion 1</Text>
        <TextInput
        style={styles.input}
        value={option1}
        onChangeText={setOption1}
        />
        <Text style={styles.tagInput}>Opcion 2</Text>
        <TextInput
        style={styles.input}
        value={option2}
        onChangeText={setOption2}
        />
        <Text style={styles.tagInput}>Opcion 3</Text>
        <TextInput
        style={styles.input}
        value={option3}
        onChangeText={setOption3}
        />
        <Text style={styles.tagInput}>Opcion correcta</Text>
        <TextInput
        style={styles.input}
        value={correctA}
        onChangeText={setCorrectA}
        />

        <View style={styles.haku}>
          <TouchableOpacity onPress={createOption}>
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
    width: '90%',
    height: 40,
    fontSize: 18,
    borderColor: 'rgba(198,198,199, 0.5)',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 3,
    padding: 10,
    textAlign: 'center'
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

export default AddOptionView;