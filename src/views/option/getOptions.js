import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OptionCard = ({ option, navigation }) => {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.userId}>Question ID: {option.questionId}</Text>
      </View>
      <TouchableOpacity >
        <View style={styles.card}>
        <Text style={styles.userId}>Opcion 1: {option.option1}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
        <Text style={styles.userId}>Opcion 2: {option.option2}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
        <Text style={styles.userId}>Opcion 3: {option.option3}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
        <Text style={styles.userId}>Respuesta Correcta: {option.correctA}</Text>
      </View>
      </TouchableOpacity>
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
  keyRoom: {
    marginTop: 5,
    color: '#555',
  },
});

export default OptionCard;
