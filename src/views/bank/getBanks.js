import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import DeleteBankView from './deleteBank';
import BankController from '../../controllers/bankController';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <View style={styles.titleC}>
          <Text style={styles.title}>{bank.name}</Text>
          <Image
                source={require('../../../assets/materia2.png')}
                style={styles.image}
          />
        </View>
        {user.rol === 'maestro' && (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEnabled}
          value={isEnabled}
        />
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
          <Icon name="delete" size={24} color="white" />
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
    backgroundColor: '#b0c2f2',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    alignItems: 'flex-end',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton:{
    backgroundColor: '#f45572',
    borderRadius: 55,
    padding: 9,
    top: 22,
  },
});

export default BankCard;
