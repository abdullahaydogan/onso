import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogoutButton from './src/components/LogOutButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign Up Screen"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Log In Screen"
          component={LogInScreen}
        />
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => <Text>Home</Text>,
            headerRight: () => <LogoutButton navigation={navigation} />, 
            headerBackVisible: false,
            headerStyle: { height: 80 },
          })}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('onsoit', () => App);
