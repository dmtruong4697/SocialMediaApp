import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/themed';
import axios from 'axios';

const CreatePostScreen = () => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [images, setImages] = useState([]);
  const [described, setDescribed] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, ...result.assets]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.imageItem} />
      <TouchableOpacity onPress={() => removeImage(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddPost = async () => {
    try {

      const formData = new FormData();

      images.forEach((image, index) => {
        formData.append('image', {
          uri: image.uri,
          type: 'image/jpeg', 
          name: `photo_${index}.jpg`,  
        });
      });

      formData.append('described', described);
      formData.append('auto_accept', '1'); 
      formData.append('status', 'Hyped');

      const response = await axios.post(
        `${BACKEND_URL}/add_post`,
        formData,
        {
          headers: {
            'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Create post response:', response.data);
      if (response.status === 200) {
        resetPostForm();
        navigation.navigate({name: 'Home'})
      }
    } catch (error) {
      console.error('Lỗi khi đăng bài:', error.response.data);
      Alert.alert('Lỗi', 'Lỗi khi đăng bài, vui lòng thử lại');
    }
  };

  const resetPostForm = () => {
    setImages([]);
    setDescribed('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatarImage}>
          <ImageBackground
            source={{ uri: currentUser.avatar }}
            imageStyle={{
              width: 80,
              height: 80,
              borderRadius: 1000,
            }}
          />
        </View>

        <View style={styles.userName}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentUser.userName}</Text>
        </View>

      </View>

      <View style={styles.content}>
        <TextInput
          style={{
            height: '100%',
            textAlignVertical: 'top',
            fontSize: 18,
            fontWeight: '400',
          }}
          multiline={true}
          placeholder="Bạn đang nghĩ gì?"
          onChangeText={(text) => {setDescribed(text)}}
        />
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#dbdbdb',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          }}
          onPress={pickImage}
        >
          <Image style={{ height: 50, width: 50, marginRight: 10 }} source={require('../../../../assets/icons/image-icon.png')} />
          <Text style={{ fontSize: 18, fontWeight: '400' }}>Thêm Ảnh/Video</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.images}>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false} 
          numColumns={4} 
        />
      </View>

      <TouchableOpacity
        onPress={handleAddPost}
        style={styles.submitButton}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 18,
            fontWeight: '500'
          }}
        >Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  userInfo: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    padding: 5,
  },

  content: {
    width: '100%',
    height: 300,
    marginTop: 10,
    padding: 5,
  },

  buttonView: {
    width: '100%',
  },

  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 1000,
  },

  userName: {
    height: 90,
    justifyContent: 'center',
    width: 'auto',
    marginLeft: 10,
  },

  submitButton: {
    height: 45,
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#2386f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },

  images: {
    width: '100%',
    height: 'auto',
    //alignItems: 'center',
  },

  imageItem: {
    width: 92,
    height: 92,
    margin: 6,
  },

  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
