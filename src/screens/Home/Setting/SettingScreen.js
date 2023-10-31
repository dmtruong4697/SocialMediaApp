import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
const SettingScreen = () => {

  const navigation = useNavigation();

  return (
    <View>
      <Text>SettingScreen</Text>
      <Button 
        title="Đăng xuất" 
        type='clear'
        titleStyle={{ fontSize: 16, color: '#ffffff' }}
        style={{
          marginRight: 10,
          width: 140,
          borderRadius: 10,
          backgroundColor: '#2069a1'
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})