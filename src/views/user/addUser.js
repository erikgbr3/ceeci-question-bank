import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { Button,  } from 'react-native-paper';
import Modal from 'react-native-modal';
import UserController from "../../controllers/userController";

const AddUserView = ({isVisible, closeModal}) => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const createUser = async () => {
    try {

      const newUserData = await UserController.createUser(name, lastName, email, password, rol);
 
      console.log(newUserData);
      closeModal();
      setName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRol('');
      return newUserData;
      
    } catch (error) {
      console.error('Error al crear la sala:', error);
    }
  };

  const handlePressCloseModal = () => {
      setName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRol('');
      closeModal();
  };

  return (
    <Modal
    isVisible={isVisible}
    >

      <View style={styles.modalContainer}>

        <Text style={styles.tagInput}>Nombre</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        />

        <Text style={styles.tagInput}>Apellido</Text>
        <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        />

        <Text style={styles.tagInput}>Email</Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        />

        <Text style={styles.tagInput}>Password</Text>
        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        />

        <Text style={styles.tagInput}>Rol</Text>
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[styles.roleButton, rol === 'maestro' && styles.selectedRoleButton]}
            onPress={() => setRol('maestro')}
          >
            <Text>Maestro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, rol === 'usuario' && styles.selectedRoleButton]}
            onPress={() => setRol('usuario')}
          >
            <Text>Usuario</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.haku}>
          <TouchableOpacity onPress={createUser}>
              <Button style={styles.button} buttonColor='#6a9eda'>
                <Text>Crear</Text>
              </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressCloseModal}>
            <Button style={styles.button} buttonColor='#f45572'>
              <Text>Cancelar</Text>
            </Button>
          </TouchableOpacity>
        </View>

      </View>
      
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  haku: {
    flexDirection: 'row',
  },
  tagInput: {
    fontSize: 20,
    color: 'black',
    marginBottom: 4
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 18,
    borderColor: 'rgba(198,198,199, 0.5)',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8  
  },
  roleButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  roleButton: {
    width: 'auto',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(198,198,199, 0.5)',
  },  
  selectedRoleButton: {
    width: 'auto',
    backgroundColor: '#6a9eda',
  },
})

export default AddUserView;