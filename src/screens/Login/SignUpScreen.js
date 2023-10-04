import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, SectionList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { RadioButton } from 'react-native-paper';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [passWork, setPassWork] = React.useState('');
    const [birth, setBirth] = React.useState('');

    const [checked, setChecked] = useState('option1');

    const handleRadioChange = (value) => {
        setChecked(value);
    };

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>SignUpScreen</Text>
            <SafeAreaView>
                <Text style={{fontWeight:"bold", fontSize: 30, color:"black"}}>Bạn tên gì?</Text>
                <Text style={styles.fontText}>Nhập tên của bạn sử dụng trong đời thực.</Text>
                <View style={{flexDirection: "row"}}>
                    <TextInput
                        style={[styles.input, {marginRight: 10, flex: 1}]}
                        onChangeText={setLastName}
                        value={lastName}
                        placeholder="Họ"
                    />
                    <TextInput
                         style={[styles.input, {flex: 1}]}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholder="Tên"
                    />
                </View>
                <Text style={styles.fontText}>Ngày sinh của bạn là khi nào?</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setBirth}
                    value={birth}
                    placeholder="Tuổi"
                />
                <Text style={styles.fontText}>Giới tính của bạn là gì?</Text>
                <View style={styles.containerRadio}>
                    <View style={styles.radioButton}>
                        <RadioButton
                        value="Nam"
                        status={checked === 'Nam' ? 'checked' : 'unchecked'}
                        onPress={() => handleRadioChange('Nam')}
                        />
                        <Text style={{flex: 1}}>Nam</Text>
                    </View>

                    <View style={styles.radioButton}>
                        <RadioButton
                        value="Nữ"
                        status={checked === 'Nữ' ? 'checked' : 'unchecked'}
                        onPress={() => handleRadioChange('Nữ')}
                        />
                        <Text style={{flex: 1}}>Nữ</Text>
                    </View>
                        <View style={[styles.radioButton, {borderBottomWidth: 0}]}>
                            <RadioButton
                                value="Khác"
                                status={checked === 'Khác' ? 'checked' : 'unchecked'}
                                onPress={() => handleRadioChange('Khác')}
                            />
                            <Text style={{flex: 1}}>Khác</Text>
                        </View>
                </View>
                
                <Text style={styles.fontText}>Số di động của bạn là gì?</Text>
                <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNum}
                        value={phoneNum}
                        placeholder="Số di động"
                        keyboardType="numeric"
                        
                />
                <Text style={styles.fontText}>Tạo mật khẩu</Text>
                <TextInput
                         style={styles.input}
                        onChangeText={setPassWork}
                        value={passWork}
                        placeholder="Mật khẩu"
                />

            </SafeAreaView>
            <Button
                title="Đăng ký" 
                onPress={() =>
                    navigation.navigate({name: 'Home'})
                }
            />
        </View>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    fontText: {
        fontSize: 15,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccd0d5',
    },
    containerRadio: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccd0d5',
        borderRadius: 10,
        marginVertical: 10,
    },
})