import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "./context/AuthContext";
import BanksView from "./views/bank";
import RoomsView from "./views/rooms";
import QuestionsView from "./views/questions";
import OptionsView from "./views/option";
import CustomMenu from "../components/CustomMenu";
import UsersView from "./views/user";

const Tab = createNativeStackNavigator();

export default function HomeScreen ({route, navigation}) {

  const { user, logout } = useContext(AuthContext); 
  const [menuVisible, setMenuVisible] = useState(false);

  const userView = () => {
    navigation.navigate('Usuarios')
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
  } else if (user.rol === 'maestro' || user.rol === 'usuario') {
    actions = [
      { title: 'Cerrar sesión', onPress: handleLogout },
    ];
  }


return (
  <View style={styles.nav}>
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#9E78EE',
      },
      headerTitleStyle: {
        fontSize: 23
      },
      headerTintColor: 'white', // Establecer el color del texto del encabezado
      headerRight: () => (
        <Button color='white' title={`${user.name}`} onPress={() => setMenuVisible(true)} />
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
          animation: 'slide_from_right',  
        })}
      >
        {({ navigation, route }) => <BanksView navigation={navigation} route={route} />}
      </Tab.Screen>

      <Tab.Screen
        name= 'Preguntas'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          title: route.params?.bank || 'Preguntas',
          animation: 'slide_from_right',  
        })}
      >
        {({ navigation, route}) => <QuestionsView navigation={navigation} route={route}/>}
      </Tab.Screen>

      <Tab.Screen
        name= 'Opciones'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          title: route.params?.question || 'Opciones',
          animation: 'slide_from_right',  
        })}
      >
        {({ navigation, route}) => <OptionsView navigation={navigation} route={route}/>}
      </Tab.Screen>

      <Tab.Screen
        name= 'Usuarios'
        initialParams={{ ...route.params }}
        options={({ route }) => ({ 
          animation: 'slide_from_right',  
        })}
      >
        {({ navigation, route}) => <UsersView navigation={navigation} route={route}/>}
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
});