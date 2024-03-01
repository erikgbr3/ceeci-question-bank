import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DeleteBankView from './deleteBank';
import BankController from '../../controllers/bankController';

const BankCardUser = ({ bank, user, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Preguntas', { bankId: bank.id, bank: bank.name })}
    >
      <View style={styles.card}>
        <View  style={styles.titleC}>
          <Text style={styles.title}>{bank.name}</Text>
          <Image
                source={require('../../../assets/materia2.png')}
                style={styles.image}
          />
        </View>
      </View>
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
});

export default BankCardUser;
