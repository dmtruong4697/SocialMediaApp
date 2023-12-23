import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PostCard from '../../../components/PostCard';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MarkCard from '../../../components/MarkCard';
import { useHeaderHeight } from '@react-navigation/elements';
import PostCardDetail from '../../../components/PostCardDetail';
import { changeInputType, changeMarkId } from '../../../redux/actions/post.action';

const PostDetailScreen = ({ route }) => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const inputType = useSelector((state) => state.post.inputType);
  const markId = useSelector((state) => state.post.markId);

  const [postDetail, setPostDetail] = useState(route.params.postDetail);
  const [mark, setMark] = useState([]);
  const [newMark, setNewMark] = useState("");
  const [newReply, setNewReply] = useState("");
  //const [inputType, setInputType] = useState("Mark");

  //focus input tạo mark khi nhấn nút "tạo mark"
  const inputMarkRef = useRef(null);
  const handleAddMarkPress = () => {
    inputMarkRef.current.focus();
  };

  useEffect(() => {
    if(inputType == 'Reply') handleAddMarkPress();
  }, [inputType])

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
        `${BACKEND_URL}/get_post`,
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
      console.error('Lỗi khi tải bài viết này:', error.response);
    }
  };

  const handleGetMark = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/get_mark_comment`,
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
      console.error('Lỗi khi tải mark:', error.response);
    }
  };

  useEffect(() => {
    handleGetMark();
  }, []);

  const handleSetMark = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/set_mark_comment`,
        {
          id: postDetail.id,
          content: newMark,
          index: 0,
          count: 10,
          mark_id: "",
          type: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      handleGetMark();
      setNewMark("");

      //setMark(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Lỗi khi tạo mark:', error.response);
    }
  };

  const handleReplyMark = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/set_mark_comment`,
        {
          id: postDetail.id,
          content: newMark,
          index: 0,
          count: 10,
          mark_id: markId,
          type: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      handleGetMark();
      setNewMark("");

      //setMark(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Lỗi khi reply mark:', error.response);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Text>{inputType}</Text>
        <Text>{markId}</Text> */}
        {/* <TouchableOpacity
          onPress={() => {
            if(inputType == 'Mark') dispatch(changeInputType("Reply"));
            if(inputType == 'Reply') dispatch(changeInputType("Mark"))
          }}
        >
          <Text>doi input</Text>
        </TouchableOpacity> */}
        <View>
          <PostCardDetail
            postDetail={postDetail} 
            handleAddMarkButton={() => {
              inputMarkRef.current.focus();
            }} />
        </View>

        <View style={styles.comment}>
          {mark.map((item) => (
            <MarkCard 
              markDetail={item} 
              postDetail={postDetail} 
              key={item.id} 
              handleReplyButton={() => {
                inputMarkRef.current.focus();
              }}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.input}>
        <TextInput
          multiline
          ref={inputMarkRef}
          style={styles.inputField}
          placeholder={(inputType == 'Mark')? `Tạo Mark dưới tên ${currentUser.userName} ...`:`Phản hồi dưới tên ${currentUser.userName} ...`}
          value={newMark}
          onChangeText={(text) => setNewMark(text)}
          onBlur={() => {
            dispatch(changeInputType("Mark"));
            dispatch(changeMarkId(null));
          }}
        />

        <TouchableOpacity
          onPress={(inputType == 'Mark')? handleSetMark:handleReplyMark}
          style={{
            //backgroundColor: 'pink',
            width: 40,
            height: '60%',
            marginLeft: 5,
            marginTop: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image style={{height: 26, width: 26, }} source={require('../../../../assets/icons/send.png')}/>  
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  scrollContainer: {
    flex: 1,
  },

  comment: {},

  input: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    marginTop: 10,
    padding: 3,
    borderTopWidth: 1,
    borderTopColor: '#c4c4c4',
  },

  inputField: {
    fontSize: 17,
    borderWidth: 1,
    height: '60%',
    width: '85%',
    backgroundColor: '#ededed',
    borderColor: '#c4c4c4',
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginTop: 5,
  },
});
