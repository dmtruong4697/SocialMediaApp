import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDotCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

const ProfileCard = (props) => {

  const { avatarImage, userName, userId ,isNotFriend, mutualFriends, pressUnFriend, mutualFriend, pressAddFriend, pressCancel, blockUser} = props;
  const [optionVisible, setOptionVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [actionAdd, setActionAdd] = useState(false)

  const delSuggestFriends = () => {
    setIsHidden(true);
    console.log('Đã gỡ');
  }

  return (
    <View>
      {isHidden ? null :
      <View style={styles.container}>
        <TouchableOpacity style={styles.avatarImage}>
              <Image style={styles.image} source={{uri: avatarImage}}/>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style = {{fontSize: 16, fontWeight: 500}}>{userName}</Text>
          <Text style={{ fontSize: 14, color: '#A8A8A8' }}>{mutualFriend} mutual friends</Text> 
          {isNotFriend ? (
            actionAdd ? 
              <View style = {styles.button_cancel}>
                <Button
                  title="Cancel"
                  color="gray"
                  type="clear"
                  titleStyle={{ fontSize: 16, color: '#ffffff',fontWeight: 600 }}
                  style={{
                    
                    borderRadius: 8,
                    backgroundColor: 'gray'
                  }}
                  onPress={()=> {
                    setActionAdd(false);
                    console.log('Hủy');
                    pressCancel();
                  }}
                />
              </View> :
                  <View style={styles.profile_button}>
                    <View style = {styles.button_1}>
                      <Button
                        title="Thêm bạn bè"
                        type="clear"
                        titleStyle={{ fontSize: 16, color: '#0780DC',fontWeight: 600 }}
                        style={{
                          
                          borderRadius: 8,
                          backgroundColor: '#BADFFC'
                        }}
                        onPress={() => {
                          pressAddFriend();
                          setActionAdd(true);
                          console.log('Gửi lời mời kết bạn');
                        }}
                      />
                    </View>
                    
                    <View style = {styles.button_2}>
                      <Button
                        title="Xóa, gỡ"
                        color="gray"
                        type="clear"
                        titleStyle={{ fontSize: 16, color: '#ffffff',fontWeight: 600 }}
                        style={{
                          
                          borderRadius: 8,
                          backgroundColor: 'gray'
                        }}
                        onPress={()=> {delSuggestFriends()}}
                      />
                    </View>
                    
                  </View>
                
          ):(
          <View>
            <Text>{mutualFriends}</Text>
          </View>)
          }
        </View>
        {isNotFriend ? null : <View>
        <View style={styles.optionView}>

              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => setOptionVisible(true)}
              >
                <FontAwesomeIcon icon={faEllipsis} size={24}/>
              </TouchableOpacity>

        </View>
        
        <Modal
          isVisible={optionVisible}
          onBackdropPress={() => setOptionVisible(false)}
          style={styles.optionModal}
          backdropColor={'#919492'}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
        >
          <View style={{
            height: 'auto',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
            
            <TouchableOpacity style={[styles.optionAction, {flexDirection: 'row', justifyContent: 'flex-start', gap: 10}]} onPress={() => {console.log("hello")}}>
              <Image style={{height: '100%', aspectRatio: 1, borderRadius: 100,}} source={{uri: avatarImage}}/>
              <Text style={{fontSize: 18}}>{userName}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionAction} onPress={() => {pressUnFriend(); console.log('huy'); setIsHidden(true);}}>
              <Text style={{
                fontSize: 20,
              }}>Hủy kết bạn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionAction} onPress={() => {blockUser();setIsHidden(true);}}>
              <Text style={{
                fontSize: 20,
              }}>Chặn người dùng</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        </View>}

      </View>
     }
     </View>
  );
};

ProfileCard.propTypes = {
  avatarImage: PropTypes.string,
  userName: PropTypes.string,
  userId: PropTypes.string,
  isNotFriend: PropTypes.bool,
  pressUnFriend: PropTypes.func,
  mutualFriend: PropTypes.string,
  pressAddFriend: PropTypes.func,
  pressCancel: PropTypes.func,
  blockUser: PropTypes.func,
};



export default ProfileCard;
const styles = StyleSheet.create({
  container: {    
    height: 85,
    width: '95%',
    alignSelf: 'center',   
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 5,
  },

  avatarImage: {
    flex: 1,
    borderRadius: 1000,   
  },

  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 1000,
  },

  content: {
    flex: 5,    
    height: '100%',
    paddingTop: 5,
    paddingLeft: 10,
    //backgroundColor: 'pink'
  },

  profile_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10
  },
  button_1: {
    flex: 1,
  },
  button_2: {
    flex: 1,
    
  },

  optionView: {
    //backgroundColor:'green',
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionButton: {
    //backgroundColor: 'red',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionModal: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 0,
  },

  optionAction: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    //backgroundColor: 'pink',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button_cancel: {
    marginTop: 10,
  }

})