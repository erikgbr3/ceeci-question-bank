import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import DeleteQuestionView from './deleteQuestion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QuestionController from '../../controllers/questionController';

const QuestionCard = ({ question, navigation, user, handleQuestionDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(question.enabled);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEnabled = async () => {
    try {
      const updatedQuestion = await QuestionController.updateEnabled(question.id, !isEnabled);
      setIsEnabled(!isEnabled);
      console.log('Estado Enabled en Question actualizado:', updatedQuestion);
    } catch (error) {
      console.error('Error al actualizar el estado Enabled en Question:', error.message);
    }
  };
  
  return (
    <View>

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
        {user.rol === 'maestro' && (
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#77dd77" }}
          thumbColor={isEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEnabled}
          value={isEnabled}
          animated={false}
        />
      )}
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
     
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#84b6f4',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    alignItems: 'flex-end',
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
  titleC:{
    top: 10 ,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image:{
    width: 50,
    height: 50,
  },
  userId: {
    marginTop: 5,
    color: '#555',
  },
  options: {
    fontSize: 16
  },
  textOption: {
    marginTop: 5,
    fontSize: 15,
    color: '#555',
  },
  image:{
    width: 50,
    height: 50,
  },
  deleteButton:{
    backgroundColor: '#f45572',
    borderRadius: 55,
    padding: 9,
    top: 20,
  },
  switch:{
    top: 22,
    right: '83%',
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }
});




export default QuestionCard;
