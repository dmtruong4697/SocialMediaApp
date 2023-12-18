import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@rneui/themed';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [uuid, setUuid] = useState('');
    const [hiddenPw, setHiddenPw] = useState(true)
    const navigation = useNavigation();

  //   const getCodeVerify = async () => {
  //     const response = await axios.post('https://it4788.catan.io.vn/get_verify_code', {
  //       email: email,
  //     });

  //     if (response.status === 200) {
  //         console.log('Verify Success', response.data);
  //     } else {
  //         console.log('Verify failed:', response.data);
  //         console.log('Response Status:', response.status);
  //     }
  // }

    const handleSignUp = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/signup', {
        email: email,
        password: password,
        uuid: uuid,
      });

      if (response.status === 201) {
        // Xử lý phản hồi thành công
        console.log('Sign up successful:', response.data);
        Alert.alert('Sign Up Successful', 'Account created successfully!');
        // getCodeVerify();
        navigation.navigate('VerifyCode', {emailQuery: email})
      } else {
        // Xử lý phản hồi không thành công (mã lỗi 400)
        console.log('Sign up failed:', response.data);
        console.log('Response Status:', response.status);
        Alert.alert('Sign Up Failed', 'Invalid input. Please check your data and try again.');
      }
    } catch (error) {
      // Xử lý lỗi kết nối hoặc lỗi khác
      console.error('Sign up failed:', error)
      Alert.alert('Sign Up Failed', 'Unable to create account. Please try again.');
        //chi tiết lỗi
      if (error.response) {
        // Server trả về response với mã lỗi
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // Yêu cầu đã được gửi nhưng không nhận được response
        console.error('Request data:', error.request);
      } else {
        // Các lỗi khác
        console.error('Lỗi không xác định:', error.message);
      }
    }


  };
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>Register</Text>
                <View style={styles.infoSignUp}>
                    <Text style={{fontSize: 15}}>What your email?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <Text style={{fontSize: 15}}>Create a password?</Text>
                    <View style={styles.componentPass}>
                        <TextInput
                            style={{height: '100%', flex: 1,}}
                            onChangeText={setPassWord}
                            value={password}
                            placeholder="PassWord"
                            secureTextEntry={hiddenPw}
                        />
                        <TouchableOpacity style={{ padding: 8,}} onPress={() => {setHiddenPw(!hiddenPw)}}>
                            <FontAwesomeIcon icon={hiddenPw ? (faEye):(faEyeSlash)} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 15}}>What your uuid?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUuid}
                        value={uuid}
                        placeholder="Uuid"
                    />
                </View>
                <View>
                    <Button
                        buttonStyle = {{borderRadius: 30}}
                        title="Register" 
                        // onPress={() =>
                        //     navigation.navigate({name: 'VerifyCode'})
                        // }
                        onPress={handleSignUp}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    input: {
        height: '17%',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
        padding: 10,
    },
    componentPass: {
        height: '17%',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
})