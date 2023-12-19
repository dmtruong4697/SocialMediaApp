import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import NotificationCard from '../../../components/NotificationCard'
import axios from 'axios';
import { useSelector } from 'react-redux';

const NotificationScreen = () => {
  const [index, setIndex] = useState("0");
  const [notificationData, setNotificationData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [count, setCount] = useState(0);

  const typeList = () => {

  }

  const handleListNotification = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_notification', {
        index: index,
        count: "10",
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      if (response.status === 200) {
        console.log('Get notification success');
        console.log(response.data?.data);
        setNotificationData(response.data?.data || []);
      } else {
        console.log('Get notifications fail, response data:', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Get fail', 'please try again');
      }
    } catch (error) {
      console.error('Get notifications false:', error)
      Alert.alert('Get notifications false', 'Please try again.');
      if (error.response) {
        console.error('response data: ', error.response.data);
        console.error('response status: ', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Lỗi không xác định:', error.message);
      }
    }
  }

  const formatTime = (timeString) => {
    const currentTime = new Date();
    const createdTime = new Date(timeString);
    const timeDiff = currentTime - createdTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }

  useEffect(() => {
    handleListNotification();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trước đó</Text>

      {notificationData && Array.isArray(notificationData) && (
        notificationData.map((item) => (
          <NotificationCard
            notificationId={item.notification_id}
            notificationImage={item.avatar}
            key={item.notification_id}
            title={item.title}
            time={formatTime(item.created)}
            type={item.type}
            objectId={item.object_id}
            group={item.group}
            user={item.user}
          />
        ))
      )}
    </ScrollView>

  )
}

export default NotificationScreen

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
  }
})