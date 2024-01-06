import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';

const ListFeelScreen = ({route}) => {

    //postDetail = route.params.postDetail;
    const [postDetail, setPostDetail] = useState(route.params.postDetail);
    const BACKEND_URL = 'https://it4788.catan.io.vn'
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.auth.currentUser);

    const [listFeel, setListFeel] = useState([]);


    const handleGetListFeel = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_URL}/get_list_feels`,
            {
              id: postDetail.id,
              index: 0,
              count: 1000,
            },
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );
          
          //console.log(response.data);
          setListFeel(response.data.data);
        } catch (error) {
          console.error("Lỗi khi get list feel:", error.response.data);
        }
      }; 

    useEffect(() => {
        handleGetListFeel();
    }, []);
  return (
    <View>
      <FlatList
        data={listFeel}
        style={{
            marginTop: 20,
        }}
        renderItem={({item}) => 
            <View
                style={{
                    height: 50,
                    width:"100%",
                    //backgroundColor: 'pink',
                    marginBottom: 10,
                    justifyContent: 'center',
                }}
            >
                {/* avatar image */}
                <View
                    style={{
                        //backgroundColor: 'yellow'
                        flexDirection: 'row',
                        height: 50,
                    }}
                >
                    <Image
                        source={{uri: (item.feel.user.avatar != '')? item.feel.user.avatar:""}}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 1000,
                            //alignSelf: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                    />

                    <Image 
                        style={{
                            height: 20, 
                            width: 20, 
                            position: 'absolute',
                            bottom: 2,
                            left: 33,
                        }} 
                        source={(item.feel.type == "1")? require('../../assets/icons/care.png'):require('../../assets/icons/angry.png')}
                    />

                    <View
                        style={{
                            height: '100%',
                            flex: 1,
                            //backgroundColor: 'pink',
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#b3b3b3',
                        }}
                    >
                        <Text
                            style={{
                                //alignSelf: 'center',
                                fontSize: 18,
                                
                            }}
                        >{item.feel.user.name}</Text>
                    </View>
                </View>
            </View>
        }
        keyExtractor={item => item.id}
      />

      {/* <TouchableOpacity
        onPress={() => console.log(listFeel)}
      >
        <Text>test</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default ListFeelScreen

const styles = StyleSheet.create({})