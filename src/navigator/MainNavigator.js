import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';
import ForgotPasswordScreen from '../screens/Login/ForgotPasswordScreen';
import HomeNavigator from './HomeNavigator';
import EditProfileScreen from '../screens/Home/Profile/EditProfileScreen';
import ProfileScreen from '../screens/Home/Profile/ProfileScreen';
import FriendListScreen from '../screens/Home/Friend/FriendListScreen';
import SearchResultScreen from '../screens/Home/Search/SearchResultScreen';
import AllSearchRecent from '../screens/Home/Search/AllSearchRecent';
import VerifyCode from '../screens/Login/VerifyCode';
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

                <Stack.Screen
                    name = 'EditProfile'
                    component={EditProfileScreen}
                    
                />
                <Stack.Screen
                    name = 'Profile'
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name='FriendList'
                    component={FriendListScreen}
                />

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

                <Stack.Screen
                    name='HistorySearch'
                    component={AllSearchRecent}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='VerifyCode'
                    component={VerifyCode}
                />

        </Stack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})