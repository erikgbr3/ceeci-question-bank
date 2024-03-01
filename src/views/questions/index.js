import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View , Image, Text, TouchableOpacity, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddQuestionView from "./AddQuestions";
import QuestionCard from "./getQuestions";
import QuestionController from "../../controllers/questionController";
import { AuthContext } from "../../context/AuthContext";
import QuestionCardUser from "./getQuestionsUser";

const QuestionsView = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsUser, setQuestionsUser] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchQuestions = async (bankId) => {
    try {
      const questionsData = await QuestionController.getAllQuestion(bankId);
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error al buscar las preguntas:', error);
    }
  };

  const fetchQuestionsUser = async (bankId, enabled) => {
    try {
      const questionData = await QuestionController.getAllQuestionsUser(bankId, enabled);
      const filteredQuestions = questionData.filter(question => question.enabled === true);
      setQuestionsUser(filteredQuestions);
    } catch (error) {
      console.error('Error al buscar los bancos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestions(route.params.bankId);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionsUser(route.params.bankId, true);
    }, [])
  );

  const handleDataUpdate = () => {
    fetchQuestions(route.params.bankId);
    setDataUpdated(false);
  };

  const handleUpdateQuestion = () => {
    console.log('Before setDataUpdated:', isDataUpdated);
    setDataUpdated(true);
    console.log('After setDataUpdated:', isDataUpdated);
  };

  const handleQuestionDelete = async () => {
    await fetchQuestions();
    setDataUpdated(true);
  };

  useEffect(() => {
    if (isDataUpdated) {
      console.log('handleDataUpdate called');
      handleDataUpdate();
    }
  }, [isDataUpdated]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
    <View style={styles.container2}>
      <ScrollView>
        <View  style={styles.buttonC}>
          {(user.rol === 'admin' || user.rol === 'maestro') && (
            <TouchableOpacity
              style={styles.button}
              buttonColor='#6a9eda'
              mode="contained"
              onPress={toggleModal}
            >
              <Icon name="add" size={30} color="white" />
            </TouchableOpacity>
          )}
        </View>
      
      <AddQuestionView
        isVisible={isModalVisible}
        bankId={route.params.bankId}
        closeModal={() => {
          toggleModal();
          handleUpdateQuestion();
      }}
      />

      {(user.rol === 'admin' || user.rol === 'maestro') && (
        <View style={styles.questionContainer}>
              {questions.map(question =>(
                <QuestionCard
                  key={question.id.toString()}
                  question={question}
                  user={user}
                  navigation={navigation}
                  handleQuestionDelete={handleQuestionDelete}
                  style={styles.questionCard} 
                />
              ))}
                {questions == 0 && 
                  <View style={styles.ContainerV}>
                  <Text style={styles.text}>
                    No hay preguntas disponibles
                  </Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/cat3.gif')}
                      style={styles.image2}
                    /> 
                  </View>
                </View>
                }
        </View>
      )}
        
        {user.rol === 'usuario' && (
          <View style={styles.questionContainer}>
              {questionsUser.map(question =>(
                <QuestionCardUser
                  key={question.id.toString()}
                  question={question}
                  user={user}
                  navigation={navigation}
                  handleQuestionDelete={handleQuestionDelete}
                  style={styles.questionCard} 
                />
              ))}
                {questionsUser == 0 && 
                  <View style={styles.ContainerV}>
                  <Text style={styles.text}>
                    No hay preguntas disponibles
                  </Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/cat3.gif')}
                      style={styles.image2}
                    /> 
                  </View>
                </View>
                }
        </View>
        )}
        
      </ScrollView>
    </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E78EE'
  },
  container2:{
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  buttonC: {
    position: 'relative', // Cambiar a relativo
    justifyContent: 'center', // Centrar el botón verticalmente
    alignItems: 'center', // Centrar el botón horizontalmente
    marginTop: 20, // Espacio superior
  },
  button: {
    backgroundColor: '#6a9eda',
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  questionCard: {
    width: '48%', // Ajustamos el ancho para ocupar casi la mitad del contenedor con un pequeño espacio entre ellas
    marginBottom: 10,
  },
  ContainerV: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image2: {
    width: 250,
    height: 250,
  },
})

export default QuestionsView;