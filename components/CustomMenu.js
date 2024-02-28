// CustomMenu.js
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import admin from '../assets/admin.png';
import estudiante from '../assets/estudiante.png';
import maestro from '../assets/maestro.png';

const CustomMenu = ({ visible, onDismiss, actions }) => {

  const obtenerImagen = () => {
    return admin; // Cambia esto según tu necesidad
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onDismiss}
      >
        <View style={styles.menu}>
          <Image
              style={styles.image}
              source={obtenerImagen()}
          />
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                onDismiss();
                action.onPress();
              }}
            >
              <Text style={styles.menuItemText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 18,
    minWidth: 120,
    maxWidth: 200,
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: '#DBCCFB',
    padding: 8,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom:  10,
    marginTop: 5,
    minWidth: 150,
  },
  menuItemText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center'
  },
  image:{
    marginBottom: 10,
    width: 75,
    height: 75,
  },
});

export default CustomMenu;
