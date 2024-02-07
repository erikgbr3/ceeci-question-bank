import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Alert, Image } from "react-native"
import { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';


const LoginView = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      
    } catch (error) {
      console.log('Error', error);
    }
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.loginContainer}>

        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Inicia Sesion</Text>
        </View>

          <Text style={styles.tagInput}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="abc@xyz.com"
            onChangeText={(text) => { setAuthProp('email', text) }}
            value='hola'
          />
          {/* {errors?.email ? (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
          ) : null} */}
          <Text style={styles.tagInput}>Contraseña</Text>
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              onChangeText={(text) => { setAuthProp('password', text) }}
              value='hola'
            />
            {/*  {errors?.password ? (
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            ) : null} */}
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)} 
              style={styles.showPassword}>
              <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={30} color="#1B6BC1" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.login, { backgroundColor: ('email' && 'password') ? '#1B6BC1' : '#c2dbf5' }]}
            /* disabled={!auth.email || !auth.password} */ 
            onPress={handleLogin}>
            <Text 
            style={[styles.loginText, {color: ('email' && 'password') ? "white" : "#154e8f"}]}
            >Iniciar Sesión</Text>
          </TouchableOpacity>
          <View style={styles.moreOptions}>
            <Text style={styles.moreOptionsText}>O Inicia Sesión Como Invitado</Text>
          </View>
          <View style={styles.socialMedia}>
            <TouchableOpacity style={styles.invitado} onPress={() => { navigation.navigate('Main') }}>
              <Text style={styles.invitadoText}>Modo Invitado</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text}>¿No tienes una cuenta?
              <Text style={styles.enlace} onPress={() => { navigation.navigate('sign up') }}> Regístrate Aquí</Text>
            </Text>
          </View>
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
  footer: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center"
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