import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import Logup from "./Logup";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown:false }}
        />
        <Stack.Screen 
          options={{ headerShown:false }} 
          name="Login" 
          component={Login} 
        />
        <Stack.Screen 
          options={{ headerShown:false }} 
          name="Logup" 
          component={Logup} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

