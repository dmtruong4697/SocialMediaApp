import { StyleSheet, Text, View,Modal, TouchableOpacity, Image, ScrollView,TextInput } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/themed';
import address_icon from '../../../../assets/icons/address.png'
import city_icon from '../../../../assets/icons/location.png'
import countries_icon from '../../../../assets/icons/countries.png'
import description_icon from '../../../../assets/icons/cv.png'
//import EditDescriptionScreen from './EditDescriptionScreen';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../../../redux/actions/profile.action';
const EditDetailProfile = ({route}) => {
  const { avatar, cover_image, username,address, city, country, description } = route.params;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const profileData = useSelector((state) => state.profile);
  const [addressInput, setAddressInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState("")
  const navigation = useNavigation();
  const handleSaveData = async ()=>{
    try {
      const formData = new FormData();
      formData.append('username', username); // Empty value as specified in the API
      formData.append('description', description); // Empty value as specified in the API
      formData.append('avatar',avatar);
      formData.append('address', addressInput); // Empty value as specified in the API
      formData.append('city', cityInput); // Empty value as specified in the API
      formData.append('country', countryInput); // Empty value as specified in the API
      formData.append('cover_image', cover_image); // Empty value as specified in the API
      formData.append('link', ''); // Empty value as specified in the API

      const newProfile = {
        username: username,
        description: description,
        
        avatar: avatar,
        address: addressInput,
        city: cityInput,
        country: countryInput,
        cover_image: cover_image,
        link: ""
        
      };
      const response = await axios.post(
        'https://it4788.catan.io.vn/set_user_info',
        formData,
        {
          headers: {
            'Accept': 'multipart/form-data',
            'Authorization': `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
      dispatch(updateProfile(newProfile));
      // Assuming you want to navigate back to the previous screen after updating the avatar
      navigation.goBack();
    } catch (error) {
      // Handle errors
      console.error('Error updating avatar:', error);
    }
  }
  useState(()=>{
    setAddressInput(address)
    setCityInput(city)
    setCountryInput(country)
  })
  return (
    <ScrollView style = {styles.container}>
      <View style = {styles.header}>
        <Text style = {{fontSize: 18, fontWeight: 500}}>Chỉnh sửa phần giới thiệu bản thân</Text>
        <Text style = {{fontSize: 17, color: '#6F6E6E', paddingTop: 5}}>Chi tiết bạn chọn sẽ hiển thị công khai.</Text>
      </View>
      <View style = {styles.address}>
        <Text style = {{fontSize: 20, fontWeight: 600, marginBottom: 15}}>Địa Chỉ</Text>
        <TextInput
              
          placeholder= {address}
          multiline
          placeholderTextColor= "#717172"
          
          onChangeText={(text)=>{
            setAddressInput(text);
          }}
          style = {{borderColor: '#C1BFBF', borderWidth: 1, borderRadius: 6, color: 'red', paddingBottom: 10, paddingTop: 10, paddingLeft: 10, fontSize: 18}}
        />
      </View>
      <View style = {styles.city}>
        <Text style = {{fontSize: 20, fontWeight: 600, marginBottom: 15}}>Thành Phố</Text>
          <TextInput
                
            placeholder= {city}
            multiline
            placeholderTextColor= "#717172"
            
            onChangeText={(text)=>{
              setCityInput(text);
            }}
            style = {{borderColor: '#C1BFBF', borderWidth: 1, borderRadius: 6, color: 'red', paddingBottom: 10, paddingTop: 10, paddingLeft: 10, fontSize: 18}}
          />
      </View>
      <View style = {styles.country}>
        <Text style = {{fontSize: 20, fontWeight: 600, marginBottom: 15}}>Quốc gia</Text>
          <TextInput
                
            placeholder= {country}
            multiline
            placeholderTextColor= "#717172"
            
            onChangeText={(text)=>{
              setCountryInput(text);
            }}
            style = {{borderColor: '#C1BFBF', borderWidth: 1, borderRadius: 6, color: 'red', paddingBottom: 10, paddingTop: 10, paddingLeft: 10, fontSize: 18}}
          />
      </View>
      <View style = {styles.button_save}>
      <Button
          title="Lưu"
          
          onPress={handleSaveData}
        />
      </View>
    </ScrollView>
  )
}

export default EditDetailProfile

const styles = StyleSheet.create({
  container:{
    marginTop: 15,
    marginLeft: 15, 
    marginRight:15, 
    fontFamily:'Times New Roman'
  },
  header:{
    alignItems:'center',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    paddingBottom: 15
  },
  address:{
    marginTop: 20,
    marginBottom: 25
  },
  city:{
    marginBottom: 25
  },
  country:{
    marginBottom: 35,
  }
})