import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../../../components/ProfileCard';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SearchResultScreen = ({ route }) => {
  const { searchQuery } = route.params || {};

const navigation = useNavigation();
const [pressBtn, setPressBtn] = useState('people');
const [inputSearch, setinputSearch] = useState(searchQuery || '');
const currentUser = useSelector((state) => state.auth.currentUser);

const handlePress = (buttonName) => {
  setPressBtn(buttonName);
};

const isButtonSelected = (buttonName) => {
  return pressBtn === buttonName;
};

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

const [index, setIndex] = useState('1');
const [listFrSearchData, setListFrSearchData] = useState([]);
const handleSearchUser = async () => {
  try {
    const response = await axios.post('https://it4788.catan.io.vn/search_user', {
      keyword: searchQuery,
      index: (index-'0'-1)*20,
      count: 20
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })

    if (response.status === 200) {
      console.log('Search friends success');
      setListFrSearchData(response.data?.data || []);
    } else {
      console.log('Search friends fail, response data:', response.data);
      console.log('response status: ', response.status);
      Alert.alert('Search fail','please try again');
    }

  } catch (error) {
    console.error('Search friends false:', error)
    Alert.alert('Search friends false', 'Please try again.');
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
    handleSearchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 15}}>
      <TouchableOpacity onPress={() =>
              navigation.navigate({name: 'Search'})
              }>
              <FontAwesomeIcon style={styles.iconSearch} icon={faAngleLeft} />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInp}
        placeholder='Search Facebook'
        value={inputSearch}
        onChangeText={setinputSearch}
        onSubmitEditing={() => navigation.navigate({name: 'SearchResult'})}
      />
    </View>
    <View style={styles.option}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.item}>
            <Button
              title='All'
              type='clear'
              onPress={() => handlePress('all')}
              titleStyle={[styles.titleBtn, isButtonSelected('all') && {color: '#0866ff'}]}
              buttonStyle={isButtonSelected('all') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Posts'
                type='clear'
                onPress={() => handlePress('Post')}
                titleStyle={[styles.titleBtn, isButtonSelected('Post') && {color: '#0866ff'} ]}
                buttonStyle={isButtonSelected('Post') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='People'
                type='clear'
                onPress={() => handlePress('people')}
                titleStyle={[styles.titleBtn, isButtonSelected('people') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('people') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Reels'
                type='clear'
                onPress={() => handlePress('reel')}
                titleStyle={[styles.titleBtn, isButtonSelected('reel') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('reel') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Groups'
                type='clear'
                onPress={() => handlePress('group')}
                titleStyle={[styles.titleBtn, isButtonSelected('group') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('group') && styles.stylePressOption}
            />
          </View><View style={styles.item}>
            <Button
                title='Pages'
                type='clear'
                onPress={() => handlePress('page')}
                titleStyle={[styles.titleBtn, isButtonSelected('page') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('page') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Videos'
                type='clear'
                onPress={() => handlePress('video')}
                titleStyle={[styles.titleBtn, isButtonSelected('video') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('video') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Photos'
                type='clear'
                onPress={() => handlePress('photo')}
                titleStyle={[styles.titleBtn, isButtonSelected('photo') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('photo') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Places'
                type='clear'
                onPress={() => handlePress('place')}
                titleStyle={[styles.titleBtn, isButtonSelected('place') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('place') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Events'
                type='clear'
                onPress={() => handlePress('event')}
                titleStyle={[styles.titleBtn, isButtonSelected('event') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('event') && styles.stylePressOption}
            />
          </View>
          <View style={styles.item}>
            <Button
                title='Marketplace'
                type='clear'
                onPress={() => handlePress('market')}
                titleStyle={[styles.titleBtn, isButtonSelected('market') && {color: '#0866ff'}]}
                buttonStyle={isButtonSelected('market') && styles.stylePressOption}
            />
          </View>
      </ScrollView>
    </View>
    <View style={styles.all}>
      <Text style={{fontSize: 20, fontWeight: 600, padding: 18,}}>People</Text>
      {listFrSearchData.map((item, key) => <ProfileCard
          avatarImage={item.avatar}
          userName={item.username}
          userId={item.id}
          // isNotFriend={item.isNotFriend}
          key={key}
        />)
      }
    </View>
    </ScrollView>
  )
}

export default SearchResultScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '7%',
  },

  option: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e4e6eb',
  },

  searchHeader: {
    marginTop: '7%',
  },

  iconSearch: {
    marginRight: 10,
    padding: 10,
  },

  searchInp: {
    backgroundColor: '#e9eaef',
    height: 40,
    fontSize: 17,
    flex: 1,
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  item: {
    // width: 150,
    // height: 100,
    // margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#e0e0e0',
  },
  titleBtn: {
    color: '#000000', 
    fontSize: 14,
    fontWeight: 500,
  },
  
  stylePressOption: {
    borderColor: '#0866ff', 
    borderBottomWidth: 2,
  },
})