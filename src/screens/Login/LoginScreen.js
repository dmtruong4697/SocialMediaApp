import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed';
import { Input, Icon } from '@rneui/themed';
import userIcon from '../../../assets/icons/user.svg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey, faMugSaucer, faUser } from '@fortawesome/free-solid-svg-icons';

const LoginScreen = () => {
    const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={styles.inputField}>
        <Input
          leftIcon={<FontAwesomeIcon icon={faUser} />}
          placeholder='User name'
        />

        <Input
          leftIcon={<FontAwesomeIcon icon={faKey}/>}
          placeholder='Password'
          secureTextEntry={true}
        />

        <Button 
          title="Forgot password?" 
          titleStyle={{ fontSize: 16 }}
          type="clear" 
          style={{
            //marginBottom: 10,
            alignSelf:'flex-end',
          }}
          onPress={() =>
            navigation.navigate({name:'ForgotPassword'})
          }
        />

        <Button
          title={'Login'}
          style={{
            marginTop: 10,
            marginBottom: 30,
          }}
          onPress={() =>
            navigation.navigate({name:'Home'})
          }
        />

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>Don't have account?</Text>
          <TouchableOpacity 
            onPress={() =>
              navigation.navigate({name:'SignUp'})
            }
          >
            <Text style={{color: '#2089dc'}}> create a new account</Text>  
          </TouchableOpacity>
        </View>


      </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'pink',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        //justifyContent: 'center',
        alignContent: 'center',
    },
    inputField: {
      top: 200,
      width: '90%',
    },
    title: {
      fontSize: 30,
      top: 150,
      //color: '#2089dc',
    }
})