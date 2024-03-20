import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import DeleteQuestionView from './deleteQuestion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QuestionController from '../../controllers/questionController';
import AnswerController from '../../controllers/answerController';
import socketIOClient from 'socket.io-client';

const QuestionCard = ({ question, navigation, user, handleQuestionDelete }) => {

  const [answer, setAnswer] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(question.enabled);

  const socket = socketIOClient(`${BackendConfig.url}`);

  useEffect(() => {
    // Configurar la conexión a Socket.IO
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    // Escuchar el evento 'questionEnabledUpdated' para actualizar el estado 'enabled'
    socket.on('questionEnabledUpdated', (questionId, enabled) => {
      if (questionId === question.id) {
        setIsEnabled(enabled);
      }
    });

    return () => {
      // Desconectar el socket cuando el componente se desmonte
      socket.disconnect();
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchAnswers = async () => {
    try {
      const questionsData = await AnswerController.getAnswer();
      const filteredAnswers = questionsData.filter(answer => answer.questionId === question.id);
      console.log('Respuestas obtenidas:', filteredAnswers);
      setAnswer(filteredAnswers);
      console.log('Cantidad de respuestas:', filteredAnswers.length);
    } catch (error) {
      console.error('Error al buscar las respuestas:', error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

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
          <View style={styles.response}>
          <Text style={styles.userId}>{answer.length} personas han respondido</Text>
        </View>
        )}
        
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
  response: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    right: '45%',
    top: 10,
  },
  switch:{
    top: 22,
    right: '83%',
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
});

export default QuestionCard;
