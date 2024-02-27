import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteBankView from './deleteBank';

const BankCard = ({ bank, navigation, handleBankDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Preguntas', { bankId: bank.id, bank: bank.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{bank.id}</Text>
      <Text style={styles.title}>{bank.name}</Text>
      <Text style={styles.userId}>Room ID: {bank.roomId}</Text>
      <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.deleteButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
        <DeleteBankView
        bank={bank} 
        closeModal={toggleModal} 
        isVisible={isModalVisible}
        handleBankDelete={handleBankDelete}
        />
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

export default BankCard;
