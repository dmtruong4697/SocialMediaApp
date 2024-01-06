import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const BlockUserCard = (props) => {

    const navigation = useNavigation();
    const avatarBackUp = "https://imgur.com/BwwePkj.jpg";
    const {
        avatarImage,
        userName,
        userId,
        unBlockUser,
      } = props;

    const [hidden, setHidden] = useState(false)

    return (
        (!hidden ? <View style={styles.container}>
            <TouchableOpacity style={styles.cardblock}>
                <Image
                style={styles.image}
                source={{ uri: avatarImage ? avatarImage : avatarBackUp }}
                />
                <Text style={{ fontSize: 17, fontWeight: 500 }}>{userName}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.unBlock} onPress={() => {unBlockUser(); setHidden(true)}}>
              <Text style={{color: 'gray', fontSize: 14,}}>Bỏ chặn</Text>
            </TouchableOpacity>
        </View> : <View></View>)
    )
}

BlockUserCard.propTypes = {
    avatarImage: PropTypes.string,
    userName: PropTypes.string,
    userId: PropTypes.string,
    unBlockUser: PropTypes.func,
};

export default BlockUserCard

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 5,
        alignItems:'center',
        paddingHorizontal: 10,
    },
    cardblock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    unBlock: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 3,
        padding: 5,
    },
    image: {
        aspectRatio: 1,
        width: 40,
      },
})