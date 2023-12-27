import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import SearchRecent from '../../../components/SearchRecent';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AllSearchRecent = ({ route }) => {
    const { searchHistoryData } = route.params || {};
    const navigation = useNavigation();
    const [all, setAll] = useState('0');
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [pressBtn, setPressBtn] = useState('all');
    const [pressDel, setPressDel] = useState(false);//true hien thi, false k hien thi

    const handlePress = (buttonPress) => {
        setPressBtn(buttonPress);
    } 

    const isPressBtn = (buttonName) => {
        return pressBtn === buttonName;
    }

    const handleDelSaveSearch = async (id, all) => {
        try {
          const response = await axios.post('https://it4788.catan.io.vn/del_saved_search', {
            search_id: id,
            all: all,
          }, 
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          })
    
          if (response.status === 200) {
            console.log('delete search success');
          } else {
            console.log ('delete fail: response data: ', response.data);
            console.log('response status: ', response.status);
            Alert.alert("delete fail:", 'please try again!');
          }
        } catch (error) {
          console.error('delete Search recent false:', error)
          Alert.alert('delete Search recent false', 'Please try again.');
          if (error.response) {
            console.error('response data: ', error.response.data);
            console.error('response status: ', error.response.status);
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

    return (
        <ScrollView style={styles.component}>
            <View style={styles.headerComponent}>
                <View style={{flex: 1,}}>
                    <TouchableOpacity style={{width: '20%', padding: 5,}} onPress={() =>
                    navigation.navigate({name: 'Search'})
                    }>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 18, flex: 1,}}>History Search</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                    title='Delete All'
                    titleStyle={{}}
                    buttonStyle={{padding: 0, margin: 0, }}
                    type= 'clear'
                    onPress={() => {setPressDel(true); handleDelSaveSearch('1', '1')}}
                />
                </View>
            </View>
            <View style={styles.options}>
                <Button
                    title={'All'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('all') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('all');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('all') && {backgroundColor: '#D9E1F0'}]}
                />
                <Button
                    title={'Searches'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('searches') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('searches');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('searches') && {backgroundColor: '#D9E1F0'}]}
                />
                <Button
                    title={'Access Times'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('AccessTime') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('AccessTime');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('AccessTime') && {backgroundColor: '#D9E1F0'}]}
                />
            </View>
            <View>
                {pressDel ? (<View></View>) : 
                    (<View>{searchHistoryData.map((item, key) => (item.id % 2 ? <SearchRecent
                                textSearch = {item.keyword}
                                deleteSaveSearch = {() => {handleDelSaveSearch(item.id, '0')}}
                                key={key}
                                /> : null))
                            } 
                    </View>)
                }
                
            </View> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    component: {
        marginTop: '10%',
    },
    headerComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        marginHorizontal: 0,
        borderBottomWidth: 1,
        paddingBottom: '1%',
        borderColor: '#e9eaef',
    },

    options: {
        flexDirection: 'row',
        padding: '3%',
    },

    buttonOption: {
        borderRadius: 50,
        marginRight: 10,
        padding: 7,
        backgroundColor: '#E0E0E0',
    },

    titleStyleOption: {
        fontSize: 15, 
        color: '#000', 
        fontWeight: 500,
    },
})

export default AllSearchRecent;