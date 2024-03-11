import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import QuestionController from "../../controllers/questionController";

const AddQuestionView = ({isVisible, bankId, closeModal}) => {
  const [textQuestion, setTextQuestion] = useState('');
  const [textQuestionError, setTextQuestionError] = useState('');

  const validateEmptyFields = () => {
    let isValid = true;
    if (textQuestion.trim() === ''){
      setTextQuestionError('El nombre de la pregunta es requerido');
      isValid = false;
    }

    return isValid;
  }


  const createQuestion = async () => {
    try {

      if (!validateEmptyFields()) {
        return;
      }

      const bankIdInt = parseInt(bankId);

      const newQuestionData = await QuestionController.createNewQuestion(textQuestion, bankIdInt);
 
      console.log(newQuestionData);
      closeModal();
      setTextQuestion('');
      setTextQuestionError('');
      return newQuestionData;
      
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
    }
  };

  const handlePressCloseModal = () => {
    setTextQuestion('');
    setTextQuestionError('');
    closeModal();
  };


  return (
    <Modal
    isVisible={isVisible}
    >

      <View style={styles.modalContainer}>

        <Text style={styles.tagInput}>Pregunta</Text>
        <TextInput
        style={styles.input}
        value={textQuestion}
        onChangeText={setTextQuestion}
        />
        {textQuestionError ? <Text style={styles.error}>{textQuestionError}</Text> : null}

        <View style={styles.haku}>
          <TouchableOpacity onPress={createQuestion}>
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
    width: 90,
    marginLeft: 8,
    marginRight: 8  
  },  
  buttonText: {
    color: 'black'
  }, 
  error: {
    color: 'red',
    marginBottom: 10,
  },
})

export default AddQuestionView;