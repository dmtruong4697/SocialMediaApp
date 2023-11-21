import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {

  const navigation = useNavigation();
  const [inputSearch, setinputSearch] = useState('');

  return (
    <ScrollView style={styles.searchHeader}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 15}}>
      {/* <FontAwesomeIcon style={styles.iconSearch} icon={faAngleLeft} /> */}
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
        onSubmitEditing={() => navigation.navigate({name: 'SearchResult'})}
      />
    </View>
    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
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
})