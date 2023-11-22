import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from '../../../../assets/icons/cv.png'
const EditProfileScreen = ({route}) => {
  const { avatarLink, coverLink, username,address, city, country, description } = route.params;

  return (
    <ScrollView style = {styles.container}>
     
      <View style = {styles.container_edit_avatar}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
          <Text style = {{fontWeight: 600, fontSize: 19,}}>Ảnh đại diện</Text>
          <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text>
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
              }}
            
            />
        </View>

      
      </View>
      <View style = {styles.container_detail_infor}>
        <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
            <Text style = {{fontWeight: 600, fontSize: 19,}}>Chi tiết</Text>
            <Text style = {{fontSize: 18, color: '#1E90FF'}}>Chỉnh sửa</Text>
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
  }
})