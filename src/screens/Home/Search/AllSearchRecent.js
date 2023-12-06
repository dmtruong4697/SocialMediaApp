import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../../../components/ProfileCard';

const AllSearchRecent = () => {
    const navigation = useNavigation();

    const searchData = [
        {
          avatarImage: "https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349",
          userName: "John Doe",
          userId: '1',
          isNotFriend: false,
        },
      
        {
          avatarImage: "https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840",
          userName: "John Doe",
          userId: '2',
          isNotFriend: true,
        }
      ]

    const [pressBtn, setPressBtn] = useState('all');
    const [pressDel, setPressDel] = useState(true);//true hien thi, false k hien thi

    const handlePress = (buttonPress) => {
        setPressBtn(buttonPress);
    } 

    const isPressBtn = (buttonName) => {
        return pressBtn === buttonName;
    }

    return (
        <ScrollView style={styles.component}>
            <View style={styles.headerComponent}>
                <View style={{flex: 1,}}>
                    <TouchableOpacity style={{width: '20%', padding: 5,}} onPress={() =>
                    navigation.navigate({name: 'Search'})
                    }>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 18, flex: 1,}}>History Search</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                    title='Delete All'
                    titleStyle={{}}
                    buttonStyle={{padding: 0, margin: 0, }}
                    type= 'clear'
                    onPress={() => {setPressDel(false)}}
                />
                </View>
            </View>
            <View style={styles.options}>
                <Button
                    title={'All'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('all') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('all');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('all') && {backgroundColor: '#D9E1F0'}]}
                />
                <Button
                    title={'Searches'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('searches') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('searches');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('searches') && {backgroundColor: '#D9E1F0'}]}
                />
                <Button
                    title={'Access Times'}
                    titleStyle={[styles.titleStyleOption, isPressBtn('AccessTime') && {color: '#0866ff'}]}
                    onPress={() => {
                        handlePress('AccessTime');
                    }}
                    buttonStyle={[styles.buttonOption, isPressBtn('AccessTime') && {backgroundColor: '#D9E1F0'}]}
                />
            </View>
            <View>
                {pressDel ? (<View>{searchData.map((item, key) => <ProfileCard
                    avatarImage={item.avatarImage}
                    userName={item.userName}
                    userId={item.userId}
                    isNotFriend={item.isNotFriend}
                    key={key}
                    />)
                }</View>) : (<View></View>)}
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    component: {
        marginTop: '7%',
    },
    headerComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        marginHorizontal: 0,
        borderBottomWidth: 1,
        paddingBottom: '1%',
        borderColor: '#e9eaef',
    },

    options: {
        flexDirection: 'row',
        padding: '3%',
    },

    buttonOption: {
        borderRadius: 50,
        marginRight: 10,
        padding: 7,
        backgroundColor: '#E0E0E0',
    },

    titleStyleOption: {
        fontSize: 15, 
        color: '#000', 
        fontWeight: 500,
    },
})

export default AllSearchRecent;