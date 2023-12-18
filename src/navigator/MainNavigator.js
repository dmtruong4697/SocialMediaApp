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
import EditDetailProfile from '../screens/Home/Profile/EditDetailProfile';
import SearchScreen from '../screens/Home/Search/SearchScreen'; 
import ListFriendScreen from '../screens/Home/Profile/ListFriendScreen';
import { faL } from '@fortawesome/free-solid-svg-icons';

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
                    name = 'ListFriend'
                    component={ListFriendScreen}
                />
                <Stack.Screen
                    name = 'Profile'
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name='FriendList'
                    component={FriendListScreen}
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

                <Stack.Screen
                    name='Edit Detail Profile'
                    component={EditDetailProfile}
                    
                />
        </Stack.Navigator>
    
  )
}

export default MainNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      editButton: {
        padding: 10,
        backgroundColor: '#0780DC',
        borderRadius: 5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      closeButton: {
        padding: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
      },
})