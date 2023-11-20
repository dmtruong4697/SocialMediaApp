import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image_profile}>
        <View style={styles.cover_image}>
          <TouchableOpacity style={styles.coverImage}>
              <Image style = {styles.image_cover}  source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Panoramic_santiago_bernabeu.jpg/1200px-Panoramic_santiago_bernabeu.jpg'}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.avatar_image}>
          <TouchableOpacity style={styles.avatarImage}>
            <Image style = {styles.image_avatar}  source={{uri: 'https://images2.thanhnien.vn/528068263637045248/2023/10/25/cristiano-ronaldo--1698197155420641244536.jpeg'}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.inforAndEdit}>
        <View style = {styles.name_profile}>
          <Text style = {{fontSize: 20, fontWeight: 700}} >Mai Đình Công</Text>
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
              console.log('chỉnh sửa trang cá nhân');
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
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  avatar_image:{
    marginTop: 80,
    marginLeft: 10
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
  image_profile:{
    backgroundColor:'red'
  },
  inforAndEdit:{
    marginTop: 180,
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
    marginTop: 15
  }

});
