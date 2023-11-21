import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';
import ForgotPasswordScreen from '../screens/Login/ForgotPasswordScreen';
import HomeNavigator from './HomeNavigator';
import SearchResultScreen from '../screens/Home/Search/SearchResultScreen';

import SearchScreen from '../screens/Home/Search/SearchScreen'; 

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

                {/* NDH */}
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='SearchResult'
                    component={SearchResultScreen}
                    options={{headerShown: false}}
                />


        </Stack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})