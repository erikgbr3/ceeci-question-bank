import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OptionController from '../../controllers/optionController';
import AnswerController from '../../controllers/answerController';

const QuestionCardUserSecond = ({ question, user }) => {
  const [options, setOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAnswerSaved, setIsAnswerSaved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const optionLabels = ['A', 'B', 'C'];

  const fetchOptions = async (questionId) => {
    try {
      const optionsData = await OptionController.getAllOptions(questionId);
      setOptions(optionsData);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (index, property) => {
    const selectedValue = options[index][property];
    console.log('Selected option value:', selectedValue);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [index]: selectedValue,
    }));
  };

  const saveAnswer = async () => {
    try {
       // Obtener el id de la opción seleccionada
       const selectedOption = options.find((option, index) => selectedOptions[index]);
       if (!selectedOption) {
         console.error('No option selected');
         return;
       }
       const optionId = selectedOption.id;
       const selection = selectedOptions[options.findIndex((option, index) => selectedOptions[index])];

    // Guardar la resp
      await AnswerController.createAnswer(user.id, question.id, optionId, selection);
      console.log('Respuesta Gurdada');
      setIsAnswerSaved(true);
      setShowMessage(true);
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchOptions(question.id);
    }, [])
  );

  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View>
            <Text style={styles.title}>{question.textQuestion}</Text>
          </View>
        </TouchableOpacity>
        {isDropdownOpen && (
  <View style={styles.optionsContainer}>
    {options.map((option, index) => (
      <View key={index}>
        <TouchableOpacity onPress={() => selectOption(index, 'option1')}>
          <Text
            style={[
              styles.textOption,
              { fontWeight: selectedOptions[index] === option.option1 ? 'bold' : 'normal' },
            ]}
          >
            A: {option.option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectOption(index, 'option2')}>
          <Text
            style={[
              styles.textOption,
              { fontWeight: selectedOptions[index] === option.option2 ? 'bold' : 'normal' },
            ]}
          >
            B: {option.option2}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectOption(index, 'option3')}>
          <Text
            style={[
              styles.textOption,
              { fontWeight: selectedOptions[index] === option.option3 ? 'bold' : 'normal' },
            ]}
          >
            C: {option.option3}
          </Text>
        </TouchableOpacity>
        {showMessage && (
          <Text style={styles.message}>¡Respuesta guardada con éxito!</Text>
        )}
      </View>
    ))}
    <View style={styles.saveC}>
      <TouchableOpacity
        style={[styles.save, isAnswerSaved && styles.saveDisabled]}
        onPress={saveAnswer}
        disabled={isAnswerSaved}
      >
        <Text style={styles.saveT}>Guardar</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  optionsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 10,
  },
  textOption: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
    borderWidth: .3,
    borderColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: 'green',
  },
  saveC:{
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  save:{
    backgroundColor: '#a3ffac',
    alignItems: 'center',
    width: '60%',
    borderRadius: 12,
    borderWidth: .3,
    borderColor: 'black'
  },
  saveDisabled: {
    backgroundColor: 'gray',
  },
  saveT:{
    fontSize: 16,
    padding: 8,
    color: 'black'
  }
});

export default QuestionCardUserSecond;
