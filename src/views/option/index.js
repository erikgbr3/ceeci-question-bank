import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View , FlatList, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddOptionView from "./AddOptions";
import OptionCard from "./getOptions";
import OptionController from "../../controllers/optionController";
import { AuthContext } from "../../context/AuthContext";

const OptionsView = ({navigation, route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [isDataUpdated, setDataUpdated] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchOption = async (questionId) => {
    try {
      const optionsData = await OptionController.getAllOptions(questionId);
      setOptions(optionsData);
    } catch (error) {
      console.error('Error al buscar las opciones:', error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      fetchOption(route.params.questionId);
    }, [])
  );

  const handleDataUpdate = () => {
    fetchOption(route.params.questionId);
    setDataUpdated(false);
  };

  const handleUpdateOption = () => {
    console.log('Before setDataUpdated:', isDataUpdated);
    setDataUpdated(true);
    console.log('After setDataUpdated:', isDataUpdated);
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
      {(user.rol === 'admin' || user.rol === 'maestro')&& (
      <Button
        style={styles.button}
        buttonColor='#6a9eda'
        mode="contained"
        onPress={toggleModal}
      >
        <Icon name="add" size={20} color="white" />
      </Button>
    )}
      <AddOptionView
       isVisible={isModalVisible}
       questionId={route.params.questionId}
       closeModal={() => {
         toggleModal();
         handleUpdateOption();
       }}
      />
       <FlatList
        data={options}
        renderItem={({ item }) => <OptionCard 
        option={item} 
        navigation={navigation}
        />}
        keyExtractor={(item) => item.id.toString()}
      />
      {options.length === 0 && <Text>No hay opciones disponibles</Text>}
 
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

export default OptionsView;