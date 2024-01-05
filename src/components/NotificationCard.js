import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';


NotificationCard.propTypes = {
    notificationImage: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string
}

NotificationCard.defaultProps = {
    notificationImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczWMXADUdpzXqlMtq4iW6-epspP9EcPF5Qw&usqp=CAU',
    title: 'User name',
    time: '1 ngày trước'
}
function NotificationCard(props) {
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const { notificationImage, title, time, type, objectId, group, user } = props;
    const placeHolderImageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Fplaceholder&psig=AOvVaw2ihJlODzRhb_kYcyTdHxI3&ust=1703088281258000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLD9ybnwm4MDFQAAAAAdAAAAABAX';

    const handleChangePage = async () => {
        if (type >= 3) {
            try {
                const response = await axios.post(
                    "https://it4788.catan.io.vn/get_post",
                    {
                        id: objectId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    navigation.navigate('PostDetail', { postDetail: response.data.data });
                } else {
                    console.log('response status: ', response.status);
                }
            } catch (error) {
                console.error("Lỗi khi tải bài viết này:", error);
            }
        } else {
            navigation.navigate('User Profile', { user_id: objectId });
        }

    };

    const handleTitle = () => {
        switch (type) {
            case "1":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã gửi lời mời kết bạn cho bạn
                    </Text>
                )

            case "2":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã chấp nhận lời mời kết bạn của bạn
                    </Text>
                )
            case "3":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã thêm bài viết mới
                    </Text>
                )
            case "4":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã cập nhật một bài viết
                    </Text>
                )
            case "5":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã bày tỏ cảm xúc về một bài viết
                    </Text>
                )
            case "6":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã bình luận về một bài viết
                    </Text>
                )
            case "7":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã trả lời một bình luận trong một bài viết
                    </Text>
                )
            case "8":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã thêm một video mới
                    </Text>
                )
            case "9":
                return (
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '300' }}>
                        <Text style={{ fontWeight: '500' }}>{user.username}</Text> đã thêm một bình luận mới
                    </Text>
                )
            default:
                return "Thông báo này không có tiêu đề"
        }
    }

    const handleNavigate = () => {
        handleChangePage();
    }

    return (
        <TouchableOpacity onPress={handleNavigate}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.notificationImage}>
                    {notificationImage !== '' ? (
                        <Image style={styles.image} source={{ uri: notificationImage }} />
                    ) : (
                        <Image style={styles.image} source={{ uri: placeHolderImageUrl }} />
                    )}
                </TouchableOpacity>
                <View style={styles.contentView}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: '500' }}>{handleTitle()}
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
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        width: 70,
        height: 70,
        borderRadius: 1000,
        backgroundColor: 'gray'
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 1000,
    },

    contentView: {
        marginLeft: 10,
        flexDirection: 'column',
        height: '100%',
        width: '70%',
        padding: 5,
        marginRight: 5

    },

})
export default NotificationCard

