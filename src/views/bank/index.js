import React, { useContext, useEffect, useState } from "react";
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';import AddBankView from "./AddBanks";
import BankCard from "./getBanks";
import BankController from "../../controllers/bankController";
import { AuthContext } from "../../context/AuthContext";

const BanksView = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [banks, setBanks] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchBanks = async (roomId) => {
    try {
      const banksData = await BankController.getAllBanks(roomId);
      setBanks(banksData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchBanks(route.params.roomId);
  }, []);

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
      {user.rol === 'admin' && (
      <Button
        style={styles.button}
        buttonColor='#6a9eda'
        mode="contained"
        onPress={toggleModal}
      >
        <Icon name="add" size={20} color="white" />
      </Button>
      )}
      <AddBankView
        isVisible={isModalVisible}
        roomId={route.params.roomId}
        closeModal={() => {
          toggleModal();
          handleUpdateBank();
        }}
      />
       <FlatList
        data={banks}
        renderItem={({ item }) => (
        <BankCard 
        bank={item} 
        navigation={navigation} 
        handleBankDelete={handleBankDelete}
        />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {banks.length === 0 && <Text>No hay bancos disponibles</Text>}
 
    </View>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginTop: 10,
    width: 70,
    height: 70,
    justifyContent:'center',
    marginLeft: '30%',
    marginRight: 10
  },
})

export default BanksView;