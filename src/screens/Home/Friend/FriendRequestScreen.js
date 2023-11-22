import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import FriendRequestCard from '../../../components/FriendRequestCard'
import { Button } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const FriendRequestScreen = () => {

  const navigation = useNavigation();

  const friendRequestData = [
    {
      userId: '1',
      userName: 'Peter Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349'
    },
    {
      userId: '2',
      userName: 'Meg Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840'
    },    
    {
      userId: '3',
      userName: 'Lois Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/7/7c/FamilyGuy_Single_LoisPose_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171843'
    },    
    {
      userId: '4',
      userName: 'Stewie Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/9/90/FamilyGuy_Single_StewieBackpack_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171841'
    },    
    {
      userId: '5',
      userName: 'Chris Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/e/ee/FamilyGuy_Single_ChrisText_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202356'
    },
    {
      userId: '6',
      userName: 'Brian Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/c/c2/FamilyGuy_Single_BrianWriter_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230807152447'
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonView}>
      <Button
            title="Bạn bè"
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
            title="Gợi ý"
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
              console.log("Gợi ý");
            }}
          />
      </View>
      <Text style={styles.title}>Lời mời kết bạn</Text>
      <View>
      {friendRequestData.map((item) => <FriendRequestCard
          userId={item.userId}
          avatarImage={item.avatarImage}
          userName={item.userName}
          key={item.userId}
        />)
      }
      </View>
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