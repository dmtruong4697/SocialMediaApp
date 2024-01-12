import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, TextInput, Alert, View, Pressable, KeyboardAvoidingView } from 'react-native'
import { Button } from '@rneui/themed'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const VerifyCode = ({route}) => {

    const {emailQuery} = route.params || {};
    const maximumCodeLength = 6;
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const [isPinReady, setIsPinReady] = useState(false);
    

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
                navigation.navigate({name: 'Login'});
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

    const getCodeVerify = async () => {
        const response = await axios.post('https://it4788.catan.io.vn/get_verify_code', {
            email: emailQuery,
        });
    
        if (response.status === 200) {
            console.log('Verify Success', response.data);
        } else {
            console.log('Verify failed:', response.data);
            console.log('Response Status:', response.status);
        }
    }

    const boxArray = new Array(maximumCodeLength).fill(0);
    const inputRef = useRef();
    const boxDigit = (_, index) => {

        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumCodeLength - 1;
        const isCodeComplete = code.length === maximumCodeLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        return (
          <View style={(isInputBoxFocused && isValueFocused ? styles.SplitBoxesFocused : styles.SplitBoxes)}>
            <Text style={styles.SplitBoxText}>{digit}</Text>
          </View>
        );
      };

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
    };

    const handleOnBlur = () => {
    setIsInputBoxFocused(false);
    };

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumCodeLength);
        // clean up function
        return () => {
          setIsPinReady(false);
        };
      }, [code]);

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
            <Text style={styles.verifyTitle}>Mã đã được gửi đến {emailQuery}</Text>
            <Pressable style={styles.SplitOTPBoxesContainer}> 
            {/* {boxArray.map(boxDigit)} */}
            {boxArray.map((box, index) => (
                <React.Fragment key={index}>
                {boxDigit(box, index)}
                </React.Fragment>
            ))}
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Enter code"
                maxLength={maximumCodeLength}
                setIsPinReady={isPinReady}
                keyboardType='numeric'
                onPress={handleOnPress}
                onBlur={handleOnBlur}
            />
            </Pressable>
            <Text style={[styles.verifyTitle, {marginBottom: 0}]}>Bạn chưa nhận được mã xác minh?</Text>
            <Button 
                title={"Gửi lại"} 
                onPress={() => getCodeVerify()} 
                type='clear'
            />
            <View>
                <Button
                    buttonStyle = {{borderRadius: 30, paddingHorizontal: 20, alignSelf: 'center', marginTop: 10,}}
                    title="Xác nhận" 
                    onPress={HandleCode}
                    />
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default VerifyCode;

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

    verifyTitle: {
        marginVertical: 30,
        color: 'gray',
        fontSize: 16,
    },

    input: {
        // height: 40,
        // borderWidth: 1,
        // borderRadius: 10,
        // marginVertical: 12,
        // padding: 10,

        width: 300,
        borderWidth: 1,
        padding: 15,
        position: 'absolute',
        opacity: 0, 
    },

    SplitBoxes: {
        borderColor: '#e5e5e5',
        borderWidth: 2,
        borderRadius: 5,
        padding: 12,
        minWidth: 50,
    },

    SplitBoxText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000',
    },

    SplitOTPBoxesContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    SplitBoxesFocused: {
        borderColor: 'red',
        backgroundColor: 'red',
    }
})
