import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed';
import { Input, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

const ChangeInfoScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [avatarImage, setAvatarImage] = useState(null);
  const [userName, setUserName] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async() => {
    try {
      const avatar = new FormData();
      avatar.append('file', {
        uri: avatarImage,
      });

      const response = await axios.post('https://it4788.catan.io.vn/change_profile_after_signup', 
        {
          username: userName,
          avatar: avatar,
        },
        {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log('Upload response:', response.data);
      if (response.status === 201) {
        navigation.navigate({name:'Home'})
      }
    } catch (error) {
      console.error('Error uploading image:', error.response.data);
      Alert.alert('Error', 'Lỗi khi cập nhật thông tin, vui lòng thử lại');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.avatar}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <ImageBackground
            source={(avatarImage == null)? require('../../../assets/camera.jpg') : {uri: avatarImage}}
            imageStyle={{
              width: 150,
              height: 150,
              borderRadius: 1000,
              borderWidth: 3,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.userName}>
        <Input
            placeholder='User Name'
            onChangeText={(text) => setUserName(text)}
            style={{
              
            }}
        />
      </View>

      <Button
          title={'Xác nhận'}
          style={{
            width: 150,
          }}
          radius={5}
          onPress={handleSubmit}
      />


    </ScrollView>
  )
}

export default ChangeInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  avatar: {
    width: '100%',
    height: 'auto',
  },

  userName: {
    width: '80%',
    height: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },

  imagePicker: {
    borderRadius: 1000,
    width: 150,
    height: 150,
    alignSelf: 'center',
  }
})