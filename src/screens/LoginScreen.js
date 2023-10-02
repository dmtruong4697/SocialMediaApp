import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed';

const LoginScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}> 
      <Text>LoginScreen</Text>
      {/* <Button
        title='Home'
        onPress={() =>
            navigation.navigate({name: 'Home'})
          }
      /> */}
        <Button
            title="Home" 
            onPress={() =>
                navigation.navigate({name: 'Home'})
              }
        />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
    }
})