import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from 'react-native';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';

const EditPostScreen = ({route}) => {

  const BACKEND_URL = "https://it4788.catan.io.vn";
  const [postDetail, setPostDetail] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {postId} = route.params;

  const [images, setImages] = useState(postDetail.image);
  const [videos, setVideos] = useState(postDetail.video); 
  const [described, setDescribed] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const mediaType = result.assets[0].type.split('/')[0];
      if (mediaType === 'image') {
        setImages((prevImages) => [...prevImages, ...result.assets]);
      } else if (mediaType === 'video') {
        setVideos((prevVideos) => [...prevVideos, ...result.assets]);
      }
    }
  };

  const removeImage = (index, isVideo) => {
    if (isVideo) {
      const newVideos = [...videos];
      newVideos.splice(index, 1);
      setVideos(newVideos);
    } else {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }
  };

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      {item.type === 'image' ? (
        <Image source={{ uri: item.uri }} style={styles.imageItem} />
      ) : (
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/4404/4404094.png" }} style={styles.imageItem} />
      )}
      <TouchableOpacity
        onPress={() => removeImage(index, item.type === 'video')}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const handleGetPost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/get_post`,
        {
          id: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      //console.log(response.data);
      
      setPostDetail(response.data.data);
      //console.log(thisPost);
    } catch (error) {
      console.error("Lỗi khi tải bài viết này:", error.response.data);
    }
  }; 

  useEffect(() => {
    handleGetPost();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
    >
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {currentUser.userName}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <TextInput
          style={{
            height: "100%",
            textAlignVertical: "top",
            fontSize: 18,
            fontWeight: "400",
          }}
          multiline={true}
          placeholder="Bạn đang nghĩ gì?"
          onChangeText={(text) => {
            setDescribed(text);
          }}
        />
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#dbdbdb",
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          }}
          onPress={pickImage}
        >
          <Image
            style={{ height: 50, width: 50, marginRight: 10 }}
            source={require("../../../../assets/icons/image-icon.png")}
          />
          <Text style={{ fontSize: 18, fontWeight: "400" }}>
            Thêm Ảnh/Video
          </Text>
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

      <View style={styles.images}>
        <FlatList
          data={videos}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
        />
      </View>

      <TouchableOpacity 
        onPress={() => {
          if(videos.length != 0) handleAddPostVideo()
          else handleAddPostImage();
        }} 
        style={styles.submitButton}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Đăng bài
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => {console.log(videos)}} style={styles.submitButton}>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          check
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default EditPostScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  userInfo: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    padding: 5,
  },

  content: {
    width: "100%",
    height: 300,
    marginTop: 10,
    padding: 5,
  },

  buttonView: {
    width: "100%",
  },

  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 1000,
  },

  userName: {
    height: 90,
    justifyContent: "center",
    width: "auto",
    marginLeft: 10,
  },

  submitButton: {
    height: 45,
    width: 100,
    justifyContent: "center",
    backgroundColor: "#2386f7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 15,
  },

  images: {
    width: "100%",
    height: "auto",
    //alignItems: 'center',
  },

  imageItem: {
    width: 92,
    height: 92,
    margin: 6,
  },

  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: 15,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});