import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { Button } from 'react-native-paper';
import { AuthContext } from "./context/AuthContext";
import BanksView from "./views/bank";
import RoomsView from "./views/rooms";
import QuestionsView from "./views/questions";
import OptionsView from "./views/option";
import CustomMenu from "../components/CustomMenu";
import UsersView from "./views/user";
import ResultView from "./views/results";

const Tab = createNativeStackNavigator();

export default function HomeScreen ({route, navigation}) {

  const { user, logout } = useContext(AuthContext); 
  const [menuVisible, setMenuVisible] = useState(false);

  const userView = () => {
    navigation.navigate('Usuarios')
  }

  const resultView = () => {
    navigation.navigate('Resultados')
  }

  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto de autenticación
    navigation.replace('Login'); // Navega a la pantalla de inicio de sesión
  };

  let actions = [];
  if (user.rol === 'admin') {
    actions = [
      { title: 'Agregar usuario', onPress: userView },
      { title: 'Cerrar sesión', onPress: handleLogout },
    ];
  } else if (user.rol === 'maestro') {
    actions = [
      { title: 'Resultados', onPress: resultView },
      { title: 'Cerrar sesión', onPress: handleLogout },
    ];
  } else if (user.rol === 'usuario') {
    actions = [
    { title: 'Cerrar sesión', onPress: handleLogout }
    ]
  }


return (
  <View style={styles.nav}>
  <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" barStyle="light-content" />
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#9E78EE',
      },
      headerTitleStyle: {
        fontSize: 23
      },
      headerTintColor: 'white',
      headerRight: () => (
        <Button
        style={styles.buttonV}
        onPress={() => setMenuVisible(true)} 
        >
        <Text style={styles.textB}>{user.name}</Text>
        </Button>
            ),
          }}
        >
      <Tab.Screen
          name='Salas'
      >
          {({ navigation }) => <RoomsView navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name= 'Bancos'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 

          title: route.params?.room || 'Bancos',
          animation: 'slide_from_bottom',  
        })}
      >
        {({ navigation, route }) => <BanksView navigation={navigation} route={route} />}
      </Tab.Screen>

      <Tab.Screen
        name= 'Preguntas'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          title: route.params?.bank || 'Preguntas',
          animation: 'slide_from_bottom',  
        })}
      >
        {({ navigation, route}) => <QuestionsView navigation={navigation} route={route}/>}
      </Tab.Screen>

      <Tab.Screen
        name= 'Opciones'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          title: route.params?.question || 'Opciones',
          animation: 'slide_from_bottom',  
        })}
      >
        {({ navigation, route}) => <OptionsView navigation={navigation} route={route}/>}
      </Tab.Screen>

      <Tab.Screen
        name= 'Usuarios'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          animation: 'slide_from_bottom',  
        })}
      >
        {({ navigation, route}) => <UsersView navigation={navigation} route={route}/>}
      </Tab.Screen>

      <Tab.Screen
        name= 'Resultados'
        initialParams={{ ...route.params } }
        options={({ route }) => ({ 
          animation: 'slide_from_bottom',  
        })}
      >
        {({ navigation, route}) => <ResultView navigation={navigation} route={route}/>}
      </Tab.Screen>

  </Tab.Navigator>

  <CustomMenu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      actions={actions}
    />
  </View>
)
} 

const styles = StyleSheet.create({
  nav: {
    flex: 1, //no borrar este 1, ni cambiar, no tocar
  },
  nav2: {
    backgroundColor: 'blue'
  },
  buttonV:{ 
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  textB:{
    color: 'white'
  }
});