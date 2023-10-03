import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import LoginScreen from './Login/LoginScreen'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        title='Go Back'
        onPress={() =>
            navigation.navigate({name:'Login'})
          }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems:'center',

    }
})