import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteQuestionView from './deleteQuestion';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.titleC}>
          <Text style={styles.title}>{question.textQuestion}</Text>
          <Image
              source={require('../../../assets/pregunta.png')}
              style={styles.image}
          />                
        </View>

      <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
        <Icon name="delete" size={24} color="white" />
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
    backgroundColor: '#84b6f4',
    borderRadius: 13,
    padding: 2,
    margin: 10,
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  image:{
    width: 50,
    height: 50,
  },
  titleC:{
    top: 10 ,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
    width: '60%',
    fontSize: 17,
  },
  deleteButton:{
    backgroundColor: '#f45572',
    borderRadius: 55,
    padding: 9,
    top: 22,
  },
});

export default QuestionCard;
