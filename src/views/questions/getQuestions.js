import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteQuestionView from './deleteQuestion';
import OptionController from '../../controllers/optionController';

const QuestionCard = ({ question, navigation, user, handleQuestionDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionLabels] = useState(['A', 'B', 'C', 'D']);
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setSelectedOptions({});
  };

  const shuffleOptions = (option) => {
    // Shuffle the option attributes
    const optionAttributes = ['option1', 'option2', 'option3', 'correctA'];
    for (let i = optionAttributes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [option[optionAttributes[i]], option[optionAttributes[j]]] = [option[optionAttributes[j]], option[optionAttributes[i]]];
    }
    return option;
  };
  

  const toggleOption = (index, property) => {
    const newSelectedOptions = { ...selectedOptions };

    if (!newSelectedOptions[index]) {
      newSelectedOptions[index] = { A: false, B: false, C: false, D: false };
    }

    newSelectedOptions[index][property] = !newSelectedOptions[index][property];

    setSelectedOptions(newSelectedOptions);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user.rol === 'usuario') {
        fetchOptions(question.id);
      }
    }, [user])
  );

  const fetchOptions = async (questionId) => {
    try {
      const optionsData = await OptionController.getAllOptions(questionId);
      const shuffledOptions = optionsData.map(option => shuffleOptions(option));
      setOptions(shuffledOptions);
    } catch (error) {
      console.error('Error al buscar las opciones:', error);
    }
  };

  return (
    <View>
      {user.rol === 'maestro' || user.rol === 'admin' ? (
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
    ) : null}

    {user.rol === 'usuario' && (
      <View style={styles.card}>
          <TouchableOpacity onPress={toggleDropdown}>
            <View >
              <Text style={styles.title}>{question.id}</Text>
              <Text style={styles.title}>{question.textQuestion}</Text>
              <Text style={styles.userId}>Bank ID: {question.bankId}</Text>
            </View>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.card}>
              <Text style={styles.options}>Opciones:</Text>
              {options.map((option, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => toggleOption(index, optionLabels[0])}>
                    <Text style={[styles.textOption, { fontWeight: selectedOptions[index]?.[optionLabels[0]] ? 'bold' : 'normal' }]}>
                      {optionLabels[0]}: {index === 0 ? option['correctA'] : index === 1 ? option['option3'] : index === 2 ? option['option1'] : option['option2']}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleOption(index, optionLabels[1])}>
                    <Text style={[styles.textOption, { fontWeight: selectedOptions[index]?.[optionLabels[1]] ? 'bold' : 'normal' }]}>
                      {optionLabels[1]}: {index === 0 ? option['option3'] : index === 1 ? option['option2'] : index === 2 ? option['correctA'] : option['option1']}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleOption(index, optionLabels[2])}>
                    <Text style={[styles.textOption, { fontWeight: selectedOptions[index]?.[optionLabels[2]] ? 'bold' : 'normal' }]}>
                      {optionLabels[2]}: {index === 0 ? option['option1'] : index === 1 ? option['correctA'] : index === 2 ? option['option2'] : option['option3']}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleOption(index, optionLabels[3])}>
                    <Text style={[styles.textOption, { fontWeight: selectedOptions[index]?.[optionLabels[3]] ? 'bold' : 'normal' }]}>
                      {optionLabels[3]}: {index === 0 ? option['option2'] : index === 1 ? option['option1'] : index === 2 ? option['option3'] : option['correctA']}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

            </View>
          )}
        
      </View>
    )}
     
    </View>
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
  options: {
    fontSize: 16
  },
  textOption: {
    marginTop: 5,
    fontSize: 15,
    color: '#555',
  },
});

export default QuestionCard;
