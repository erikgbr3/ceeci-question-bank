import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View , Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';import AddBankView from "./AddBanks";
import BankCard from "./getBanks";
import BankController from "../../controllers/bankController";
import { AuthContext } from "../../context/AuthContext";
import BankCardUser from "./getBanksUser";

const BanksView = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [banks, setBanks] = useState([]);
  const [banksUser, setBanksUser] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchBanks = async (roomId) => {
    try {
      const banksData = await BankController.getAllBanks(roomId);
      setBanks(banksData);
    } catch (error) {
      console.error('Error al buscar los bancos:', error);
    }
  };

  const fetchBanksUser = async (roomId, enabled) => {
    try {
      const banksData = await BankController.getAllBanksUser(roomId, enabled);
      const filteredBanks = banksData.filter(bank => bank.enabled === true);
      setBanksUser(filteredBanks);
    } catch (error) {
      console.error('Error al buscar los bancos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBanks(route.params.roomId);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchBanksUser(route.params.roomId, true);
    }, [])
  );

  const handleDataUpdate = () => {
    fetchBanks(route.params.roomId);
    setDataUpdated(false);
  };

  const handleUpdateBank = () => {
    console.log('Before setDataUpdated:', isDataUpdated);
    setDataUpdated(true);
    console.log('After setDataUpdated:', isDataUpdated);
  };

  const handleBankDelete = async () => {
    await fetchBanks();
    setDataUpdated(true);
  };

  useEffect(() => {
    if (isDataUpdated) {
      console.log('handleDataUpdate called');
      handleDataUpdate();
    }
  }, [isDataUpdated]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
    <View style={styles.container2}>
     <ScrollView>
      <View style={styles.buttonC}>
        {(user.rol === 'admin' || user.rol === 'maestro') && (
          <TouchableOpacity 
            style={styles.button}
            buttonColor='#6a9eda'
            mode="contained"
            onPress={toggleModal}
          >
            <Icon name="add" size={30} color="white" />
          </TouchableOpacity>
          )}
        </View>
        <AddBankView
          isVisible={isModalVisible}
          roomId={route.params.roomId}
          closeModal={() => {
            toggleModal();
            handleUpdateBank();
          }}
        />
        {(user.rol === 'admin' || user.rol === 'maestro') && (
          <View style={styles.bankContainer}>
              {banks.map(bank => (
                <BankCard
                  key={bank.id.toString()}
                  bank={bank}
                  user={user}
                  navigation={navigation}
                  handleBankDelete={handleBankDelete}
                />
              ))}
              {banks.length == 0 && <Text>No hay bancos disponibles</Text>}
        </View>
        )}
        
        {user.rol === 'usuario' && (
          <View style={styles.bankContainer}>
              {banksUser.map(bank => (
                <BankCardUser
                  key={bank.id.toString()}
                  bank={bank}
                  navigation={navigation}
                  handleBankDelete={handleBankDelete}
                />
              ))}
              {banks.length == 0 && <Text>No hay bancos disponibles</Text>}
        </View>
        )}
        
      </ScrollView>
    </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E78EE'
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: 'center',
  },
  bankContainer:{
    flex: 1,
  },
  buttonC: {
      position: 'relative', // Cambiar a relativo
      justifyContent: 'center', // Centrar el botón verticalmente
      alignItems: 'center', // Centrar el botón horizontalmente
      marginTop: 20, // Espacio superior
  },
  button: {
    backgroundColor: '#6a9eda',
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
})

export default BanksView;