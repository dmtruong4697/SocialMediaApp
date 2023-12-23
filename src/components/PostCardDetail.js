import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ImageSlider from 'react-native-image-slider';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, parseISO } from 'date-fns';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PostCardDetail = (props) => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {postDetail, handleAddMarkButton} = props;
  const [isFelt, setIsFelt] = useState(postDetail.is_felt);
  const [thisPost, setThisPost] = useState({});

  const imageURLs = [];
    postDetail.image.forEach(img => {
      imageURLs.push(img.url);
  });

  const apiTime = postDetail.created;

  const apiDate = parseISO(apiTime);
  
  const timeDifferenceInSeconds = differenceInSeconds(new Date(), apiDate);
  const timeDifferenceInMinutes = differenceInMinutes(new Date(), apiDate);
  const timeDifferenceInHours = differenceInHours(new Date(), apiDate);
  const timeDifferenceInDays = differenceInDays(new Date(), apiDate);
  
  let time;
  
  if (timeDifferenceInDays >= 1) {
    time = `${timeDifferenceInDays} ngày`;
  } else if (timeDifferenceInHours >= 1) {
    time = `${timeDifferenceInHours} giờ`;
  } else if (timeDifferenceInMinutes >= 1) {
    time = `${timeDifferenceInMinutes} phút`;
  } else {
    time = `${timeDifferenceInSeconds} giây`;
  }

  const handleFeel = async (type) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/feel`,
        {
          id: postDetail.id,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      await handleGetPost();
      //console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi feel:", error.response.data);
    }
  };    

  const handleDeleteFeel = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/delete_feel`,
        {
          id: postDetail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      await handleGetPost();
        //console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi feel:", error.response.data);
    }
  };  

  const handleGetPost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/get_post`,
        {
          id: postDetail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      //console.log(response.data);
      
      setThisPost(response.data.data);
      //console.log(thisPost);
    } catch (error) {
      console.error("Lỗi khi tải bài viết này:", error.response.data);
    }
  };  

  useEffect(() => {
    if(isFelt == "-1") handleDeleteFeel();
      else handleFeel(isFelt);
    
  }, [isFelt])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarImage}>
          <ImageBackground
            source={{uri: (postDetail.author.avatar != '')? postDetail.author.avatar:""}}
            imageStyle={{
              width: 60,
              height: 60,
              borderRadius: 1000,
            }}
          />
        </TouchableOpacity>

        <View style={styles.userName}>
          <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 2,}}>{postDetail.author.name}</Text>
          <Text style={{fontSize: 14, fontWeight: '500', color: '#0075DE'}}>{time}</Text>
        </View>

          <TouchableOpacity 
            style={styles.optionButton}
          >
            <FontAwesomeIcon icon={faEllipsis} size={24}/>
          </TouchableOpacity>

      </View>

      <TouchableOpacity 
        style={styles.content}
        onPress={() => {
          handleGetPost();
          navigation.navigate('PostDetail',{postDetail: thisPost});
        }}
      >
        <Text style={{fontSize: 16,}}>{postDetail.described}</Text>
      </TouchableOpacity>
      
      {
        (postDetail.image.length != 0) &&
        <View style={styles.images}>
          <ImageSlider 
            images={imageURLs}
            customSlide={({ index, item, style, width }) => (
              <View key={index} style={[style, {width: width, aspectRatio: 10/7, backgroundColor: '#ffffff'}]}>
                <Image 
                  resizeMode='contain'
                  source={{ uri: item }}  
                  style={{
                    //height: '100%',
                    //width: '100%',
                    flex: 1,
                    height: null,
                    width: null
                  }}
                />
              </View>
            )}
          />
        </View>
      }

      <View style={styles.likeView}>
        <Text style={{fontSize: 15}}>{Number(thisPost.kudos) + Number(thisPost.disappointed)} feels</Text>
        {/* <Text style={{fontSize: 15}}>{postDetail.comment_mark} comments</Text> */}
      </View>

      <View style={styles.buttonView}>
        {/* 2 nut feel */}
        <View
          style={styles.button}
        >
          {/* nut upvote */}
            <TouchableOpacity 
              style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto',}}
              onPress={() => {
                if(isFelt == "1") setIsFelt("-1");
                if(isFelt == "0") setIsFelt("1");
                if(isFelt == "-1") setIsFelt("1");
                // if (isFelt == "1") handleFeel(isFelt);
                // if (isFelt == "-1") handleDeleteFeel();
              }}
            >
              <Image style={{height: 24, width: 24, marginRight: 5,}} source={(isFelt == "1")? require('../../assets/icons/upvote-on.png'):require('../../assets/icons/upvote-off.png')}/>
            </TouchableOpacity>

          {/* nut downvote */}
            <TouchableOpacity 
              style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto', marginLeft: 10,}}
              onPress={() => {
                if(isFelt == "0") setIsFelt("-1");
                if(isFelt == "1") setIsFelt("0");
                if(isFelt == "-1") setIsFelt("0");
                // if (isFelt == "0") handleFeel(isFelt);
                // if (isFelt == "-1") handleDeleteFeel();
              }}
            >
              <Image style={{height: 24, width: 24, marginRight: 5,}} source={(isFelt == "0")? require('../../assets/icons/downvote-on.png'):require('../../assets/icons/downvote-off.png')}/>
            </TouchableOpacity>

        </View>

        {/* nut comment */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleAddMarkButton}
        >
          <Text style={{fontSize: 16, fontWeight: '500',}}>Tạo Mark</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PostCardDetail

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },

  header: {
    width: '100%',
    height: 74,
    //backgroundColor: 'green',
    flexDirection: 'row',
    padding: 7,
  },

  avatarImage: {
    height: 60,
    width:60,
    borderRadius: 1000,
    //backgroundColor: 'yellow',
  },

  userName: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'pink',
    padding: 10,
  },

  optionButton: {
    height: 40,
    width: 40,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 7,
    marginLeft: 5,
    marginRight: 5,
  },

  images: {
    width: '100%',
    backgroundColor: 'gray',
  },

  likeView: {
    width: '95%',
    height: 40,
    padding: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d6d6d6',
    //borderRadius: 10,
  },

  buttonView: {
    width: '100%',
    height: 50,
    flexDirection: 'row'
  },
  button: {
    height: '100%',
    width: '50%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})