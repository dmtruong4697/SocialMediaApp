import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import ProfileCard from '../../../components/ProfileCard';

const SearchScreen = () => {

  const searchData = [
    {
      avatarImage: "https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349",
      userName: "John Doe",
      userId: '1',
      isNotFriend: false,
    },
  
    {
      avatarImage: "https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840",
      userName: "John Doe",
      userId: '2',
      isNotFriend: true,
    }
  ]

  const navigation = useNavigation();
  const [inputSearch, setinputSearch] = useState('');

  return (
    <ScrollView style={styles.Component}>
    <View style={styles.searchComponent}>
      <TouchableOpacity onPress={() =>
              navigation.navigate({name: 'Home'})
              }>
              <FontAwesomeIcon style={styles.iconSearch} icon={faAngleLeft} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInp}
        placeholder='Tìm kiếm trên Facebook'
        value={inputSearch}
        onChangeText={setinputSearch}
        onSubmitEditing={() => navigation.navigate('SearchResult', { searchQuery: inputSearch })}
      />
    </View>
    <View style={styles.searchRecent}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%'}}>
        <Text style={{fontSize: 18, fontWeight: 600}}>Recent searchs</Text>
        <Button
          title='See All'
          titleStyle={{fontSize: 17, fontWeight: 400}}
          type='clear'
          buttonStyle={{padding: 0, margin: 0}}
          onPress={() => {navigation.navigate({name: 'HistorySearch'})}}
        />
      </View>
      <View style={styles.all}>
      {searchData.map((item, key) => <ProfileCard
          avatarImage={item.avatarImage}
          userName={item.userName}
          userId={item.userId}
          isNotFriend={item.isNotFriend}
          key={key}
        />)
      }
    </View>
    </View>

    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  Component: {
    marginTop: '7%',
  },

  iconSearch: {
    marginRight: 10,
    padding: 10,
  },

  searchComponent: {
    flexDirection: 'row', 
    alignItems: 'center',  
    borderBottomWidth: 1, 
    borderColor: '#e9eaef',
    paddingBottom: '2%',
    paddingHorizontal: '3%',
  },

  searchInp: {
    backgroundColor: '#e9eaef',
    height: 40,
    fontSize: 17,
    flex: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
  },

  searchRecent: {
    paddingHorizontal: '3%',
  },
})