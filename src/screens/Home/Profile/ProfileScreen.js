import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import address_icon from "../../../../assets/icons/address.png";
import city_icon from "../../../../assets/icons/location.png";
import countries_icon from "../../../../assets/icons/countries.png";
import description_icon from "../../../../assets/icons/cv.png";
import ListFriendScreen from "./ListFriendScreen";
import PostCard from "../../../components/PostCard";
import { updateProfile } from "../../../redux/actions/profile.action";

import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CreatePostScreen from '../Post/CreatePostScreen';
const ProfileScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);
  const [videoData, setVideoData] = useState([])
  const currentUser = useSelector((state) => state.auth.currentUser);
  const profileData = useSelector((state) => state.profile);
  const user_id = currentUser.id
  //const [profileData, setProfileData] = useState({});
  const [countFriend, setCountFriend] = useState(0);
  const [index, setIndex] = useState("0")
  const [friendListData, setFriendListData] = useState([]);
  const [isMyProfile, setMyProfile] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [isInMain, setIsInMain] = useState(true)
  const win = Dimensions.get('window');
  const ratio = win.width/541;
  const handleGetPosts = async (pageNumber) => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_list_posts",
        {
          user_id: user_id,
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
      setPostData(response.data.data.post);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const handleGetVideos = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_list_videos",
        {
          user_id: user_id,
          in_campaign: 1,
          campaign_id:1,
          latitude: 1.0,
          longitude: 1.0,
          last_id: null,
          index: 0,
          count: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
     // console.log(response.data.data.post)
      setVideoData(response.data.data.post);
      console.log(videoData)
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }

  const handleProfile = async () => {
    try {
      const response = await axios.post('https://it4788.catan.io.vn/get_user_info', {
        user_id: user_id
      },
      
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
        
      );
      const newProfile = {
        username:response.data.data.username,
        description: response.data.data.description,
        
        avatar: response.data.data.avatar,
        address: response.data.data.address,
        city: response.data.data.city,
        country: response.data.data.country,
        cover_image: response.data.data.cover_image,
        link: ""
        
      };
      
     // setProfileData(response.data.data);
      dispatch(updateProfile(newProfile));
      // console.log(profileData)
      //console.log(response.data.data);
      
      if (response.status === 200) {
        console.log("Get profile data succcess");
        setProfileData(response.data.data);
      } else {
        //console.log("response status: ", response.status);
      }
    } catch (error) {
      console.error("Get data fail");

      if (error.response) {
        console.error("response data: ", error.response.data);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Lỗi không xác định:", error.message);
      }
    }
  };
  const handleCountFriend = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_user_friends",
        {
          index: index,
          count: "5",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setCountFriend(response.data?.data?.total || 0);
      setFriendListData(response.data?.data?.friends || []);
      
      if (response.status === 200||response.status === 201) {
        setCountFriend(response.data?.data?.total || 0);
      } else {
        Alert.alert("Get fail");
      }
    } catch (error) {
      if (error.response) {
        console.error("response data: ", error.response.data);
      }
    }
  };
 // console.log(profileData);
  useEffect(() => {
    // alert("handle get post")
    handleGetPosts(1);
  }, []);
  useEffect(()=>{
    handleGetVideos();
  },[])
  useEffect(() => {
    // alert("hello world")
    handleProfile();
  }, [profileData]);
  useEffect(() => {
    handleCountFriend();
    if(user_id!=currentUser.id){
      setMyProfile(false);
      for(let i= 0;i<friendListData.length;i++){
        console.log(friendListData[i].id)
        if(friendListData[i].id==user_id){
          setIsFriend(true);
          
          break;
        }
      }
    }
    
  },[])
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.image_profile}>
          <View style={styles.cover_image}>
            <TouchableOpacity style={styles.coverImage}>
              <Image
                style={styles.image_cover}
                source={{ uri: profileData.cover_image }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.avatar_image}>
            <TouchableOpacity style={styles.avatarImage}>
              <Image
                style={styles.image_avatar}
                source={{ uri: profileData.avatar }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inforAndEdit}>
          <View style={styles.name_profile}>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>
              {profileData.username}
            </Text>
          </View>
          <View style={styles.friend_count}>
            <Text>{countFriend} Bạn Bè</Text>
          </View>
          <View style={styles.edit_profile}>
            <Button
              title="Chỉnh sửa trang cá nhân"
              type="clear"
              titleStyle={{ fontSize: 18, color: "#0780DC", fontWeight: 600 }}
              style={{
                borderRadius: 8,
                backgroundColor: "#BADFFC",
              }}
              onPress={() => {
                navigation.navigate("EditProfile", {
                  avatar: profileData.avatar,
                  cover_image: profileData.cover_image,
                  username: profileData.username,
                  address: profileData.address,
                  city: profileData.city,
                  country: profileData.country,
                  description: profileData.description,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.navbar_profile}>
          <View style={styles.navbar_baiviet}>
            <Button
              title="Bài viết"
              type="clear"
              titleStyle={{ fontSize: 15, color: "#0780DC", fontWeight: 700 }}
              style={{
                borderRadius: 15,
                backgroundColor: "#CCFFFF",
              }}
              onPress={()=>{
                setIsInMain(true)
              }}
            />
          </View>
          <View style={styles.navbar_video}>
            <Button
              title="Video"
              type="clear"
              titleStyle={{ fontSize: 15, color: "#303030", fontWeight: 700 }}
              style={{
                borderRadius: 8,
              }}
              onPress={()=>{
                setIsInMain(false);
              }}
            />
          </View>
        </View>
        {isInMain?
        <View style = {styles.main_profile}>
          <View style={styles.detail_infor}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Chi tiết</Text>
            </View>
            {profileData.description!=""&&(
            <View style={styles.infor}>
              <Image source={description_icon} style={styles.icon_infor} />
              <Text style={{ fontSize: 15, flexShrink: 1 }}>
                {profileData.description}
              </Text>
            </View>
            )}
            {profileData.address!=""&&(
            <View style={styles.infor}>
              <Image source={address_icon} style={styles.icon_infor} />
              <Text style={{ fontSize: 15 }}>{profileData.address}</Text>
            </View>
            )}
            {profileData.city!=""&&(
            <View style={styles.infor}>
              <Image source={city_icon} style={styles.icon_infor} />
              <Text style={{ fontSize: 15 }}>{profileData.city}</Text>
            </View>
            )}   
            {profileData.country!=""&&(
            <View style={styles.infor}>
              <Image source={countries_icon} style={styles.icon_infor} />
              <Text style={{ fontSize: 15 }}>{profileData.country}</Text>
            </View>
            )}
          </View>
          <View style={styles.friend_container}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>Bạn bè</Text>
            <Text style={{ fontSize: 18 }}>{countFriend} bạn bè</Text>
            <View style={{ marginTop: 10 }}>
              <Button
                title="Xem tất cả bạn bè"
                type="clear"
                titleStyle={{ fontSize: 15, color: "#303030", fontWeight: 700 }}
                style={{
                  borderRadius: 8,
                  backgroundColor: "#E0E0E0",
                }}
                onPress={() => {
                  navigation.navigate("FriendList");
                }}
              />
            </View>
          </View>
          <View style={styles.container_add_post}>
            <View style={styles.add_post_avatar}>
              <Image
                style={{ borderRadius: 1000, width: 50, height: 50 }}
                source={{ uri: profileData.avatar }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Button
                style={{ fontSize: 16, backgroundColor: "none" }}
                title="Bạn đang nghĩ gì"
                onPress={() => {
                  navigation.navigate("CreatePost");
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={postData}
              renderItem={({ item }) => <PostCard postDetail={item} />}
              keyExtractor={(item) => item.id.toString()}
              onEndReachedThreshold={0.5}
              // onEndReached={handleLoadMore}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            />
          </View>
        </View>
        :
        <View style = {styles.main_video}>
          <View style = {styles.main_video}>
        {videoData.map((item, index) => (
  item.author.id == user_id && (
    <Video
      key={index}
      ref={video}
      source={{
        uri: item.video.url,
      }}
      useNativeControls
      resizeMode='cover'
      isLooping
      style={{
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: 362 * ratio, 
        marginBottom: 20
      }}
    />
  )
))}

      </View>
        </View>
}
      </View>
              
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar_image: {
    position: "absolute",

    marginLeft: 10,
    marginTop: 80,
  },
  avatarImage: {
    flex: 1,
  },
  cover_image: {
    flex: 1,
  },
  image_cover: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  image_avatar: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderRadius: 1000,
  },

  inforAndEdit: {
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  name_profile: {
    marginBottom: 18,
  },
  friend_count: {
    marginBottom: 18,
  },
  navbar_profile: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
  },
  detail_infor: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,

    flexDirection: "column",
    alignItems: "stretch",
  },
  friend_container: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
    paddingBottom: 30,
  },
  description_container: {
    marginBottom: 10,
  },
  address_container: {
    marginBottom: 10,
  },
  container_add_post: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  icon_infor: {
    width: 20,
    height: 20,
  },
  infor: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 15,
    gap: 12,
  },
  main_video: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#000', // Set a background color for the video container
    marginBottom: 20,
  },

  video: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
