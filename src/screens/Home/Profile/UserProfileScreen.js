import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView ,FlatList} from 'react-native';
import React ,{useEffect, useState} from 'react';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from "../../../../assets/icons/cv.png"
import ListFriendScreen from './ListFriendScreen';
import PostCard from "../../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CreatePostScreen from '../Post/CreatePostScreen';
const UserProfileScreen = ({route}) => {
  
const navigation = useNavigation();
const [postData, setPostData] = useState([]);
const currentUser = useSelector((state) => state.auth.currentUser);
const {user_id} = route.params;
const [profileData, setProfileData] = useState({});
const [countFriend, setCountFriend] = useState(0);
const [index, setIndex] = useState("0")
const [friendListData, setFriendListData] = useState([]);
const [myFriendListData, setMyFriendListData] = useState([])
const [isFriend, setIsFriend] = useState(false);
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



const handleProfile = async () => {
  
  try {
    const response = await axios.post('https://it4788.catan.io.vn/get_user_info', {
      user_id: user_id
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setProfileData(response.data.data);
    console.log("is friend: ", response.data.data.is_friend)
    if(response.data.data.is_friend=='0'){
      setIsFriend(false)
    }
    else{
      setIsFriend(true)
    }
    console.log(response.data.data)
    if (response.status === 200) {
      console.log('Get profile data succcess');
      setProfileData(response.data.data);
      
    } else {
      
      console.log('response status: ', response.status);
    }
  } catch (error) {
    console.error('Get data fail')
    
    if (error.response) {
      console.error('response data: ', error.response.data);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Lỗi không xác định:', error.message);
    }
  }
}
const handleCountFriend = async () => {
  
  try {
    const response = await axios.post('https://it4788.catan.io.vn/get_user_friends', {
      index: index,
      count: "5", 
      user_id: user_id
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    setCountFriend(response.data?.data?.total || 0);
    setFriendListData(response.data?.data?.friends || []);
    
    if (response.status === 200||response.status === 201) {
      setCountFriend(response.data?.data?.total || 0);
    } else {      
      Alert.alert('Get fail');
    }
  } catch (error) {     
    if (error.response) {
      console.error('response data: ', error.response.data);
      ;
    } 
  }
}
const handleSendFriendReq = async()=>{
  try {
    const response = await axios.post('https://it4788.catan.io.vn/set_request_friend', {
      user_id: user_id
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    
    
    if (response.status === 200||response.status === 201) {
      console.log("set req friend success")
    } else {      
      Alert.alert('Get fail');
    }
  } catch (error) {     
    if (error.response) {
      console.error('response data: ', error.response.data);
      ;
    } 
  }
}
useEffect(() => {
// alert("handle get post")
  handleGetPosts(1);
}, []);
useEffect(() => {
  // alert("hello world")
  handleProfile();
  if(profileData.is_friend!=0){
    setIsFriend(true);
  }
}, [profileData.avatar]);
useEffect(()=>{
  
  handleCountFriend();
},[])

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.image_profile}>
        <View style={styles.cover_image}>
          <TouchableOpacity style={styles.coverImage}>
              <Image style = {styles.image_cover}  source={{uri: profileData.cover_image}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.avatar_image}>
          <TouchableOpacity style={styles.avatarImage}>
            <Image style = {styles.image_avatar}  source={{uri: profileData.avatar}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.inforAndEdit}>
        <View style = {styles.name_profile}>
          <Text style = {{fontSize: 20, fontWeight: 700}} >{profileData.username}</Text>
        </View>
        <View style = {styles.friend_count}>
          <Text >{countFriend} Bạn Bè</Text>
        </View>
        <View style = {styles.edit_profile}>
        <Button
            title={isFriend ? "Bạn bè" : "Thêm bạn bè"} // Conditional rendering
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
            style={{
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
              // Handle the button press based on the isFriend state
              if (isFriend) {
                // Logic for handling existing friend scenario
                // ...
              } else {
                handleSendFriendReq();
              }
            }}
          />
        </View>
      </View>
      <View style = {styles.navbar_profile}>
        <View style = {styles.navbar_baiviet}>
          <Button
            title="Bài viết"
            type="clear"
            titleStyle={{ fontSize: 15, color: '#0780DC',fontWeight: 700 }}
            style={{              
              borderRadius: 15,    
              backgroundColor:'#CCFFFF',         
            }}
          />
        </View>
        <View style = {styles.navbar_video}>
          <Button
            title="Video"
            
            type="clear"
            titleStyle={{ fontSize: 15, color: '#303030',fontWeight: 700 }}
            style={{             
              borderRadius: 8,              
            }}
              
          />
        </View>
      </View>
      <View style = {styles.detail_infor}>
        <View style = {{marginBottom: 15}}>
          <Text style = {{fontSize: 18, fontWeight: 700}}>Chi tiết</Text>
        </View>
          <View style = {styles.infor}>
            <Image source={description_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15, flexShrink:1}}>{profileData.description}</Text>
          </View>
          <View style = {styles.infor}>
            
            <Image source={address_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.address}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={city_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.city}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={countries_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.country}</Text>
          </View>
          
      </View>
      <View style = {styles.friend_container}>
        <Text style = {{fontSize: 18, fontWeight: 700}}>Bạn bè</Text>
        <Text style = {{fontSize: 18}}>{countFriend} bạn bè</Text>
        <View style = {{marginTop: 10}}>
        <Button
            title="Xem tất cả bạn bè"
            type="clear"
            titleStyle={{ fontSize: 15, color: '#303030',fontWeight: 700 }}
            style={{             
              borderRadius: 8,     
              backgroundColor: '#E0E0E0'         
            }}
            onPress={()=>{
              navigation.navigate('FriendList');
            }}
          />
        </View>
      </View>
      
      <View style = {{flex: 1}}>
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
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  avatar_image:{
    position: 'absolute',
    
    marginLeft: 10,
    marginTop: 80
  },
  avatarImage: {
    flex: 1,
      
  },
  cover_image:{
    flex: 1,
  },
  image_cover: {
    
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  image_avatar:{
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 1000
  },
  
  inforAndEdit:{
    marginTop: 60,
    marginLeft: 10,
    marginRight: 10
  }, 
  name_profile:{
    marginBottom: 18
  },
  friend_count:{
    marginBottom: 18
  },
  navbar_profile:{
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1
  },
  detail_infor:{
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    
    flexDirection: 'column', 
    alignItems: 'stretch',
  },
  friend_container:{
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    paddingBottom: 30
  },
  description_container:{
    marginBottom: 10,

  },
  address_container:{
    marginBottom: 10,
  },
  container_add_post:{
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  icon_infor:{
    width: 20,
    height: 20
  },
  infor:{
    flexDirection:'row',
    alignItems:'center',
    
    marginBottom: 15,
    gap: 12
  }
});
