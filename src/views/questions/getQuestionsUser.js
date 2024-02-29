import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import OptionController from '../../controllers/optionController';
import AnswerController from '../../controllers/answerController';

const QuestionCardUser = ({ question, user }) => {
  const [options, setOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const optionLabels = ['A', 'B', 'C', 'D'];

  const shuffleOptions = (option) => {
    const optionAttributes = ['option1', 'option2', 'option3', 'correctA'];
    for (let i = optionAttributes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [option[optionAttributes[i]], option[optionAttributes[j]]] = [
        option[optionAttributes[j]],
        option[optionAttributes[i]],
      ];
    }
    return option;
  };

  const fetchOptions = async (questionId) => {
    try {
      const optionsData = await OptionController.getAllOptions(questionId);
      const shuffledOptions = optionsData.map((option) => shuffleOptions(option));
      setOptions(shuffledOptions);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (index, property) => {
      const newSelectedOptions = {};

    // Deselect previously selected options
      Object.keys(selectedOption).forEach((key) => {
        if (key !== index.toString()) {
          newSelectedOptions[key] = {};
        }
      });

      // Select the new option
      newSelectedOptions[index.toString()] = { [property]: true };

      console.log(newSelectedOptions);

      setSelectedOption(newSelectedOptions);
  };

  const saveAnswer = async () => {
    if (!selectedOption) {
      console.warn('No option selected');
      return;
    }

    const selectedOptionIndex = Object.keys(selectedOption).find(
      (key) =>
        selectedOption[key][optionLabels[0]] ||
        selectedOption[key][optionLabels[1]] ||
        selectedOption[key][optionLabels[2]] ||
        selectedOption[key][optionLabels[3]]
    );

    if (selectedOptionIndex === undefined) {
      console.warn('No option selected');
      return;
    }

    const selectedOptionValue = Object.keys(selectedOption[selectedOptionIndex]).find(
      (key) => selectedOption[selectedOptionIndex][key]
    );

    try {
      await AnswerController.createAnswer(
        user.id,
        question.id,
        options[selectedOptionIndex].id,
        selectedOptionValue
      );
      console.log('Answer saved successfully');
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
            <Text>Bank ID: {question.bankId}</Text>
          </View>
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => selectOption(index, optionLabels[0])}>
                  <Text
                    style={[
                      styles.textOption,
                      { fontWeight: selectedOption[index]?.A ? 'bold' : 'normal' },
                    ]}
                  >
                    {optionLabels[0]}: {option.option1}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectOption(index, optionLabels[1])}>
                  <Text
                    style={[
                      styles.textOption,
                      { fontWeight: selectedOption[index]?.B ? 'bold' : 'normal' },
                    ]}
                  >
                    {optionLabels[1]}: {option.option2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectOption(index, optionLabels[2])}>
                  <Text
                    style={[
                      styles.textOption,
                      { fontWeight: selectedOption[index]?.C ? 'bold' : 'normal' },
                    ]}
                  >
                    {optionLabels[2]}: {option.option3}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectOption(index, optionLabels[3])}>
                  <Text
                    style={[
                      styles.textOption,
                      { fontWeight: selectedOption[index]?.D ? 'bold' : 'normal' },
                    ]}
                  >
                    {optionLabels[3]}: {option.correctA}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <Button title="Guardar" onPress={saveAnswer} disabled={!selectedOption} />
          </View>
        )}
      </View>
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
  optionsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  textOption: {
    marginTop: 5,
    fontSize: 15,
    color: '#555',
  },
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
