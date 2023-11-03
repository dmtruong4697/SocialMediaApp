import React from "react";
import propTypes from 'prop-types';
import { Button } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";

CommentCard.propTypes = {
    avatarImage: propTypes.string,
    userName: propTypes.string,
    userId: propTypes.string,
    contentCmt: propTypes.string,
    timeCmt: propTypes.string,
    countReact: propTypes.string,
}

CommentCard.defaultProps = {
    avatarImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczWMXADUdpzXqlMtq4iW6-epspP9EcPF5Qw&usqp=CAU',
    userName: 'User Name',
    userId: '',
    contentCmt: 'Main content of the comment',
    timeCmt: 'Just now',
    countReact: ''
}

function CommentCard(props) {
    const {avatarImage, userName, userId, contentCmt, timeCmt, countReact} =  props;

    return (
    <View style={styles.Container}>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.avatarImage}>
                <TouchableOpacity style={styles.avatarImage}>
                <Image style={styles.image} source={{uri: avatarImage}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.contentView}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>{userName}</Text>
                    <Text style={{fontSize: 15, fontWeight: '300'}}>{contentCmt}</Text>
            </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
        <View style={styles.ReactView}>
            <Text style={{fontSize: 13, fontWeight: '200', paddingRight: 7}}>{timeCmt}</Text>
            <View style={styles.buttonView}>
                <Button
                    title="Like"
                    type='clear'
                    titleStyle={{fontSize: 13, color: '#696969',}}
                    onPress={() => {
                        console.log('like')
                    }}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="Reply"
                    type='clear'
                    titleStyle={{fontSize: 13, color: '#696969',}}
                    onPress={() => {
                        console.log('reply')
                    }}
                />
            </View>

        </View>

        <View>
                <Text style={{fontSize: 13, color: '#696969',}}>{countReact}</Text>
        </View>
        </View>


        
    </View>
    
    )
}

export default CommentCard;

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        marginBottom: 5,
    },

    avatarImage: {
        flex: 1,
        borderRadius: 1000,
    },

    image: {
        height: '80%',
        width: '80%',
        borderRadius: 1000,
    },

    contentView: {
        flexDirection: 'column',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        padding: 10,
        flex: 5,
    },

    ReactView: {
        flexDirection: 'row',
        paddingLeft: '16.67%',
        alignItems: 'center',
    },

    buttonView: {
        
    },

    ReactLike: {
        marginRight: 10,
    }
})