import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const OptionCard = ({ option, navigation }) => {
  return (
    <View>
      <TouchableOpacity >
        <View style={styles.card}>
          <View style={styles.titleC}>
            <Text style={styles.title}>Opcion 1: {option.option1}</Text>
            <Image
                source={require('../../../assets/x.png')}
                style={styles.image}
            />
          </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
          <View style={styles.titleC}>
          <Text style={styles.title}>Opcion 2: {option.option2}</Text>
          <Image
              source={require('../../../assets/x.png')}
              style={styles.image}
          />
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
          <View style={styles.titleC}>
          <Text style={styles.title}>Opcion 3: {option.option3}</Text>
          <Image
              source={require('../../../assets/x.png')}
              style={styles.image}
          />
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity >
        <View style={styles.card}>
          <View style={styles.titleC}>
          <Text style={styles.title}>Respuesta Correcta: {option.correctA}</Text>
          <Image
              source={require('../../../assets/y.png')}
              style={styles.image}
          />
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    minHeight: '20%',
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 50,
    bottom: 12
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
});

export default OptionCard;
