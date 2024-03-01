import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OptionController from '../../controllers/optionController';
import AnswerController from '../../controllers/answerController';

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const QuestionCardUser = ({ question, user }) => {
  const [options, setOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAnswerSaved, setIsAnswerSaved] = useState(false);

  const optionLabels = ['A', 'B', 'C', 'D'];

  const shuffleOptions = (option) => {
    const shuffledOption = {};
    const keys = Object.keys(option).filter(key => key.startsWith('option') || key.startsWith('correct'));
    shuffleArray(keys).forEach((key, index) => {
      shuffledOption[`option${index + 1}`] = option[key];
    });
    shuffledOption.id = option.id; 
    return shuffledOption;
  };

  const fetchOptions = async (questionId) => {
    try {
      const optionsData = await OptionController.getAllOptions(questionId);
      setOptions(optionsData.map(option => shuffleOptions(option)));
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
                {optionLabels.map((label, labelIndex) => (
                  <TouchableOpacity key={labelIndex} onPress={() => selectOption(index, `option${labelIndex + 1}`)}>
                    <Text
                      style={[
                        styles.textOption,
                        { fontWeight: selectedOptions[index] === option[`option${labelIndex + 1}`] ? 'bold' : 'normal' },
                      ]}
                    >
                      {label}: {option[`option${labelIndex + 1}`]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={styles.saveC} >
              <TouchableOpacity style={styles.save} onPress={saveAnswer} disabled={isAnswerSaved}>
                    <Text style={styles.saveT} >Guardar</Text>
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
  saveT:{
    fontSize: 16,
    padding: 8,
    color: 'black'
  }
});

/* const styles = StyleSheet.create({
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
  options: {
    fontSize: 16
  },
  textOption: {
    marginTop: 5,
    fontSize: 15,
    color: '#555',
  },
}); */

export default QuestionCardUser;
