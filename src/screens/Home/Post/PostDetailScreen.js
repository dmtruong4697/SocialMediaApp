import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostCard from '../../../components/PostCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MarkCard from '../../../components/MarkCard';

const PostDetailScreen = ({route}) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [postDetail, setPostDetail] = useState(route.params.postDetail);
  const [mark, setMark] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      handleGetPost();
      handleGetMark();
    }, 1000);
  }, []);

  const handleGetPost = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_post",
        {
          id: postDetail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      
      setPostDetail(response.data.data);
      //console.log(postDetail)
    } catch (error) {
      console.error("Lỗi khi tải bài viết này:", error.response);
    }
  };

  const handleGetMark = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_mark_comment",
        {
          id: postDetail.id,
          index: 0,
          count: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      
      setMark(response.data.data);
      //console.log(response.data.data)
    } catch (error) {
      console.error("Lỗi khi tải mark:", error.response);
    }
  };

  useEffect(() => {
    handleGetMark();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      automaticallyAdjustKeyboardInsets={true}
    > 
      <View>
        <PostCard postDetail={postDetail}/>
      </View>

      <View style={styles.comment}>
        {mark.map((item) => <MarkCard markDetail={item} postDetail={postDetail}/>)}
      </View>

      <View style={styles.input}>
        <TextInput 
          multiline 
          style={styles.inputField}
          placeholder='Nhập mark ...'
        />
      </View>
    </ScrollView>

  )
}

export default PostDetailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },

  comment: {

  },

  input: {
    width: '100%',
    height: 60,
    //backgroundColor: 'pink',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 5,
    padding: 3,
  },

  inputField: {
    fontSize: 17,
    borderWidth: 1,
    height: 60,
    width: '85%',
    borderColor: 'gray',
    borderRadius: 18,
    padding: 5,
  }
})