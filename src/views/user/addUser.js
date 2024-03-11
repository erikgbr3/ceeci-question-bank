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
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmptyFields = () => {
    let isValid = true;
    if (name.trim() === '') {
      setNameError('El nombre es requerido');
      isValid = false;
    }
    if (lastName.trim() === '') {
      setLastNameError('El apellido es requerido');
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError('El correo electrónico es requerido');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    }
    return isValid;
  };

  const validateName = () => {
    const isValid = /^[a-zA-Z]+$/.test(name);
    setNameError(isValid ? '' : 'El nombre solo debe contener letras');
    return isValid;
  };

  const validateLastName = () => {
    const isValid = /^[a-zA-Z]+$/.test(lastName);
    setLastNameError(isValid ? '' : 'El apellido solo debe contener letras');
    return isValid;
  };

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValid ? '' : 'Correo electrónico inválido');
    return isValid;
  };

  const validatePassword = () => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    setPasswordError(isValid ? '' : 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial');
    return isValid;
  };

  const createUser = async () => {
    try {

      if (!validateEmptyFields() || !validateName() || !validateLastName() || !validateEmail() || !validatePassword()) {
        return;
      }
  
      const newUserData = await UserController.createUser(name, lastName, email, password, rol);
 
      console.log(newUserData);
      closeModal();
      setName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRol('');

      setNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
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
      setNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
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
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

        <Text style={styles.tagInput}>Apellido</Text>
        <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        />
        {lastNameError ? <Text style={styles.error}>{lastNameError}</Text> : null}

        <Text style={styles.tagInput}>Email</Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={styles.tagInput}>Password</Text>
        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

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
  error: {
    color: 'red',
    marginBottom: 10,
  },
})

export default AddUserView;