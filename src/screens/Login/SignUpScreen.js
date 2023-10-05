import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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

    const [selectValueDay, setSelectValueDay] = useState(null);
    const [selectValueMonth, setSelectValueMonth] = useState(null);
    const [selectValueYear, setSelectValueYear] = useState(null);

    const days = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'},
        {label: '17', value: '17'},
        {label: '18', value: '18'},
        {label: '19', value: '19'},
        {label: '20', value: '20'},
        {label: '21', value: '21'},
        {label: '22', value: '22'},
        {label: '23', value: '23'},
        {label: '24', value: '24'},
        {label: '25', value: '25'},
        {label: '26', value: '26'},
        {label: '27', value: '27'},
        {label: '28', value: '28'},
        {label: '29', value: '29'},
        {label: '30', value: '30'},
        {label: '31', value: '31'},
    ];
    const months = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
    ];
    const years = [
        {label: '1900', value: '1900'},{label: '1901', value: '1901'},{label: '1902', value: '1902'},{label: '1903', value: '1903'},
        {label: '1904', value: '1904'},{label: '1905', value: '1905'},{label: '1906', value: '1906'},{label: '1907', value: '1907'},
        {label: '1908', value: '1908'},{label: '1909', value: '1909'},{label: '1910', value: '1910'},{label: '1911', value: '1911'},
        {label: '1912', value: '1912'},{label: '1913', value: '1913'},{label: '1914', value: '1914'},{label: '1915', value: '1915'},
        {label: '1916', value: '1916'},{label: '1917', value: '1917'},{label: '1918', value: '1918'},{label: '1919', value: '1919'},
        {label: '1920', value: '1920'},{label: '1921', value: '1921'},{label: '1922', value: '1922'},{label: '1923', value: '1923'},
        {label: '1924', value: '1924'},{label: '1925', value: '1925'},{label: '1926', value: '1926'},{label: '1927', value: '1927'},
        {label: '1928', value: '1928'},{label: '1929', value: '1929'},{label: '1930', value: '1930'},{label: '1931', value: '1931'},
        {label: '1932', value: '1932'},{label: '1933', value: '1933'},{label: '1934', value: '1934'},{label: '1935', value: '1935'},
        {label: '1936', value: '1936'},{label: '1937', value: '1937'},{label: '1938', value: '1938'},{label: '1939', value: '1939'},
        {label: '1940', value: '1940'},{label: '1941', value: '1941'},{label: '1942', value: '1942'},{label: '1943', value: '1943'},
        {label: '1944', value: '1944'},{label: '1945', value: '1945'},{label: '1946', value: '1946'},{label: '1947', value: '1947'},
        {label: '1948', value: '1948'},{label: '1949', value: '1949'},{label: '1950', value: '1950'},{label: '1951', value: '1951'},
        {label: '1952', value: '1952'},{label: '1953', value: '1953'},{label: '1954', value: '1954'},{label: '1955', value: '1955'},
        {label: '1956', value: '1956'},{label: '1957', value: '1957'},{label: '1958', value: '1958'},{label: '1959', value: '1959'},
        {label: '1960', value: '1960'},{label: '1961', value: '1961'},{label: '1962', value: '1962'},{label: '1963', value: '1963'},
        {label: '1964', value: '1964'},{label: '1965', value: '1965'},{label: '1966', value: '1966'},{label: '1967', value: '1967'},
        {label: '1968', value: '1968'},{label: '1969', value: '1969'},{label: '1970', value: '1970'},{label: '1971', value: '1971'},
        {label: '1972', value: '1972'},{label: '1973', value: '1973'},{label: '1974', value: '1974'},{label: '1975', value: '1975'},
        {label: '1976', value: '1976'},{label: '1977', value: '1977'},{label: '1978', value: '1978'},{label: '1979', value: '1979'},
        {label: '1980', value: '1980'},{label: '1981', value: '1981'},{label: '1982', value: '1982'},{label: '1983', value: '1983'},
        {label: '1984', value: '1984'},{label: '1985', value: '1985'},{label: '1986', value: '1986'},{label: '1987', value: '1987'},
        {label: '1988', value: '1988'},{label: '1989', value: '1989'},{label: '1990', value: '1990'},{label: '1991', value: '1991'},
        {label: '1992', value: '1992'},{label: '1993', value: '1993'},{label: '1994', value: '1994'},{label: '1995', value: '1995'},
        {label: '1996', value: '1996'},{label: '1997', value: '1997'},{label: '1998', value: '1998'},{label: '1999', value: '1999'},
        {label: '2000', value: '2000'},{label: '2001', value: '2001'},{label: '2002', value: '2002'},{label: '2003', value: '2003'},
        {label: '2004', value: '2004'},{label: '2005', value: '2005'},{label: '2006', value: '2006'},{label: '2007', value: '2007'},
        {label: '2008', value: '2008'},{label: '2009', value: '2009'},{label: '2010', value: '2010'},{label: '2011', value: '2011'},
        {label: '2012', value: '2012'},{label: '2013', value: '2013'},{label: '2014', value: '2014'},{label: '2015', value: '2015'},
        {label: '2016', value: '2016'},{label: '2017', value: '2017'},{label: '2018', value: '2018'},{label: '2019', value: '2019'},
        {label: '2020', value: '2020'},{label: '2021', value: '2021'},{label: '2022', value: '2022'},{label: '2023', value: '2023'},
    ];
    const displayValueDay = `Ngày ${selectValueDay}`;
    return (
        <KeyboardAvoidingView style={styles.containerS}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.bigContainer}>
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>SignUpScreen</Text>
                    <SafeAreaView>
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
                        

                        <View style={styles.birthDay}>
                            <View style={[styles.containerSelect, styles.input, {flex: 1, marginRight: 10}]}>
                                <RNPickerSelect
                                    placeholder={{
                                    label: 'Ngày...',
                                    value: displayValueDay,
                                    }}
                                    items={days}
                                    onValueChange={(value) => setSelectValueDay(value)}
                                    value={selectValueDay}
                                />
                                <View><FontAwesomeIcon icon={faSortDown} /></View>
                            </View>

                            <View style={[styles.containerSelect, styles.input, {flex: 1}]}>
                            <RNPickerSelect
                                placeholder={{
                                label: 'Tháng...',
                                value: null,
                                }}
                                items={months}
                                onValueChange={(value) => setSelectValueMonth(value)}
                                value={selectValueMonth}
                            />
                            <View><FontAwesomeIcon icon={faSortDown} /></View>
                            </View> 

                            <View style={[styles.containerSelect, styles.input, {flex: 1, marginLeft: 10}]}>
                                <RNPickerSelect
                                    placeholder={{
                                    label: 'Năm...',
                                    value: null,
                                    }}
                                    items={years}
                                    onValueChange={(value) => setSelectValueYear(value)}
                                    value={selectValueYear}
                                />
                                <View><FontAwesomeIcon icon={faSortDown} /></View>
                            </View> 
                        </View>                                            


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
                                // icon=
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
        flexDirection: "row",
        justifyContent: "space-between",
    }
})