import { StyleSheet, Text, View,Modal, TouchableOpacity, Image, ScrollView ,FlatList, RefreshControl} from 'react-native';
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
import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
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
const [addedFriend, setAddedFriend] = useState(false);
const [showUnFriend, setShowUnFriend] = useState(false);
const [theyAddedFriend, setTheyAddedFriend] = useState(false);
const [videoData,setVideoData] = useState([])
const [isInMain, setIsInMain] = useState(true)
const video = React.useRef(null);
const win = Dimensions.get('window');
const ratio = win.width/541;
const [refreshing, setRefreshing] = useState(false);
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
};


const handleProfile = async () => {
  console.log("get profile user")
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
    if(response.data.data.is_friend=='1'){
      setIsFriend(true)
    }
    if(response.data.data.is_friend=='2'){
      setIsFriend(false)
      setAddedFriend(true)
    }
    if(response.data.data.is_friend =='0'){
      setIsFriend(false)
    }
    if(response.data.data.is_friend == '3'){
      setTheyAddedFriend(true);
      setIsFriend(false);
      setAddedFriend(false);
    }
    //console.log(response.data.data)
    if (response.status === 200) {
      //console.log('Get profile data succcess');
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
      setIsFriend(false)
      setAddedFriend(true)
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
const handleDeleteReqFriend = async()=>{
  try {
    const response = await axios.post('https://it4788.catan.io.vn/del_request_friend', {
      user_id: user_id
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    
    
    if (response.status === 200||response.status === 201) {
      setAddedFriend(false);
      setIsFriend(false)
      console.log("delete request friend success")
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
const handleUnfriend = async()=>{
  try {
    console.log("hello mai dinh cong")
    const response = await axios.post('https://it4788.catan.io.vn/unfriend', {
      user_id: user_id
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    
    
    if (response.status === 200||response.status === 201) {
      setAddedFriend(false);
      setIsFriend(false)
      console.log("unfriend request success")
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
const handleAcceptFriendReq =async()=>{
  try {
    const response = await axios.post('https://it4788.catan.io.vn/set_accept_friend', {
      user_id: user_id,
      is_accept: "1",
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    })

    if (response.status === 200 || response.status ===201) {
      setIsFriend(true)
      setAddedFriend(false)
      setTheyAddedFriend(false);
      console.log(`Accep Friend with id:  Success: `, response.data)
    } else {
      console.log('Fail, response data: ', response.data)
      console.log('Response Status: ', response.status)
      Alert.alert('Accept false: ', 'please try again')
    }
  } catch (error) {
    console.error('Acceept friends false:', error)
    Alert.alert('Acceept friends false', 'Please try again.');
      //chi tiết lỗi
    if (error.response) {
      // Server trả về response với mã lỗi
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
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
const onRefresh = async () => {
  setRefreshing(true);
  console.log("this is refresh")
  // Gọi các hàm xử lý cần thiết để lấy dữ liệu mới, ví dụ:
  await handleProfile();
  await handleGetPosts(1);
  await handleCountFriend();
  await handleGetVideos();

  setRefreshing(false);
};
const handleClickFriend = ()=>{
  setShowUnFriend(true)
}
useEffect(() => {
// alert("handle get post")
  handleGetPosts(1);
}, [route.params]);
useEffect(()=>{
  handleGetVideos();
},[])
useEffect(() => {
  // alert("hello world")
  handleProfile();
  if(profileData.is_friend==0){
    setIsFriend(true);
  }
}, [profileData.avatar, route.params]);
useEffect(()=>{
  
  handleCountFriend();
},[route.params])

  return (
    <ScrollView onPress = {()=>{
      console.log("hello")
      setShowUnFriend(false)
    }}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
          {isFriend?
            <Button
            title="Bạn bè"  // Conditional rendering
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
            style={{
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
              handleClickFriend();
            }}
          />
          :
          addedFriend?
          <Button
            title= "Hủy lời mời"// Conditional rendering
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
            style={{
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
             
                handleDeleteReqFriend();
              
            }}
          />
          :
          theyAddedFriend?
          <Button
            title= "Xác nhận"// Conditional rendering
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
            style={{
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
                handleAcceptFriendReq();
                
              
            }}
          />
          :
          <Button
            title= "Thêm bạn bè"// Conditional rendering
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
            style={{
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
                handleSendFriendReq();
                
              
            }}
          />
        }
        
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
            onPress={()=>{
              setIsInMain(true)
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
            onPress={()=>{
              setIsInMain(false)
            }}
          />
        </View>
        
      </View>
      {isInMain?
      <View>
      <View style = {styles.detail_infor}>
        <View style = {{marginBottom: 15}}>
          <Text style = {{fontSize: 18, fontWeight: 700}}>Chi tiết</Text>
        </View>
          {profileData.description!=""&&(
          <View style = {styles.infor}>
            <Image source={description_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15, flexShrink:1}}>{profileData.description}</Text>
          </View>
          )}
          {profileData.address!=""&&(
          <View style = {styles.infor}>
            
            <Image source={address_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.address}</Text>
          </View>
          )}
          {profileData.city!=""&&(
          <View style = {styles.infor}>
            <Image source={city_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.city}</Text>
          </View>
          )}
          {profileData.country!=""&&(
          <View style = {styles.infor}>
            <Image source={countries_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profileData.country}</Text>
          </View>
)}
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
              navigation.navigate('FriendList', {user_id: user_id});
              console.log(user_id);
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
      :
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
}
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={showUnFriend}
        onRequestClose={() => setShowUnFriend(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Are you sure you want to unfriend?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                title="Cancel"
                type="clear"
                titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
                style={{
                  borderRadius: 8,
                  backgroundColor: '#BADFFC'
                }}
                onPress={() => setShowUnFriend(false)}
              />
              <Button
                title="Unfriend"
                type="clear"
                titleStyle={{ fontSize: 18, color: '#0780DC', fontWeight: 600 }}
                style={{
                  borderRadius: 8,
                  backgroundColor: '#BADFFC'
                }}
                onPress={() => {
                  // Handle unfriend logic here
                  handleUnfriend();
                  setShowUnFriend(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
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
