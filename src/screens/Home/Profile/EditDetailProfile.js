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
const EditDetailProfile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}

export default EditDetailProfile
