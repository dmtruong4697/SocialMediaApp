import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/themed'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import FriendRequestCard from '../../../components/FriendRequestCard';

const FriendListScreen = () => {

  const friendListData = [
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

  const navigation = useNavigation();
  const [count, setCount] = useState(0);

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
        {friendListData.map((item) => <FriendRequestCard
            userId={item.userId}
            avatarImage={item.avatarImage}
            userName={item.userName}
            key={item.userId}
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