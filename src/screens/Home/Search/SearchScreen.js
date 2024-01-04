import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import ProfileCard from '../../../components/ProfileCard';
import { useSelector } from 'react-redux';
import SearchRecent from '../../../components/SearchRecent';
import axios from 'axios';

const SearchScreen = () => {

  const navigation = useNavigation();
  const [inputSearch, setinputSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [index, setIndex] = ('1');
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    handleRecentSearch();
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const handleRecentSearch = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_saved_search', {
        index: (index-'0' -1) * 20,
        count: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })

      if (response.status === 200) {
        console.log('get Save Search success: ', response.data.data);
        setSearchData(response.data.data || []);
      } else {
        console.log('get Search friends fail, response data:', response.data);
        console.log('response status: ', response.status);
        Alert.alert('Get Search fail','please try again');
      }

    } catch (error) {
      console.error('get Search recent false:', error)
      Alert.alert('get Search recent false', 'Please try again.');
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

  const handleDelSaveSearch = async (id, all) => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/del_saved_search', {
        search_id: id,
        all: all,
      }, 
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })

      if (response.status === 200) {
        console.log('delete search success');
      } else {
        console.log ('delete fail: response data: ', response.data);
        console.log('response status: ', response.status);
        Alert.alert("delete fail:", 'please try again!');
      }
    } catch (error) {
      console.error('delete Search recent false:', error)
      Alert.alert('delete Search recent false', 'Please try again.');
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
    handleRecentSearch();
  }, []);

  return (
    <View style={styles.Component}>
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
        <Text style={{fontSize: 18, fontWeight: 600}}>Gần đây</Text>
        <Button
          title='Xem tất cả'
          titleStyle={{fontSize: 17, fontWeight: 400}}
          type='clear'
          buttonStyle={{padding: 0, margin: 0}}
          onPress={() => {navigation.navigate('HistorySearch', {searchHistoryData: searchData});}}
        />
      </View>
      <View style={styles.all}>
      <FlatList
          data={searchData}
          renderItem={({item}) => (item.id % 2 ? <SearchRecent
          textSearch = {item.keyword}
          style={{marginBottom: '30%',}}
          deleteSaveSearch = {() => {handleDelSaveSearch(item.id, '0')}}
          searchAgain={() => navigation.navigate('SearchResult', { searchQuery: item.keyword })}
        /> : null)}
          keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
    </View>
    </View>

    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  Component: {
    marginTop: '10%',
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