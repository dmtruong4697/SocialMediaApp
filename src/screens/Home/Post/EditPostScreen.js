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
import { Alert } from 'react-native';

const EditPostScreen = ({route}) => {

  const BACKEND_URL = "https://it4788.catan.io.vn";
  const [postDetail, setPostDetail] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {postId} = route.params;

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]); 
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]); 
  const [imageDel, setImageDel] = useState("");
  const [videoDel, setVideoDel] = useState("");
  const [described, setDescribed] = useState("");

  function processString(inputString) {
    if (inputString !== "") {
      let charArray = inputString.split('');
  
      if (charArray.length >= 2) {
        charArray.splice(-2);
        
        let resultString = charArray.join('');
  
        return resultString;
      } else {
        return inputString;
      }
    } else {
      return inputString;
    }
  }

  const addIndexToDelImage = (index) => {
    const currentIndexArray = imageDel.split(',').map(Number);

    currentIndexArray.push(index);

    currentIndexArray.sort((a, b) => b-a);

    setImageDel(currentIndexArray.join(','));
  };

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
        setNewImages((prevImages) => [...prevImages, ...result.assets]);
      } else if (mediaType === 'video') {
        setNewVideos((prevVideos) => [...prevVideos, ...result.assets]);
      }
    }
  };

  const removeImageNew = (index, isVideo) => {
    if (isVideo) {
      const newVideos = [...newVideos];
      newVideos.splice(index, 1);
      setNewVideos(newVideos);
    } else {
      const newImages = [...images];
      newImages.splice(index, 1);
      setNewImages(newImages);
    }
  };

  const removeImageOld = (index, isVideo, id) => {
    if (isVideo) {
      const newVideos = [...videos];
      newVideos.splice(index, 1);
      setVideos(newVideos);
    } else {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      addIndexToDelImage(id);
    }
  };

  const renderImageItemOld = ({ item, index }) => (
    <View style={styles.imageContainer}>
      {item.id != null? (
        <Image source={{ uri: item.url }} style={styles.imageItem} />
      ) : (
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/4404/4404094.png" }} style={styles.imageItem} />
      )}
      
      <TouchableOpacity
        onPress={() => removeImageOld(index, item.type === 'video', item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const renderImageItemNew = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.imageItem} />
      <TouchableOpacity
        onPress={() => removeImageNew(index, item.type === 'video')}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVideoItemNew = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/4404/4404094.png" }} style={styles.imageItem} />
      <TouchableOpacity
        onPress={() => removeImageNew(index, item.type === 'video')}
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
      setImages(response.data.data.image);
      setVideos(response.data.data.video);
      setDescribed(response.data.data.described);
      //console.log(thisPost);
    } catch (error) {
      console.error("Lỗi khi tải bài viết này:", error.response.data);
    }
  }; 

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleEditPostImage = async () => {
    try {
      const formData = new FormData();

      if(newImages != []){
        newImages.forEach((image, index) => {
          formData.append("image", {
            uri: image.uri,
            type: "image/jpeg",
            name: `photo_${index}.jpg`,
          });
        });
      }

      // if(videos != []) {
      //   formData.append("video", {
      //     uri: videos[0].uri,
      //     type: "video/mp4",
      //     name: `video_${new Date()}.mp4`,
      //   });
      // }

      formData.append("described", described);
      formData.append("auto_accept", "1");
      formData.append("status", "Hyped");
      formData.append("id", postDetail.id);
      formData.append("image_del", imageDel);

      const response = await axios.post(`${BACKEND_URL}/edit_post`, formData, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Edit post response:", response);
      if (response.status === 200) {
        Alert.alert("Thành công", "Sửa bài viết thành công");
        navigation.navigate({ name: "Home" });
      }
    } catch (error) {
      console.error("Lỗi khi sửa bài:", error);
      Alert.alert("Lỗi", "Lỗi khi sửa bài, vui lòng thử lại");
    }
  };

  const handleEditPostVideo = async () => {
    try {
      const formData = new FormData();

      // if(images != []){
      //   images.forEach((image, index) => {
      //     formData.append("image", {
      //       uri: image.uri,
      //       type: "image/jpeg",
      //       name: `photo_${index}.jpg`,
      //     });
      //   });
      // }

      if(videos != []) {
        formData.append("video", {
          uri: newVideos[0].uri,
          type: "video/mp4",
          name: `video_${new Date()}.mp4`,
        });
      }

      formData.append("described", described);
      formData.append("auto_accept", "1");
      formData.append("status", "Hyped");
      formData.append("id", postDetail.id);
      formData.append("image_del", imageDel);

      const response = await axios.post(`${BACKEND_URL}/edit_post`, formData, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Edit post response:", response);
      if (response.status === 200) {
        //resetPostForm();
        Alert.alert("Thành công", "Sửa bài viết thành công");
        navigation.navigate({ name: "Home" });
      }
    } catch (error) {
      console.error("Lỗi khi sửa bài:", error);
      Alert.alert("Lỗi", "Lỗi khi sửa bài, vui lòng thử lại");
    }
  }

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
          value={described}
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
          renderItem={renderImageItemOld}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
        />
      </View>

      <View style={styles.images}>
        <FlatList
          data={newImages}
          renderItem={renderImageItemNew}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
        />
      </View>

      <View style={styles.images}>
        <FlatList
          data={videos}
          renderItem={renderImageItemOld}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
        />
      </View>

      <View style={styles.images}>
        <FlatList
          data={newVideos}
          renderItem={renderVideoItemNew}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
        />
      </View>

      <TouchableOpacity 
        onPress={() => {
          if(newVideos.length != 0) handleEditPostVideo()
          else handleEditPostImage();
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
          Xác nhận
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => {console.log(newVideos)}} style={styles.submitButton}>
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