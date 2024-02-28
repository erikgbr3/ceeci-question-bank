import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View , FlatList, Text, Image, ScrollView } from "react-native";
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
      <AddOptionView
       isVisible={isModalVisible}
       questionId={route.params.questionId}
       closeModal={() => {
         toggleModal();
         handleUpdateOption();
       }}
      />
      <View style={styles.optionContainer}>
          {options.map(option => (
            <OptionCard
              key={option.id.toString()}
              option={option}
              navigation={navigation}
            />
          ))}
      </View>
      {options.length === 0 && 
        <View style={styles.ContainerV}>
          <Text style={styles.text}>
            No hay preguntas disponibles
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/cat6.gif')}
              style={styles.image2}
            /> 
          </View>
        </View>
      }
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
  container2:{
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: '22',
    borderTopRightRadius: '22',
  },
  buttonC: {
    position: 'relative', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20, 
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
  image: {
    width: 120,
    height: 120,
  },
  ContainerV: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image2: {
    width: 320,
    height: 320,
  },
})

export default OptionsView;