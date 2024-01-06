import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PostCard from "../../../components/PostCard";
import { Video, ResizeMode } from 'expo-av';
import { updateProfile } from "../../../redux/actions/profile.action";
const FeedScreen = () => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMoreTimeout, setLoadMoreTimeout] = useState(null);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetPosts(1);
    setRefreshing(false);
  };

  const handleGetPosts = async (pageNumber) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_URL}/get_list_posts`,
        {
          //user_id: 381,
          latitude: 1.0,
          longitude: 1.0,
          last_id: 0,
          index: (pageNumber - 1) * 20,
          count: 20,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (pageNumber === 1) {
        setPostData(response.data.data.post);
      } else {
        setPostData((prevData) => [...prevData, ...response.data.data.post]);
      }

      //console.log(response.data.data.post)

      setPage(pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải bài đăng:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      if (loadMoreTimeout) {
        clearTimeout(loadMoreTimeout);
      }

      setLoadMoreTimeout(
        setTimeout(() => {
          handleGetPosts(page);
        }, 300) 
      );
    }
  };

  useEffect(() => {
    handleGetPosts(1);
  }, []);

  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        
      </View>

      {/* <Video
            ref={video}
            //style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            style={{
              height: 200,
              width:'100%',
            }}
          />

          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          /> */}
      <FlatList
        data={postData}
        renderItem={({ item }) => <PostCard postDetail={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{

  }
});
