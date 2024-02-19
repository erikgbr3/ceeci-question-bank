import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddQuestionView from "./AddQuestions";
import QuestionCard from "./getQuestions";
import QuestionController from "../../controllers/questionController";
import { AuthContext } from "../../context/AuthContext";

const QuestionsView = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchQuestions = async (bankId) => {
    try {
      const questionsData = await QuestionController.getAllQuestion(bankId);
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions(route.params.bankId);
  }, []);

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
      {user.rol === 'admin' && (
      <Button
        style={styles.button}
        buttonColor='#6a9eda'
        mode="contained"
        onPress={toggleModal}
      >
        <Icon name="add" size={20} color="white" />
      </Button>
    )}
      <AddQuestionView
        isVisible={isModalVisible}
        bankId={route.params.bankId}
        closeModal={() => {
          toggleModal();
          handleUpdateQuestion();
      }}
      />
       <FlatList
        data={questions}
        renderItem={({ item }) => (
        <QuestionCard 
        question={item} 
        navigation={navigation}
        handleQuestionDelete={handleQuestionDelete}
        />
      )}
        keyExtractor={(item) => item.id.toString()}
      />
      {questions.length === 0 && <Text>No hay preguntas disponibles</Text>}
 
    </View>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginTop: 10,
    width: 70,
    height: 70,
    justifyContent:'center',
    marginLeft: '30%',
    marginRight: 10
  },
})

export default QuestionsView;