import { StyleSheet, View } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from "./login"

const Stack = createNativeStackNavigator();

const Home = () => {
  return(
    
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Login'
          component={LoginView}
        />
      </Stack.Navigator>
  );
}

export default Home;

