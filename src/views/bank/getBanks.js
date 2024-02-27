import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DeleteBankView from './deleteBank';
import BankController from '../../controllers/bankController';

const BankCard = ({ bank, user, navigation, handleBankDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(bank.enabled);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEnabled = async () => {
    try {
      const updatedBank = await BankController.updateEnabled(bank.id, !isEnabled);
      setIsEnabled(!isEnabled);
      console.log('Estado Enabled en Bank actualizado:', updatedBank);
    } catch (error) {
      console.error('Error al actualizar el estado Enabled en Bank:', error.message);
    }
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Preguntas', { bankId: bank.id, bank: bank.name })}
    >
      <View style={styles.card}>
      <Text style={styles.title}>{bank.id}</Text>
      <Text style={styles.title}>{bank.name}</Text>
      <Text style={styles.userId}>Room ID: {bank.roomId}</Text>
      {user.rol === 'maestro' && (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEnabled}
          value={isEnabled}
        />
      )}
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
