import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Alert, Image } from "react-native"
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const LoginView = ({navigation}) => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginPress = async () => {
    const result = await login(email, password);
    if (result.success) {
      navigation.replace('Main');
    } else {
      Alert.alert('Error', result.error);
    }
  };
  
  
  return (
    <View style={styles.container}>

      <View style={styles.loginContainer}>

        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Inicia Sesion</Text>
        </View>

          <Text style={styles.tagInput}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="abc@xyz.com"
            onChangeText={setEmail}
          />

          <Text style={styles.tagInput}>Contraseña</Text>
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />

            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)} 
              style={styles.showPassword}>
              <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={30} color="#1B6BC1" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.login, { backgroundColor: (email && password) ? '#1B6BC1' : '#c2dbf5' }]}
            /* disabled={!auth.email || !auth.password} */ 
            onPress={handleLoginPress}>
            <Text 
            style={[styles.loginText, {color: (email && password) ? "white" : "#154e8f"}]}
            >Iniciar Sesión</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    height: "100%",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 200
  },
  titleContainer: {
    alignItems: 'center',
    paddingEnd: 30
  },
  textTitle: {
    fontSize: 26,
  },
  passwordContainer: {
    alignItems: 'center'
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
  showPassword: {
    position: 'absolute',
    paddingTop: 3,
    right: 30
  },
  login: {
    backgroundColor: '#1B6BC1',
    borderRadius: 20,
    marginTop: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  invitado: {
    backgroundColor: '#277dd0',
    borderRadius: 20,
    marginTop: 10,
    height: 40,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  invitadoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagInput: {
    fontSize: 20,
    color: "gray",
    marginBottom: 4
  },
  icon: {
    width: 40,
    height: 40,
  },
  moreOptions: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  moreOptionsText: {
    fontSize: 18,
    color: '#154477',
    fontWeight: '500'
  },
  socialMedia: {
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  text: {
    fontSize: 16
  },
  enlace: {
    color: "#1B6BC1",
    fontWeight: "800"
  }
});

export default LoginView;