import { StyleSheet, Text, View,Modal, TouchableOpacity, Image, ScrollView,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from '../../../../assets/icons/cv.png'
import { updateProfile } from '../../../redux/actions/profile.action'; // Adjust the path based on your project structure


//import EditDescriptionScreen from './EditDescriptionScreen';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ProfileCard from '../../../components/ProfileCard';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const EditProfileScreen = ({route}) => {
  const { avatar, cover_image, username,address, city, country, description } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isEditDescription, setEditDescription] = useState(false)
  const [isMainEdit, setMainEdit] = useState(true)
  const [descriptionInput, setDescriptionInput] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);
  const profileData = useSelector((state) => state.profile);
  const handleSubmitDescription =async ()=>{
    try {
      const formData = new FormData();
      formData.append('username', username); // Empty value as specified in the API
      formData.append('description', descriptionInput); // Empty value as specified in the API
      formData.append('avatar', avatar);
      formData.append('address', address); // Empty value as specified in the API
      formData.append('city', city); // Empty value as specified in the API
      formData.append('country', country); // Empty value as specified in the API
      formData.append('cover_image', cover_image); // Empty value as specified in the API
      formData.append('link', ''); // Empty value as specified in the API

      const newProfile = {
        username: username,
        description: descriptionInput,
        
        avatar: avatar,
        address: address,
        city: city,
        country: country,
        cover_image: cover_image,
        link: ""
        
      };
      const response = await axios.post(
        'https://it4788.catan.io.vn/set_user_info',
        formData,
        {
          headers: {
            'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
      dispatch(updateProfile(newProfile));
      // Assuming you want to navigate back to the previous screen after updating the avatar
      navigation.goBack();
    } catch (error) {
      // Handle errors
      console.error('Error updating avatar:', error);
    }
  }
  useEffect(() => {
    // alert("hello world")
   // console.log("hello world")
  }, [profileData]);


  
  
  return (
    <ScrollView style = {styles.container} >
      {isMainEdit && (
     <View>
      <View style = {styles.container_edit_avatar}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style = {{fontWeight: 600, fontSize: 19,}}>Ảnh đại diện</Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('EditAvatar',{
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
                
              }
              
              );
            }}
          >
            <Text style = {{fontSize: 18, fontWeight: 500,color: "#2990F0"}}>Chỉnh sửa</Text>
          </TouchableOpacity>
          {/* <Button title="Chỉnh sửa" style = {{fontSize: 18, backgroundColor:'#D3DBDD'}}
            onPress={()=>{
              navigation.navigate('EditAvatar',{
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
                
              }
              
              );
            }}
          /> */}
          {/* <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text> */}
        </View>
        <View style={styles.avatar_image}>
          <TouchableOpacity style = {{marginTop: 20, marginBottom: 20}}>
            <Image style = {{width: 140, height: 140, borderRadius: 1000}}  source={{uri: profileData.avatar}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.container_edit_cover}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style = {{fontWeight: 600, fontSize: 19,}}>Ảnh bìa</Text>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('EditCover',{
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
                
              }
              
              );
            }}
          >
            <Text style = {{fontSize: 18, fontWeight: 500,color: "#2990F0"}}>Chỉnh sửa</Text>
          </TouchableOpacity>
          {/* <Button title="Chỉnh sửa" style = {{fontSize: 18, color: '#1E90FF'}}
            onPress={()=>{
              navigation.navigate('EditCover',{
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
              }
              
              );
            }}
          /> */}
        </View>
        <View style={styles.cover_image}>
          <TouchableOpacity style = {{marginTop: 20, marginBottom: 20}}>
            <Image style = {{width: '100%',height: 200,resizeMode: 'cover'}}  source={{uri: profileData.cover_image}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.container_edit_biography}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
            <Text style = {{fontWeight: 600, fontSize: 19,}}>Tiểu sử</Text>
            <TouchableOpacity
            onPress={()=>{
              setEditDescription(true)
              setMainEdit(false)
            }}
          >
            <Text style = {{fontSize: 18, fontWeight: 500,color: "#2990F0"}}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.button_edit_biography}>
          <Button
              title="Mô tả bản thân"
              type="clear"
              titleStyle={{ fontSize: 20, color: '#696969',fontWeight: 500 }}
              style={{             
                borderRadius: 'none',     
                backgroundColor: '#E0E0E0',
                alignItems: 'center' ,
                borderRadius: 8        
              }
              
              }
            onPress={()=>{
              
              setEditDescription(true)
              setMainEdit(false)
              
            }}
            />
        </View>

      
      </View>
      <View style = {styles.container_detail_infor}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
            <Text style = {{fontWeight: 600, fontSize: 19,}}>Chi tiết</Text>
            <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Edit Detail Profile',{
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
                
              }
              
              );
            }}
          >
            <Text style = {{fontSize: 18, fontWeight: 500,color: "#2990F0"}}>Chỉnh sửa</Text>
          </TouchableOpacity>
            {/* <Button style = {styles.EditDetail} onPress={()=>{
              navigation.navigate('Edit Detail Profile',
              
              {
                avatar: avatar,
                cover_image: cover_image,
                
                username: username,
                address: address,
                city: city,
                country: country,
                description: description
              })
            }}>Chỉnh sửa</Button> */}
        </View>
        
        <View style = {styles.detail_infor}>
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
      </View> 
      </View>
      )}
      <Modal
        visible={isEditDescription}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style = {styles.header}>
            <Button
              title="Hủy"
              type="clear"
              titleStyle={{ fontSize: 18, color: '#0780DC',fontWeight: 600 }}
              style={{
                borderRadius: 8,
                
                paddingLeft: 5
              }}
              onPress={() => {
                setEditDescription(false)
                setMainEdit(true)
              }}
            />
            <Button
              title="Lưu"
              type="clear"
              titleStyle={{ fontSize: 18, color: '#0780DC',fontWeight: 600 }}
              style={{
                borderRadius: 8,
                paddingRight: 5,
              }}
              onPress={()=>{
                handleSubmitDescription();
                setEditDescription(false)
                setMainEdit(true)
              }}
            />
          </View>
      <View style = {styles.profile}>
        <View style = {styles.avartar}>
          <Image style = {{width: 40, height: 40, borderRadius: 1000}}  source={{uri: avatar}}/>
        </View>
        <View style = {{marginTop: 3}}>
          <Text style = {{fontSize: 14, fontWeight: 500}}>{username}</Text>
        </View>
      </View>
      <View style = {styles.content}>
        <TextInput
              
            placeholder='Thêm giới thiệu ngắn hoặc tiểu sử của bản thân, chẳng hạn như bạn thích gì, bạn có ước mơ gì sau này hay những điều làm bạn cảm thấy hạnh phúc!'
            onSubmitEditing={handleSubmitDescription}
            multiline
            placeholderTextColor= "#717172"
            onChangeText={(text)=>{
              setDescriptionInput(text)
            }}
        />
      </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container:{
    marginTop: 15,
    marginLeft: 15,
    paddingRight: 15
  },
  avatar_image:{
    alignItems: 'center'
  },
  container_edit_avatar:{
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1
  },
  container_edit_cover:{
    marginTop: 20,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1
  },
  container_edit_biography:{
    marginTop: 20,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    paddingBottom: 20
  },
  button_edit_biography:{
    marginTop: 20,
    
  },
  container_detail_infor:{
    marginTop: 20
  },
  detail_infor:{
    marginTop: 20
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
    
    justifyContent: 'flex-start',
    backgroundColor:"white",
    
  },
  profile:{
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection:'row',
    gap: 15,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth:1, 
    borderBottomColor:'#EAEAEA'
  },
  content:{
    paddingLeft: 12, 
    paddingRight: 12
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    display:'flex',
    marginTop: '7%',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor:'#EAEAEA'
  },
  
})