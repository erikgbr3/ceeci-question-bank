import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OptionController from '../../controllers/optionController';
import AnswerController from '../../controllers/answerController';

const ResultCard = ({answer}) => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSDropdownOpen, setSDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSDropdown = () => {
    setSDropdownOpen(!isSDropdownOpen);
  };

  return (
    <View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View>
            <Text style={styles.title}>{answer.AnswerUser.name}</Text>
          </View>
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={styles.optionsContainer}>
                  <TouchableOpacity  onPress={toggleSDropdown}>
                    <Text style={styles.textOption }>
                    {answer.selection}
                    </Text>
                  </TouchableOpacity>
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

export default ResultCard;
