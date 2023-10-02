import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Login'}
                component={LoginScreen}
                options={{title: 'Login'}}
            />

            <Stack.Screen
                name={'Home'}
                component={HomeScreen}
                //options={{headerShown: false}}
                options={{title: 'Home'}}
            />
        </Stack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})