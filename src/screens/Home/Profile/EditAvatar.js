import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../../../redux/actions/profile.action';
const EditAvatar = ({ route }) => {
  const [image, setImage] = useState(null);
  const { avatar, cover_image, username,address, city, country, description } = route.params;
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    
  };

  const changeAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username); // Empty value as specified in the API
      formData.append('description', description); // Empty value as specified in the API
      formData.append('avatar', {
        uri: image,
        type: 'image/jpeg', 
        name: `avatar.jpg`,  
      });
      formData.append('address', address); // Empty value as specified in the API
      formData.append('city', city); // Empty value as specified in the API
      formData.append('country', country); // Empty value as specified in the API
      formData.append('cover_image', cover_image); // Empty value as specified in the API
      formData.append('link', ''); // Empty value as specified in the API

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
      const newProfile = {
        username: username,
        description: description,
        
        avatar: image,
        address: address,
        city: city,
        country: country,
        cover_image: cover_image,
        link: ""
        
      };
      dispatch(updateProfile(newProfile))
      // Handle the response as needed
      console.log(response.data);
      
      // Assuming you want to navigate back to the previous screen after updating the avatar
      navigation.goBack();
    } catch (error) {
      // Handle errors
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn ảnh đại diện" onPress={pickImage} />
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarWrapper}>
          {image ? (
            <Image style={styles.avatarImage} source={{ uri: image }} />
          ) : (
            <Image style={styles.avatarImage} source={{ uri: profileData.avatar }} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Thay đổi"
          style={styles.changeButton}
          onPress={changeAvatar}
        />
        <Button
          title="Hủy bỏ"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: 20,
  },
  avatarWrapper: {
    marginTop: 50,
    marginBottom: 50,
  },
  avatarImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  changeButton: {
    borderRadius: 15,
    backgroundColor: '#CCFFFF',
    marginRight: 10,
  },
});

export default EditAvatar;
