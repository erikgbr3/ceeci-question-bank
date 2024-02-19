import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './src/views/login';
import { AuthProvider } from './src/context/AuthContext';
import HomeScreen from './src/HomeScreen';


const Stack = createNativeStackNavigator()

function Stacks(){
  
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name='Login' component={LoginView}/>
      <Stack.Screen name='Main' component={HomeScreen}/>
    </Stack.Navigator>
  );
}
export default function App(){
  return(
    <AuthProvider>
      <NavigationContainer>
        <Stacks/>
      </NavigationContainer>
    </AuthProvider>
    
  )
}
