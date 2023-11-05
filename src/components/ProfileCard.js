import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from '@rneui/themed';
import PropTypes from 'prop-types';

const ProfileCard = (props) => {
  const { avatarImage, userName, userId ,isNotFriend} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarImage}>
            <Image style={styles.image} source={{uri: avatarImage}}/>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style = {{fontSize: 16, fontWeight: 500}}>{userName}</Text>
        {isNotFriend ? (
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
              onPress={() => {
                console.log('Đã gỡ');
              }}
            />
          </View>
          
        </View>
        ):(null)
            }
      </View>
    </View>
  );
};

ProfileCard.propTypes = {
  avatarImage: PropTypes.string,
  userName: PropTypes.string,
  userId: PropTypes.string,
  isaNotFriend: PropTypes.bool
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
    
  }


})