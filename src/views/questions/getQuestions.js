import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteQuestionView from './deleteQuestion';

const QuestionCard = ({ question, navigation, handleQuestionDelete }) => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Opciones', { questionId: question.id, question: question.textQuestion })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{question.id}</Text>
      <Text style={styles.title}>{question.textQuestion}</Text>
      <Text style={styles.userId}>Bank ID: {question.bankId}</Text>
      <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
        <DeleteQuestionView
        question={question} 
        closeModal={toggleModal} 
        isVisible={isModalVisible}
        handleQuestionDelete={handleQuestionDelete}
        />
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    color: '#555',
  },
  keyRoom: {
    marginTop: 5,
    color: '#555',
  },
});

export default QuestionCard;
