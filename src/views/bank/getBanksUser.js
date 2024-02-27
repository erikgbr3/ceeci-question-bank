import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DeleteBankView from './deleteBank';
import BankController from '../../controllers/bankController';

const BankCardUser = ({ bank, user, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Preguntas', { bankId: bank.id, bank: bank.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{bank.id}</Text>
      <Text style={styles.title}>{bank.name}</Text>
      <Text style={styles.userId}>Room ID: {bank.roomId}</Text>
      </View>
    </TouchableOpacity>
    
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

export default BankCardUser;
