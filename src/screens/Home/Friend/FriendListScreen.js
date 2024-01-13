import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
import React, { useState, useLayoutEffect, useCallback } from 'react'
import { Input } from '@rneui/themed'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import FriendRequestCard from '../../../components/FriendRequestCard';
import ProfileCard from '../../../components/ProfileCard';
import axios from 'axios';
import { useSelector } from 'react-redux';


const FriendListScreen = ({route}) => {

  const {user_id} = route.params || '';
  const [index, setIndex] = useState("0");
  const [friendListData, setFriendListData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const handleListFriend = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_user_friends', {
        index: index,
        count: "10",
        user_id: user_id,
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

      if (response.status === 200) {
        console.log('Get friends success');
        console.log(response.data?.data?.friends);
        setFriendListData(response.data?.data?.friends || []);
        setCount(response.data?.data?.total || 0);
      } else {
        console.log('Get friends fail, response data:', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Get fail', 'please try again');
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
    } finally {
      setLoadingData(false);
    }
  }

  const handleUnFriend = async (id) => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/unfriend', {
        user_id: id,
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })

      if (response.status === 200) {
        console.log(`UnFiend success id: ${id}, response data: `, response.data);
      } else {
        console.log('response data: ', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Unfriend fail:', 'please try again!');
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

  const handleBlock = async (id) => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/set_block', {
        user_id: id,
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })

      if (response.status === 200) {
        console.log('Block user success');
      } else {
        console.log('Block user fail, response data:', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Block user fail', 'please try again');
      }
    } catch (error) {
      console.error('Block user false:', error)
      Alert.alert('Block user false', 'Please try again.');
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

  useLayoutEffect(() => {
    handleListFriend();
  }, [route.params]);

  const handleSearch = () => {
    console.log('search')
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: 5,}}>
        <Input
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          placeholder='Tìm kiếm bạn bè'
          onSubmitEditing={handleSearch}
          inputContainerStyle={styles.searchInp}
          inputStyle={{fontSize: 16, height: 40,}}
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
        {loadingData ? <Text>Loading...</Text> : 
        <View>
          <FlatList 
            data={friendListData}
            renderItem={({item}) => <ProfileCard
            userId={item.id}
            isFriend={item.isFriend}
            avatarImage={item.avatar}
            userName={item.username}
            isFriendSearch={true}
            pressUnFriend={() => { handleUnFriend(item.id); setCount(count - '0' - 1) }}
            blockUser={() => { handleBlock(item.id); setCount(count - '0' - 1) }}
            mutualFriend={item.same_friends}
            />}
            keyExtractor={(item) => item.id.toString()}
            style={{marginBottom: '23%',}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
        }
      </View>
    </View>
  )
}

export default FriendListScreen

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    height: '100%',
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

  searchInp: {
    height: 35,
    fontSize: 16,
    borderBottomWidth: 0,
    backgroundColor: '#e9eaef',
    borderRadius: 100,
    paddingHorizontal: 15,
    marginHorizontal: 15,
  }
})