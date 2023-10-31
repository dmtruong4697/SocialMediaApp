import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';
import ForgotPasswordScreen from '../screens/Login/ForgotPasswordScreen';
import HomeNavigator from './HomeNavigator';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
        <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='SignUp'
                    component={SignUpScreen}
                />

                <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPasswordScreen}
                />

                <Stack.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{headerShown: false}}
                />

        </Stack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})