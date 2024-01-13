import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import NotificationCard from '../../../components/NotificationCard'
import axios from 'axios';
import { useSelector } from 'react-redux';

const NotificationScreen = () => {
  const [notificationData, setNotificationData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [count, setCount] = useState(0);
  const [newNotiData, setNewNotiData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const countNewItem = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/check_new_items', {
        last_id: "0",
        category_id: "1",
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      if (response.status === 200) {
        console.log('Get check new items success', response.data?.data);
        if (count !== parseInt(response.data?.data?.new_items)) {
          setCount(parseInt(response.data?.data?.new_items));
        }
      } else {
        console.log('Get check new items fail, response data:', response.data);
      }
    } catch (error) {
      console.error('Lỗi không xác định:', error);
    }
  }

  const handleNewItems = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_notification', {
        index: "0",
        count: count,
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      if (response.status === 200) {
        //console.log('Get notification success', response.data);
        setNewNotiData(response.data?.data || []);
      } else {
        console.log('Get notifications fail, response data:', response.data);
      }
    } catch (error) {
      console.error('Get notifications false:', error)
    }
  }


  const handleListNotification = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_notification', {
        index: count,
        count: 20,
      },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      if (response.status === 200) {
        //console.log('Get notification success', response.data);
        setNotificationData(response.data?.data || []);
      } else {
        console.log('Get notifications fail, response data:', response.data);
      }
    } catch (error) {
      console.error('Get notifications false:', error)
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
    countNewItem();

  }, []);
  useEffect(() => {
    handleNewItems();
    handleListNotification();
  }, [count]);

  const onRefresh = async () => {
    setRefreshing(true);
    await countNewItem();
    handleNewItems();
    handleListNotification();
    setRefreshing(false);
  };



  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <Text style={styles.title}>Mới</Text>
      {newNotiData && Array.isArray(newNotiData) && (
        newNotiData.map((item) => (
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
            read={item.read}
          />
        ))
      )}
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
            read={item.read}
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