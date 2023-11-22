import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from "../../../../assets/icons/cv.png"
const ProfileScreen = () => {
  const navigation = useNavigation();
  const profile_infor = {
    cover_link : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Panoramic_santiago_bernabeu.jpg/1200px-Panoramic_santiago_bernabeu.jpg",
    avatar_link : "https://images2.thanhnien.vn/528068263637045248/2023/10/25/cristiano-ronaldo--1698197155420641244536.jpeg",
    username : "Mai Đình Công",
    address : "Số nhà 19, ngõ 169 đường Hoàng Mai",
    city : "Hà Nội",
    country : "Việt Nam",
    description: "Tôi là Mai Đình Công, hiện là sinh viên đại học bách khoa hà nội"
  }
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.image_profile}>
        <View style={styles.cover_image}>
          <TouchableOpacity style={styles.coverImage}>
              <Image style = {styles.image_cover}  source={{uri: profile_infor.cover_link}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.avatar_image}>
          <TouchableOpacity style={styles.avatarImage}>
            <Image style = {styles.image_avatar}  source={{uri: profile_infor.avatar_link}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.inforAndEdit}>
        <View style = {styles.name_profile}>
          <Text style = {{fontSize: 20, fontWeight: 700}} >{profile_infor.username}</Text>
        </View>
        <View style = {styles.friend_count}>
          <Text >999 Bạn Bè</Text>
        </View>
        <View style = {styles.edit_profile}>
          <Button
            title="Chỉnh sửa trang cá nhân"
            type="clear"
            titleStyle={{ fontSize: 18, color: '#0780DC',fontWeight: 600 }}
            style={{
              
              borderRadius: 8,
              backgroundColor: '#BADFFC'
            }}
            onPress={() => {
              
              navigation.navigate('EditProfile', {
                avatarLink: profile_infor.avatar_link,
                coverLink: profile_infor.cover_link,
                username: profile_infor.username,
                address: profile_infor.address,
                city: profile_infor.city,
                country: profile_infor.country,
                description: profile_infor.description
              });
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
            <Text style = {{fontSize: 15, flexShrink:1}}>{profile_infor.description}</Text>
          </View>
          <View style = {styles.infor}>
            
            <Image source={address_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profile_infor.address}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={city_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profile_infor.city}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={countries_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{profile_infor.country}</Text>
          </View>
          
      </View>
      <View style = {styles.friend_container}>
        <Text style = {{fontSize: 18, fontWeight: 700}}>Bạn bè</Text>
        <Text style = {{fontSize: 18}}>999 bạn bè</Text>
        <View style = {{marginTop: 10}}>
        <Button
            title="Xem tất cả bạn bè"
            type="clear"
            titleStyle={{ fontSize: 15, color: '#303030',fontWeight: 700 }}
            style={{             
              borderRadius: 8,     
              backgroundColor: '#E0E0E0'         
            }}
           
          />
        </View>
      </View>
      <View style = {styles.container_add_post}>
        <View style = {styles.add_post_avatar}>
          <Image style = {{borderRadius: 1000, width: 50,height: 50}}  source={{uri: avatar_link}}/>
        </View>
        <View style = {{marginLeft: 10}}>
          <Text style = {{fontSize: 16}}>Bạn đang nghĩ gì?</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;

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
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
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
