
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import {React, useState} from 'react';

import { Input } from '@rneui/themed'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faListSquares, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../../components/ProfileCard';
const ListFriendScreen = () => {
  const friendListData = [
    {
      userId: '1',
      userName: 'Peter Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349',
      isNotFriend: false
    },
    {
      userId: '2',
      userName: 'Meg Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840',
      isNotFriend: false
    },    
    {
      userId: '3',
      userName: 'Lois Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/7/7c/FamilyGuy_Single_LoisPose_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171843',
      isNotFriend: false
    },    
    {
      userId: '4',
      userName: 'Stewie Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/9/90/FamilyGuy_Single_StewieBackpack_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171841',
      isNotFriend: false,
    },    
    {
      userId: '5',
      userName: 'Chris Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/e/ee/FamilyGuy_Single_ChrisText_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202356',
      isNotFriend: false
    },
    {
      userId: '6',
      userName: 'Brian Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/c/c2/FamilyGuy_Single_BrianWriter_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230807152447',
      isNotFriend: false
    },
  ]
  const [inputValue, setInputValue] = useState('');
  const handleSearch = ()=>{
    console.log("search")
  }
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style = {styles.listfriend_header}>
          <View>
            <Button
              title="Tất cả" 
              type="clear"
              titleStyle={{ fontSize: 15, color: '#0780DC',fontWeight: 700 }}
              style={{             
                borderRadius: 14,   
                backgroundColor:'#DFE8FA'           
              }}   
            />
          </View>
          <View>
            <Button
              title="Gần đây" 
              type="clear"
              titleStyle={{ fontSize: 15, color: '#303030',fontWeight: 700 }}
              style={{             
                borderRadius: 14,  
                backgroundColor:"#D1D1D2"            
              }}   
            />
          </View>
        </View>
        <View style = {styles.search_friend}>
          <Input
            leftIcon={<FontAwesomeIcon icon={faSearch}/>}
            placeholder='Tìm kiếm bạn bè'
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style = {styles.listfriend_contain}>
          {friendListData.map((item)=><ProfileCard
            avatarImage = {item.avatarImage}
            userName={item.userName}
            userId={item.userId}
            isNotFriend= {item.isNotFriend}
            key = {item.userId}
          />)}
        </View>
      </View>
    </ScrollView>
  )
}

export default ListFriendScreen

const styles = StyleSheet.create({
  container:{
    margin: 15
  },
  listfriend_header:{
    flexDirection:'row',
    gap: 10
  },
  input:{
    borderWidth: 1,
    borderColor: 'red',
  }
})