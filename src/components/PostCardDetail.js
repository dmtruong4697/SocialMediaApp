import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ImageSlider from 'react-native-image-slider';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, parseISO } from 'date-fns';
import { Button } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import Modal from "react-native-modal";

const PostCardDetail = (props) => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {postDetail, handleAddMarkButton} = props;
  const [isFelt, setIsFelt] = useState(postDetail.is_felt);
  const [thisPost, setThisPost] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [reportText, setReportText] = useState("");
  const [rpInput, setRpInput] = useState(false);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const win = Dimensions.get('window');
  const ratio = win.width/541; //541 is actual image width

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
  
  const handleDeletePost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/delete_post`,
        {
          id: postDetail.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setOptionModal(false);
      Alert.alert("Thành công", "Xóa bài viết thành công");
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi xóa bài viết này:", error.response.data);
      setOptionModal(false);
      Alert.alert("Error", "Lỗi khi xóa bài viết");
    }
  };  

  const handleReportPost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/report_post`,
        {
          id: postDetail.id,
          subject: "Report",
          details: reportText,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setOptionModal(false);
      setRpInput(false);
      console.log(response.data);
      Alert.alert("Thành công", "Bạn đã báo cáo bài viết thành công");
    } catch (error) {
      console.error("Lỗi khi báo cáo viết này:", error.response.data);
      setOptionModal(false);
      setRpInput(false);
      Alert.alert("Error", "Lỗi khi báo cáo bài viết");
    }
  }; 

  useEffect(() => {
    if(isFelt == "-1") handleDeleteFeel();
      else handleFeel(isFelt);
    
  }, [isFelt])

  return (
    <View style={styles.container}>

<View style={styles.header}>
        <TouchableOpacity style={styles.avatarImage} onPress={()=>{
          if(currentUser.id!=postDetail.author.id){
            navigation.navigate('User Profile', {user_id: postDetail.author.id})
          }
          else{
            navigation.navigate('Profile');
          }
          
          }}>
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
            onPress={() => {
              setOptionModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} size={24}/>
          </TouchableOpacity>
          
          <Modal
            animationType="slide"
            onBackdropPress={() => setOptionModal(false)}
            transparent={true}
            visible={optionModal}
            //onRequestClose={() => {setOptionModal(false)}}
            backdropColor={"#919492"}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            style={{
              width: '100%',
              alignSelf: 'center'
            }}
          >
            <TouchableWithoutFeedback onPress={() => {setOptionModal(false)}}>
            <View
              style={{
                position: 'absolute',
                bottom: -20,
                height: 500,
                width: '100%',
                backgroundColor: '#f0f2f5',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}
            >
                <TouchableOpacity
                  style={{
                    width: '95%',
                    height: 60,
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 10,
                    flexDirection: 'row',
                    //justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setRpInput(!rpInput);
                  }}
                >
                  <Image style={{height: 32, width: 32, marginLeft: 10, marginRight: 10,}} source={ require('../../assets/icons/report.png')}/>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold'}}
                  >Báo cáo bài viết</Text>
                </TouchableOpacity>

                {
                  (rpInput == true) && 
                  <View>
                    <TextInput
                      style={{
                        width: '95%',
                        height: 60, 
                        backgroundColor: '#FFFFFF',
                        alignSelf: 'center',
                        marginTop: 20,
                        borderRadius: 15,
                        padding: 10,
                        fontSize: 18,
                        borderColor: "#bfbfbf",
                        borderWidth: 1.5,
                      }}
                      placeholder='Nội dung báo cáo ...'
                      multiline
                      onChangeText={(text) => {setReportText(text)}}
                    />

                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: 120,
                        backgroundColor: "#c44037",
                        alignSelf: 'center',
                        marginTop: 10,
                        borderRadius: 7,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        handleReportPost();
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 20,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}
                      >Báo cáo</Text>
                    </TouchableOpacity>
                  </View>
                }

                {(postDetail.author.id == currentUser.id) && 
                <TouchableOpacity
                  style={{
                    width: '95%',
                    height: 60,
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 10,
                    flexDirection: 'row',
                    //justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setOptionModal(false);
                    navigation.navigate('EditPost',{postId: postDetail.id});
                  }}
                >
                  <Image style={{height: 30, width: 30, marginLeft: 10, marginRight: 12,}} source={ require('../../assets/icons/edit.png')}/>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold'}}
                  >Chỉnh sửa bài viết</Text>
                </TouchableOpacity>
                }
            
            {(postDetail.author.id == currentUser.id) && 
                <TouchableOpacity
                  style={{
                    width: '95%',
                    height: 60,
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 10,
                    flexDirection: 'row',
                    //justifyContent: 'center',
                    alignItems: 'center',
                  }}

                  onPress={() => {
                    handleDeletePost();
                  }}
                >
                  <Image style={{height: 30, width: 30, marginLeft: 10, marginRight: 12,}} source={ require('../../assets/icons/delete.png')}/>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold'}}
                  >Xóa bài viết</Text>
              </TouchableOpacity>
              }
            </View>
            </TouchableWithoutFeedback>
          </Modal>
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

{
        (postDetail.video) && 
        
        <View style={styles.video}>
          <Video
            ref={video}
            //style={styles.video}
            source={{
              uri: postDetail.video.url,
            }}
            useNativeControls
            resizeMode='cover'
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: win.width,
              height: 362 * ratio, //362 is actual height of image
            }}
          />
{/* 
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          /> */}
        </View>
      }

      <View style={styles.likeView}>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListFeel", {postDetail: postDetail})
            }}
          >
            <Text style={{fontSize: 15, fontWeight: '500', color: "#636363"}}>{Number(thisPost.kudos) + Number(thisPost.disappointed)} feels</Text>
          </TouchableOpacity>
        {/* <Text style={{fontSize: 15}}>{postDetail.comment_mark} comments</Text> */}
      </View>

      <View style={styles.buttonView}>
        <View
          style={styles.button}
        >
            {/* nut like mac dinh */}
              <TouchableOpacity 
                style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto', marginLeft: 10,}}
                onPress={() => {
                  if(isFelt == "-1") setIsFelt("1")
                    else setIsFelt("-1");
                }}
                onLongPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                {(isFelt == "-1") && <Image style={{height: 24, width: 24, marginRight: 5,}} source={ require('../../assets/icons/like.png')}/>}
                {(isFelt == "1") && <Image style={{height: 24, width: 24, marginRight: 5,}} source={ require('../../assets/icons/care.png')}/>}
                {(isFelt == "0") && <Image style={{height: 24, width: 24, marginRight: 5,}} source={ require('../../assets/icons/angry.png')}/>}
                {(isFelt == "-1") && <Text style={{fontSize: 16, fontWeight: '500', color: "#636363"}}>Thích</Text>}
                {(isFelt == "1") && <Text style={{fontSize: 16, fontWeight: '500', color: "#fcba03"}}>Kudos</Text>}
                {(isFelt == "0") && <Text style={{fontSize: 16, fontWeight: '500', color: "#fc6f03"}}>Disapointed</Text>}
              </TouchableOpacity>

        </View>

        {/* nut comment */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            handleGetPost();
            navigation.navigate('PostDetail',{postDetail: thisPost});
          }}
        >
          <Image style={{height: 24, width: 24, marginRight: 5,}} source={require('../../assets/icons/comment.png')}/>
          <Text style={{fontSize: 16, fontWeight: '500', color: "#636363"}}>Tạo Mark</Text>
        </TouchableOpacity>

      </View>

      <View style={{width: '100%'}}>
      {(modalVisible == true) && 
          <View
            style={{
              height: 50,
              width: 'auto',
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              alignSelf: 'center',
              bottom: 75,
              flexDirection: 'row',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,
              elevation: 2,
              borderRadius: 24,
            }}
          >
              <TouchableOpacity 
                style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto', marginLeft: 5, marginRight: 5,}}
                onPress={() => {
                  setIsFelt("1");
                  setModalVisible(false);
                }}

              >
                <Image style={{height: 40, width: 40, marginLeft: 5,}} source={ require('../../assets/icons/care.png')}/>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto', marginLeft: 5, marginRight: 5,}}
                onPress={() => {
                  setIsFelt("0");
                  setModalVisible(false);
                }}

              >
                <Image style={{height: 40, width: 40, marginRight: 5,}} source={ require('../../assets/icons/angry.png')}/>
              </TouchableOpacity>
          </View>
        } 
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

  video: {
    width: '100%',
    //backgroundColor: 'gray',
    //height: 300,
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