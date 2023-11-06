import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import PropTypes from 'prop-types';

NotificationCard.propTypes = {
    notificationImage: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string
}

NotificationCard.defaultProps = {
    notificationImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczWMXADUdpzXqlMtq4iW6-epspP9EcPF5Qw&usqp=CAU',
    title: 'User name',
    message: '',
    time: '1 ngày trước'
}
function NotificationCard(props) {

    const { notificationImage, title, message, time } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.notificationImage}>
                <Image style={styles.image} source={{ uri: notificationImage }} />
            </TouchableOpacity>

            <View style={styles.contentView}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '500' }}>{title} <Text
                    style={{ fontSize: 18, fontWeight: '300' }}>{message}</Text>
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '200' }}>{time}</Text>
            </View>



            <View style={styles.buttonView}>
                <Icon
                    name='more-horizontal'
                    type='feather'
                    color='black'
                    onPress={() => console.log('Tùy chọn')} />
            </View>
        </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#e4e9ed',
        height: 90,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 5,
        marginLeft: 10,
    },

    notificationImage: {
        width: 75,
        height: 75,
        borderRadius: 1000,
        backgroundColor: 'gray'
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 1000,
    },

    contentView: {
        flexDirection: 'column',
        height: '100%',
        width: '75%',
        padding: 5,
        marginRight: 5

    },

})