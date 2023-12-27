import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed';
import { Input, Icon } from '@rneui/themed';
import userIcon from '../../../assets/icons/user.svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey, faMugSaucer, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
import { loginRequest } from '../../redux/actions/auth.action';
import { getFcmToken, registerListenerWithFCM } from '../../../push-notifications';



const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState('uuid')

  useEffect(() => {
    getFcmToken(currentUser);
    const unsubscribe = registerListenerWithFCM(currentUser, navigation);
    return unsubscribe;
  }, [currentUser])


  useEffect(() => {
    if (currentUser && (currentUser.userName !== '')) {
      navigation.navigate({ name: 'Home' });
    } else if (currentUser && currentUser.userName == '') {
      navigation.navigate({ name: 'ChangeInfo' });
    }
  }, [currentUser, navigation]);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={styles.inputField}>
        <Input
          leftIcon={<FontAwesomeIcon icon={faUser} />}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          leftIcon={<FontAwesomeIcon icon={faKey} />}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Button
          title="Forgot password?"
          titleStyle={{ fontSize: 16 }}
          type="clear"
          style={{
            //marginBottom: 10,
            alignSelf: 'flex-end',
          }}
          onPress={() =>
            navigation.navigate({ name: 'ForgotPassword' })
          }
        />

        <Button
          title={'Login'}
          style={{
            marginTop: 10,
            marginBottom: 30,
          }}
          onPress={() =>
            dispatch(loginRequest(email, password, 'uuid'))
          }
        />

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>Don't have account?</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({ name: 'SignUp' })
            }
          >
            <Text style={{ color: '#2089dc' }}> create a new account</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'red',
            alignSelf: 'center',
            marginTop: 100,
          }}
        >{errorMessage}</Text>


      </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'pink',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    //justifyContent: 'center',
    alignContent: 'center',
  },
  inputField: {
    top: 200,
    width: '90%',
  },
  title: {
    fontSize: 30,
    top: 150,
    //color: '#2089dc',
  }
})