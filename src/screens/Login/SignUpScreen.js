import React, {useState} from "react";
import { StyleSheet, Platform, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [passWork, setPassWork] = React.useState('');

    const [checked, setChecked] = useState('Nam');

    const handleRadioChange = (value) => {
        setChecked(value);
    };

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = ({type}, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        setDateOfBirth(formatDate(date));
        toggleDatePicker();
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        let year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        let day = date.getDate(); 

        return `${day} ${month} ${year}`;
    }

    const [dateOfBirth, setDateOfBirth] = useState(formatDate(new Date()));

    const setDefault = () => {
        date = new Date();
        return date.toDateString();
    }
    return (
        <KeyboardAvoidingView style={styles.containerS}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.bigContainer}>
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>Register</Text>
                    <SafeAreaView>
                        <Text style={styles.fontText}>Enter the name you use in real life.</Text>
                        <View style={{flexDirection: "row"}}>
                            <TextInput
                                style={[styles.input, {marginRight: 10, flex: 1}]}
                                onChangeText={setLastName}
                                value={lastName}
                                placeholder="First name"
                            />
                            <TextInput
                                style={[styles.input, {flex: 1}]}
                                onChangeText={setFirstName}
                                value={firstName}
                                placeholder="Last name"
                            />
                        </View>
                        <Text style={styles.fontText}>What's your birthday?</Text>
                        

                        <View style={styles.birthDay}>
                           
                            {showPicker && (
                                <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChange}
                                style={styles.datePicker}
                            />
                            )}

                            {showPicker && Platform.OS === "ios" && (
                                <View style={{flexDirection: 'row', justifyContent: "space-around", }}>
                                    <TouchableOpacity style={[styles.pickerButton, {backgroundColor: "#11182711", borderRadius: 30,},]}
                                    onPress={toggleDatePicker}>
                                        <Text style={[styles.buttonText, {color: "#075985"}]}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.pickerButton, {backgroundColor: "#0080FF",borderRadius: 30,},]}
                                    onPress={confirmIOSDate}>
                                        <Text style={[styles.buttonText, {color: "#fff"}]}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        

                            {!showPicker && (
                                <Pressable
                                    onPress={toggleDatePicker}
                                >

                                <TextInput
                                    style={[styles.containerSelect, styles.input, styles.birthDay,]}
                                    value={dateOfBirth}
                                    onChangeText={setDateOfBirth}
                                    placeholderTextColor='#11182744'
                                    editable={false}
                                    onPressIn={toggleDatePicker}
                                />
                                </Pressable>
                            )}

                            

                        </View>                                            


                        <Text style={styles.fontText}>What's your gender?</Text>
                        <View style={styles.containerRadio}>
                            <View style={styles.radioButton}>
                                <RadioButton
                                value="Male"
                                status={checked === 'Male' ? 'checked' : 'unchecked'}
                                onPress={() => handleRadioChange('Male')}
                                />
                                <Text style={{flex: 1}}>Male</Text>
                            </View>

                            <View style={styles.radioButton}>
                                <RadioButton
                                // icon=
                                value="Female"
                                status={checked === 'Female' ? 'checked' : 'unchecked'}
                                onPress={() => handleRadioChange('Female')}
                                />
                                <Text style={{flex: 1}}>Female</Text>
                            </View>
                                <View style={[styles.radioButton, {borderBottomWidth: 0}]}>
                                    <RadioButton
                                        value="Other"
                                        status={checked === 'Other' ? 'checked' : 'unchecked'}
                                        onPress={() => handleRadioChange('Other')}
                                    />
                                    <Text style={{flex: 1}}>Other</Text>
                                </View>
                        </View>
                        
                        <Text style={styles.fontText}>What your mobile number?</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={setPhoneNum}
                                value={phoneNum}
                                placeholder="Mobile number"
                                keyboardType="numeric"
                                
                        />
                        <Text style={styles.fontText}>Create a password</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={setPassWork}
                                value={passWork}
                                placeholder="Password"
                        />
                    </SafeAreaView>
                    <Button
                        buttonStyle = {[styles.buttonFB, {marginBottom: 20,}]}
                        title="Register" 
                        onPress={() =>
                            navigation.navigate({name: 'Home'})
                        }
                    />
                </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    containerS: {
        flex: 1,
        justifyContent: 'center',
      },
    bigContainer: {
        flexDirection: 'column',
    },
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
    containerSelect: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    birthDay: {
        flexDirection: "column",
        justifyContent: "space-between",
    },

    datePicker: {
        height: 250,
        marginTop: -10,
    },
    pickerButton: {
        padding: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
    }, 
    buttonFB: {
        borderRadius: 30,
        height: 50,
        
    }
})