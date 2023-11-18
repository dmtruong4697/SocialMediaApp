<<<<<<< HEAD
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCard from '../../../components/ProfileCard'
const NotificationScreen = () => {
  const ProfileData = [
    {
      userId: '1',
      userName: 'Peter Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349',
      isNotFriend: true
    },
    {
      userId: '2',
      userName: 'Meg Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840',
      isNotFriend: true,
    },    
    {
      userId: '3',
      userName: 'Lois Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/7/7c/FamilyGuy_Single_LoisPose_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171843',
      isNotFriend: true,
    },    
    {
      userId: '4',
      userName: 'Stewie Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/9/90/FamilyGuy_Single_StewieBackpack_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171841',
      isNotFriend: false
    },    
    {
      userId: '5',
      userName: 'Chris Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/e/ee/FamilyGuy_Single_ChrisText_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202356',
      isNotFriend: true
    },
  ]
  return (
    <ScrollView>
      {
        ProfileData.map((item)=><ProfileCard 
        userId={item.userId}
        avatarImage = {item.avatarImage}
        userName={item.userName}
        isNotFriend = {item.isNotFriend}
        key = {item.userId}

        />)
      }
    </ScrollView>
      
=======
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import NotificationCard from '../../../components/NotificationCard'

const NotificationScreen = () => {

  const notificationData = [
    {
      notificationId: '1',
      title: 'Peter Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: '1 ngày trước'
    },
    {
      notificationId: '2',
      title: 'Meg Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: '1 ngày trước'
    },
    {
      notificationId: '3',
      title: 'Lois Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/7/7c/FamilyGuy_Single_LoisPose_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171843',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: '1 ngày trước'

    },
    {
      notificationId: '4',
      title: 'Stewie Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/9/90/FamilyGuy_Single_StewieBackpack_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171841',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: '2 ngày trước'
    },
    {
      notificationId: '5',
      title: 'Chris Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/e/ee/FamilyGuy_Single_ChrisText_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202356',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: '3 ngày trước',
    },
    {
      notificationId: '6',
      title: 'Brian Griffin',
      notificationImage: 'https://static.wikia.nocookie.net/familyguy/images/c/c2/FamilyGuy_Single_BrianWriter_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230807152447',
      message: 'Đã bày tỏ cảm xúc về bình luận của bạn: nice fam',
      time: 'tuần trước'
    },
  ]

  return (
    <ScrollView>
      <Text style={styles.title}>Thông báo gần đây</Text>

      {notificationData.map((item) => <NotificationCard
        notificationId={item.notificationId}
        notificationImage={item.notificationImage}
        title={item.title}
        key={item.notificationId}
        message={item.message}
        time={item.time}
      />)
      }
    </ScrollView>
>>>>>>> 70d2bedf8b3f0b88fafd2be588a3870c12d3abac
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
  }
})