import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input } from '@rneui/themed'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import FriendRequestCard from '../../../components/FriendRequestCard';
import ProfileCard from '../../../components/ProfileCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const FriendListScreen = () => {

  const [index, setIndex] = useState("0");
  const [friendListData, setFriendListData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [count, setCount] = useState(0);
  const handleListFriend = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_user_friends', {
        index: index,
        count: "10", 
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        console.log('Get friends success');
        setFriendListData(response.data?.data?.friends || []);
        setCount(response.data?.data?.total || 0);
      } else {
        console.log('Get friends fail, response data:', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Get fail','please try again');
      }
    } catch (error) {
      console.error('Get friends false:', error)
      Alert.alert('Get friends false', 'Please try again.');
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

  useEffect(() => {
    handleListFriend();
  }, []);

  const navigation = useNavigation();

  const handleSearch = () => {
    console.log('search')
  }

  return (
    <ScrollView>
      <View style={styles.searchBar}>
        <Input
          leftIcon={<FontAwesomeIcon icon={faSearch}/>}
          placeholder='Tìm kiếm bạn bè'
          onSubmitEditing={handleSearch}
        />
      </View>

      <View style={styles.friendCount}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          {count} Bạn bè
        </Text>

        <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#2089dc',
            }}
          >
            Sắp xếp
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.friendList}>
        <View>
        {friendListData.map((item) => <ProfileCard
            userId={item.id}
            avatarImage={item.avatar}
            userName={item.username}
            key={item.id}
          />)
        }
        </View>
      </View>
    </ScrollView>
  )
}

export default FriendListScreen

const styles = StyleSheet.create({
  searchBar: {
    height: 60
  },

  friendCount: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },

  friendList: {
    marginTop: 10,
  },
})