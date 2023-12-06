import React from 'react'
import { useState } from 'react'
import { ScrollView, Text, StyleSheet, TextInput, Alert, View } from 'react-native'
import { Button } from '@rneui/themed'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const VerifyCode = ({route}) => {

    const {emailQuery} = route.params || {};

    const [code, setCode] = useState('');
    const navigation = useNavigation();
    

    const HandleCode = async () => {
        try {
            const response = await axios.post('https://it4788.catan.io.vn/check_verify_code', {
                    email: emailQuery,
                    code_verify: code,
                });

            if (response.status === 200) {
                console.log('Verify Success', response.data);
                Alert.alert('Verify Success', 'U can continue login!');
                console.log(emailQuery, code);
                navigation.navigate({name: 'Home'});
            } else {
                console.log('Verify failed:', response.data);
                console.log('Response Status:', response.status);
                Alert.alert('Verify Failed', 'Invalid input. Please check your data and try again.');
            }
        
        } catch(error) {
            // Xử lý lỗi kết nối hoặc lỗi khác
            console.error('Verify failed:', error)
            Alert.alert('Verify Failed', 'Please try again.');
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
    }

    return(
        <ScrollView>
            <Text>VerifyCode</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Enter code"
            />
            <View>
                <Button
                    buttonStyle = {{borderRadius: 30}}
                    title="Register" 
                    onPress={HandleCode}
                    />
            </View>
        </ScrollView>
    )
}

export default VerifyCode;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 12,
        padding: 10,
    },
})
