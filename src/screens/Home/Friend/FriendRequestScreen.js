import { StyleSheet, Text, View, FlatList, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendRequestCard from '../../../components/FriendRequestCard'
import { Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const FriendRequestScreen = () => {

  const navigation = useNavigation();
  const [startFr, setStartFr] = useState("0");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [friendRequestData, setFriendRequestData] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleGetRequestFr = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_requested_friends', {
        index: startFr,
        count: '10',
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        console.log('Get list friends request successful:', response.data);
        // responseData = response.data;
        setFriendRequestData(response.data?.data?.requests || []);
      } else {
        console.log('Get friends false:', response.data);
        console.log('Response Status:', response.status);
        Alert.alert('Get friends false', 'Please check your data and try again.');
      }
    } catch (error) {
      console.error('Get friends false:', error)
      Alert.alert('Get friends false', 'Please try again.');
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
    } finally {
      setLoading(false);
    }
  }

  const handleAcceptFr = async (id) => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/set_accept_friend', {
        user_id: id,
        is_accept: "1",
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })

      if (response.status === 200) {
        console.log(`Accep Friend with id: ${id} Success: `, response.data)
      } else {
        console.log('Fail, response data: ', response.data)
        console.log('Response Status: ', response.status)
        Alert.alert('Accept false: ', 'please try again')
      }
    } catch (error) {
      console.error('Acceept friends false:', error)
      Alert.alert('Acceept friends false', 'Please try again.');
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
    handleGetRequestFr();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonView}>
      <Button
            title="Your friends"
            type='clear'
            titleStyle={{ fontSize: 16, color: "#000000" }}
            style={{
              marginRight: 10,
              width: 'auto',
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 20,
              backgroundColor: "#cdd4cf",
            }}
            onPress={() => {
              navigation.navigate("FriendList")
            }}
          />

          <Button
            title="Suggestions"
            type='clear'
            titleStyle={{ fontSize: 16, color: "#000000" }}
            style={{
              marginRight: 10,
              width: 'auto',
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 20,
              backgroundColor: "#cdd4cf",
            }}
            onPress={() => {
              navigation.navigate({name: 'FriendSuggest'})
              console.log("Gợi ý");
            }}
          />
      </View>
      <Text style={styles.title}>Friend requests</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {friendRequestData.length > 0 ? (
            friendRequestData.map((item) => (
              <FriendRequestCard
                userId={item.id}
                avatarImage={item.avatar}
                userName={item.username}
                pressAccept={() => handleAcceptFr(item.id)}
                pressDel={() => {handleDelRequest(item.id)}}
                mutualFriend={item.same_friends}
                key={item.id}
              />
            ))
          ) : (
            <Text>Không có lời mời kết bạn nào ...</Text>
          )}
        </View>
      )}
    </ScrollView>
  )
}

export default FriendRequestScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%'
  },

  title: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
  },

  buttonView: {
    //backgroundColor: 'pink',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#cdd4cf",
  },
})