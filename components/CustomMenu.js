// CustomMenu.js
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomMenu = ({ visible, onDismiss, actions }) => {
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
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
    maxWidth: 200,
  },
  menuItem: {
    padding: 8,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default CustomMenu;
