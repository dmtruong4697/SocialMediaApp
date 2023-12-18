import { StyleSheet, Text, View,Modal, TouchableOpacity, Image, ScrollView,TextInput } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/themed';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from '../../../../assets/icons/cv.png'
//import EditDescriptionScreen from './EditDescriptionScreen';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
const EditProfileScreen = ({route}) => {
  const { avatarLink, coverLink, username,address, city, country, description } = route.params;
  const navigation = useNavigation();
  const [isEditDescription, setEditDescription] = useState(false)
  const [isMainEdit, setMainEdit] = useState(true)
  const handleSubmitDescription = ()=>{
    console.log("hello")
  }

  const [editAvatarImage, setEditAvatarImage] = useState(null);
//***************Edit avatar *************************** */
  const pickAvatarImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setEditAvatarImage(result.assets[0].uri);
    }
  }
  return (
    <ScrollView style = {styles.container} >
      {isMainEdit && (
     <View>
      <View style = {styles.container_edit_avatar}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style = {{fontWeight: 600, fontSize: 19,}}>Ảnh đại diện</Text>
          <Button title="Chỉnh sửa" style = {{fontSize: 18, color: '#1E90FF'}}
            onPress={pickAvatarImage}
          />
          {/* <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text> */}
        </View>
        <View style={styles.avatar_image}>
          <TouchableOpacity style = {{marginTop: 20, marginBottom: 20}}>
            <Image style = {{width: 140, height: 140, borderRadius: 1000}}  source={{uri: avatarLink}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.container_edit_cover}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style = {{fontWeight: 600, fontSize: 19,}}>Ảnh bìa</Text>
          <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text>
        </View>
        <View style={styles.cover_image}>
          <TouchableOpacity style = {{marginTop: 20, marginBottom: 20}}>
            <Image style = {{width: '100%',height: 200,resizeMode: 'cover'}}  source={{uri: coverLink}}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.container_edit_biography}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
            <Text style = {{fontWeight: 600, fontSize: 19,}}>Tiểu sử</Text>
            <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text>
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
            <Button style = {styles.EditDetail} onPress={()=>{
              navigation.navigate('Edit Detail Profile')
            }}>Chỉnh sửa</Button>
        </View>
        
        <View style = {styles.detail_infor}>
          <View style = {styles.infor}>
            <Image source={description_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15, flexShrink:1}}>{description}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={address_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{address}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={city_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{city}</Text>
          </View>
          <View style = {styles.infor}>
            <Image source={countries_icon} style = {styles.icon_infor}/>
            <Text style = {{fontSize: 15}}>{country}</Text>
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
                setEditDescription(false)
                setMainEdit(true)
              }}
            />
          </View>
      <View style = {styles.profile}>
        <View style = {styles.avartar}>
          <Image style = {{width: 40, height: 40, borderRadius: 1000}}  source={{uri: avatarLink}}/>
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