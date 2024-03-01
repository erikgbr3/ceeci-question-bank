import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoomCardUser = ({ room, navigation }) => {

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Bancos', { roomId: room.id, room: room.name })}
    >
      <View style={styles.card}>
        <View style={styles.titleC}>
          <Text style={styles.title}>{room.name}</Text>
          <Image
                source={require('../../../assets/3771417.png')}
                style={styles.image}
            />
        </View>
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b8e4ff',
    borderRadius: 13,
    padding: 10,
    margin: 10,
    alignItems: 'flex-end',
    
  },
  image:{
    width: 50,
    height: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    marginTop: 5,
    color: '#555',
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

export default RoomCardUser;
