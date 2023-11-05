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
      
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})