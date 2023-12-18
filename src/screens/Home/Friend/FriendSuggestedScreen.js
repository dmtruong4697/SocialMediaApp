import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import ProfileCard from '../../../components/ProfileCard';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FriendSuggestedScreen = () => {

    const [index, setIndex] = useState("0");
    const [friendSuggestData, setFriendSuggestData] = useState([]);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleSuggestFr = async () => {
        try {
            const response = await axios.post('https://it4788.catan.io.vn/get_suggested_friends', {
                index: index,
                count: "5",
            }, 
            {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });

            if (response.status === 200) {
                console.log("Get suggest success: ", response.data);
                setFriendSuggestData(response.data?.data || []);
                console.log("Get suggest success nay la data khac: ", response.data?.data);
            } else {
                console.log("Get suggest fail, response data: ", response.data);
                console.log("response status: ", response.status);
                Alert.alert('Get suggest fail:', 'please try again');
            }
        } catch (error) {
            console.error("Get suggest fail: ", error);
            Alert.alert('Get suggest fail:', 'please try again');
            if (error.response) {
                console.error('error data: ', error.response.data);
                console.error('error status: ', error.response.status);
                console.error('error header: ', error.response.headers);
            } else if (error.request) {
                console.error('error request: ', error.request);
            } else {
                console.error("loi khong xac dinh: ", error.message);
            }
        }
    }

    const delRequestFr = () => {

    }

    const handleSetRequest = async (id) => {
        try {
            const response = await axios.post('https://it4788.catan.io.vn/set_request_friend', {
                user_id: id,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            })

            if (response.status === 200) {
                console.log(`set request fr success id: ${id}, response data: `, response.data);
            } else {
                console.log('set rq fr fail, response data: ', response.data);
                console.log('response status: ', response.status);
                Alert.alert('set request friend fail:', 'please try again!');
            }
        } catch (error) {
            console.error("set request friend fail: ", error);
            Alert.alert('set request friend fail:', 'please try again');
            if (error.response) {
                console.error('error data: ', error.response.data);
                console.error('error status: ', error.response.status);
                console.error('error header: ', error.response.headers);
            } else if (error.request) {
                console.error('error request: ', error.request);
            } else {
                console.error("loi khong xac dinh: ", error.message);
            }
        }
    }

    const handleDelRequest = async (id) => {
        try {
          const response = await axios.post('https://it4788.catan.io.vn/del_request_friend', {
            user_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
    
          if (response.status === 200) {
            console.log(`Delete request success id: ${id}: ` , response.data);
          } else {
            console.log('Del fail, response data: ', response.data);
            console.log('response status: ', response.status);
            Alert.alert('Delete request Fail:', 'please try again!');
          }
        } catch (error) {
          console.error('Delete request fail: ', error);
          Alert.alert('Delete request Fail:', 'please try again!');
          if (error.response) {
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

    useEffect(() => {
        handleSuggestFr();
    }, []);

    return (
        <ScrollView>
            <View>
                <Text style={styles.title}>People you may know</Text>
                <View>
                    {friendSuggestData.map((item) => <ProfileCard
                        avatarImage={item.avatar}
                        userName={item.username}
                        userId={item.id}
                        isNotFriend={true}
                        mutualFriend={item.same_friends}
                        pressAddFriend={() => {handleSetRequest(item.id)}}
                        pressCancel={() => {handleDelRequest(item.id)}}
                    />)}
                </View>
            </View>
        </ScrollView>
    )
}

export default FriendSuggestedScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '500',
        padding: 10,
    },
})