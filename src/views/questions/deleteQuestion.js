import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, Modal, View, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import QuestionController from "../../controllers/questionController";

const DeleteQuestionView = ( { question, isVisible, closeModal, handleQuestionDelete } ) => {

  const deleteQuestion = async () => {
    try {
      const deleteRoomData = await QuestionController.deleteOneQuestion(question.id);
 
      console.log(deleteRoomData);
      closeModal();
      handleQuestionDelete();
      return deleteRoomData;
      
      
    } catch (error) {
      console.error('Error al borrar la pregunta:', error);
    }
  };


  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={closeModal}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '100%', padding: 5 }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Quieres Eliminar a {question.name}?</Text>
        </View>
        <View>
          <Button style={styles.button} buttonColor='#f45572' onPress={deleteQuestion}>
            <Text style={[styles.modalOption, { color: 'white', fontSize: 20, fontWeight: 'bold' }]}>Si, Eliminar</Text>
          </Button>
          <Button style={styles.button} buttonColor='#6a9eda' onPress={() => { closeModal(null) }}>
            <Text style={[styles.modalOption, { color: 'white' }]}>Cancelar</Text>
          </Button>
        </View>
      </View>
    </View>
  </Modal>
)
}

export default DeleteQuestionView;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 10
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 10,
    width: '100%',
  },
  modalOption: {
    fontSize: 18,
    marginBottom: 1,
  },
  button: {
    width: 'auto',
    margin: 2,
    marginLeft: 8,
    marginRight: 8
}
});