import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../../../components/ProfileCard';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PostCard from '../../../components/PostCard';

const SearchResultScreen = ({ route }) => {
  const { searchQuery } = route.params || {};

  const count = 20;
const navigation = useNavigation();
const [pressBtn, setPressBtn] = useState('all');
const [inputSearch, setinputSearch] = useState(searchQuery || '');
const currentUser = useSelector((state) => state.auth.currentUser);
const [loadingData, setLoadingData] = useState(true);

const handlePress = (buttonName) => {
  setPressBtn(buttonName);
};

const isButtonSelected = (buttonName) => {
  return pressBtn === buttonName;
};

const [index, setIndex] = useState(0);
const [listFrSearchData, setListFrSearchData] = useState([]);
const [listPostSearch, setListPostSearch] = useState([]);
const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(() => {
  setRefreshing(true);
  setRefreshing(false);
}, []);

const [visi, setVisi] = useState(true);
const hiddenVisi = () => {
  setVisi(false);
}

const SeeAll = () => {
  handleSearchUser();
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

const handleSearchUser = async () => {
  try {
    const response = await axios.post('https://it4788.catan.io.vn/search_user', {
      keyword: searchQuery,
      index: index*20,
      count: 20
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })

    if (response.status === 200) {
      console.log('Search friends success: ', index);
      
      if (index === 0) {
        setListFrSearchData(response.data?.data || []);
      } else {
        setListFrSearchData((listFrSearchData) => [...listFrSearchData, ...response.data?.data]);
      }
      setIndex(index +1);
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
  } finally {
    setLoadingData(false);
  }
}

const handleSearch = async (id) => {
  try {
    const response = await axios.post('https://it4788.catan.io.vn/search', {
      keyword: searchQuery,
      user_id: id || "",
      index: index*20,
      count: 20
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })

    if (response.status === 200) {
      console.log('Search success');
      setListPostSearch(response.data?.data || []);
    } else {
      console.log('Search fail, response data:', response.data);
      console.log('response status: ', response.status);
      Alert.alert('Search fail','please try again');
    }

  } catch (error) {
    console.error('Search false:', error)
    Alert.alert('Search false', 'Please try again.');
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
    handleSearch();
  }, []);

  return (
    <View style={styles.container}>
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
    {loadingData ? <Text>loading...</Text> : 
    <View>
        {pressBtn === 'all' ? 
          <View style={styles.all}>
              <ScrollView style={{marginBottom: '40%',}}>
                <View style={{borderBottomWidth: 5, borderColor: 'gray',}}>
                  <Text style={{fontSize: 20, fontWeight: 600, padding: 18,}}>Mọi người</Text>
                  {listFrSearchData.length > 0 ? (listFrSearchData.map((item, key) => <ProfileCard
                    avatarImage={item.avatar}
                    userName={item.username}
                    userId={item.id}
                    // isNotFriend={item.isNotFriend}
                    blockUser={() => {
                      handleBlock(item.id);
                    }}
                    key={key}
                    />)
                  ) : <Text style={{paddingLeft: 10,}}>Không tìm thấy người dùng nào...</Text>}
                  {listFrSearchData.length === ((index-1)*20+count) ? 
                    <Button 
                      title={'See all'}
                      buttonStyle={{borderRadius: 10, marginHorizontal: 10, marginBottom: 10}}
                      onPress={() => {SeeAll()}}
                    />
                   : null}
                </View>
                <View style={{borderBottomWidth: 5, borderColor: 'gray',}}>
                  <Text style={{fontSize: 20, fontWeight: 600, padding: 18,}}>Bài viết</Text>
                  {listPostSearch.length > 0 ? (listPostSearch.map((item, key) => <PostCard postDetail={item} key={key} />)) : <Text style={{paddingLeft: 10,}}>Không tìm thấy bài viết nào...</Text>}
                </View>
              </ScrollView>
          </View> : <View></View>}
        {pressBtn === 'people' ? 
          <View style={styles.people}>
            <ScrollView style={{marginBottom: '40%',}}>
              {listFrSearchData.length > 0 ? 
              <View>
                    <View>
                      {listFrSearchData.map((item, key) => <ProfileCard
                        avatarImage={item.avatar}
                        userName={item.username}
                        userId={item.id}
                        // isNotFriend={item.isNotFriend}
                        key={key}
                        />)
                      }
                    </View>
                
              </View>
              : <Text style={{paddingLeft: 10,}}>Không tìm thấy người dùng nào...</Text>}
              {listFrSearchData.length === ((index-1)*20+count) ? 
                      <Button 
                        title={'See all'}
                        buttonStyle={{borderRadius: 10, marginHorizontal: 10, marginBottom: 10}}
                        onPress={() => SeeAll()}
                      />
              : null}
            </ScrollView>
          </View> : 
          <View></View>
        }

        {pressBtn === 'Post' ? 
          <View style={styles.post}>
            <View>
              {listPostSearch.length > 0 ? <FlatList
                data={listPostSearch}
                renderItem={({ item }) => <PostCard postDetail={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={{marginBottom: '40%',}}
                // onEndReachedThreshold={0.5}
                // onEndReached={handleLoadMore}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              /> : <Text style={{paddingLeft: 10,}}>Không tìm thấy bài viết nào...</Text>}
          </View>
          </View> : 
          <View></View>
        }
    </View>
    }
    </View>

  )
}

export default SearchResultScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
  },

  option: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#e4e6eb',
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
    justifyContent: 'center',
    alignItems: 'center',
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