import React, { useEffect, useState } from 'react'
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import BlockUserCard from '../../../components/BlockUserCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const BlockListScreen = () => {

    const currentUser = useSelector((state) => state.auth.currentUser);
    const navigation = useNavigation();
    const [BlockListUser, setBlockListUser] = useState([])

    const BlockList = async () => { 
        try {
            const response = await axios.post("https://it4788.catan.io.vn/get_list_blocks", {
                index: 0,
                count: 30,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            })

            if (response.status === 200) {
                console.log('get Block user success');
                setBlockListUser(response.data.data);
            } else {
                console.log('get Block user fail, response data:', response.data);
                console.log('response status: ', response.status);
                Alert.alert('get Block user fail', 'please try again');
            }
            } catch (error) {
            console.error('get Block user false:', error)
            Alert.alert('get Block user false', 'Please try again.');
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

    const handleUnBlock = async (id) => {
        try {
            const response = await axios.post('https://it4788.catan.io.vn/unblock', {
                user_id: id,
            },
                {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
                })
        
            if (response.status === 200) {
                console.log('Un Block user success');
            } else {
                console.log('Un Block user fail, response data:', response.data);
                console.log('response status: ', response.status);
                Alert.alert('Un Block user fail', 'please try again');
            }
            } catch (error) {
            console.error('Un Block user false:', error)
            Alert.alert('Un Block user false', 'Please try again.');
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

    useEffect(() => {BlockList()}, []);

    return (
        <View style={styles.component}>
            <View style={{paddingBottom: 10}}>
                <Text style={{fontSize: 17, fontWeight: '500', marginVertical: 5,}}>Người bị chặn</Text>
                <Text style={{color: 'gray'}}>Một khi bạn đã chặn ai đó, họ sẽ không xem được nội dung bạn tự đăng trên dòng thời gian mình,
                    gắn thẻ bạn, mời bạn tham gia sự kiện hoặc nhóm, bắt đầu cuộc trò chuyện với bạn hay thêm bạn làm bạn bè.
                    Điều này không bao gồm các ứng dụng, trò chơi hay nhóm mà cả bạn và người này đều tham gia.
                </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.blockIcon} onPress={()=> {navigation.navigate('Search')}}>
                    <FontAwesomeIcon size={30} color={"#467ce6"} icon={faSquarePlus} />
                    <Text style={{color: '#467ce6', fontSize: 16, fontWeight: '500'}}>Thêm vào danh sách chặn</Text>
                </TouchableOpacity>
            </View>
            <View>
            <FlatList
                keyExtractor={(item) => item.id}
                data={BlockListUser}
                renderItem={({ item}) => (
                    <BlockUserCard avatarImage={item.avatar} userName={item.name} userId={item.id} unBlockUser={() => {handleUnBlock(item.id);}} />
                )}
            />
            </View>
        </View>
    )
}

export default BlockListScreen;

const styles = StyleSheet.create({
    component: {
        paddingLeft: 10,
    },

    blockIcon: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 8,
        borderColor: 'gray',
    }
})