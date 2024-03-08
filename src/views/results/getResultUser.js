import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OptionController from '../../controllers/optionController';
import AnswerController from '../../controllers/answerController';

const ResultCardUser = ({option, answer}) => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSDropdownOpen, setSDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
        <View style={[styles.answerContainer]}>
                    <Text style={[styles.textOption, answer.selection === option.correctA ? styles.correctAnswerContainer : styles.incorrectAnswerContainer]}>
                      {answer.selection}
                    </Text>
                    {answer.selection === option.correctA ? (
                      <Text style={styles.feedbackText}>Correcto</Text>
                    ) : (
                      <Text style={styles.feedbackText}>Incorrecto</Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.textOption }>
                      Respuesta Correcta: {option.correctA}
                    </Text>
                  </View>
        </TouchableOpacity>
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
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswerContainer: {
    backgroundColor: '#77dd77',
    flex: 1,
  },
  incorrectAnswerContainer: {
    backgroundColor: '#ff6961',
    flex: 1,
  },
  correctAnswerText: {
    backgroundColor: '#77dd77',
    borderRadius: 12,
    padding: 10,
    color: 'black',
  },
  incorrectAnswerText: {
    backgroundColor: '#ff6961',
    borderRadius: 12,
    padding: 10,
    color: 'black',
  },
  feedbackText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultCardUser;
