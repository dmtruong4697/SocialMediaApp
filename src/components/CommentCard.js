import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, parseISO } from 'date-fns';

const CommentCard = (props) => {

    const {commentDetail} = props;

    const apiTime = commentDetail.created;

    const apiDate = parseISO(apiTime);
    
    const timeDifferenceInSeconds = differenceInSeconds(new Date(), apiDate);
    const timeDifferenceInMinutes = differenceInMinutes(new Date(), apiDate);
    const timeDifferenceInHours = differenceInHours(new Date(), apiDate);
    const timeDifferenceInDays = differenceInDays(new Date(), apiDate);
    
    let time;
    
    if (timeDifferenceInDays >= 1) {
      time = `${timeDifferenceInDays} ngày`;
    } else if (timeDifferenceInHours >= 1) {
      time = `${timeDifferenceInHours} giờ`;
    } else if (timeDifferenceInMinutes >= 1) {
      time = `${timeDifferenceInMinutes} phút`;
    } else {
      time = `${timeDifferenceInSeconds} giây`;
    }

  return (
    <View style={styles.container}>

      <View style={styles.avatar}>
        <ImageBackground
            source={{uri: (commentDetail.poster.avatar != '')? commentDetail.poster.avatar:"a"}}
            imageStyle={{
              width: 30,
              height: 30,
              borderRadius: 1000,
            }}
          />
      </View>

      <View style={styles.content}>

        <View style={styles.comment}>
            <Text style={{fontWeight: 'bold'}}>{commentDetail.poster.name}</Text>
            <Text>{commentDetail.content}</Text>
        </View>

        <View style={styles.time}>
            <Text style={{fontSize: 12, color: '#8c8c8c', fontWeight: '500'}}>{time}</Text>
        </View>

      </View>
    </View>
  )
}

export default CommentCard

const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        //justifyContent: 'center'
    },

    avatar: {
        height: 30,
        width: 30,
        borderRadius: 1000,
        backgroundColor: 'gray',
        marginLeft: 2,
    },

    content: {
        height: '100%',
        flex: 1,
        //backgroundColor: 'yellow',
        marginLeft: 8,
        //marginRight: 8,
        flexDirection: 'column',
    },

    comment: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ededed',
        borderRadius: 10,
        padding: 7,
    },

    time: {
        paddingLeft: 7,
        marginTop: 3,
    },

})