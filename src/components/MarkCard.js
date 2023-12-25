import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommentCard from './CommentCard'
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, parseISO } from 'date-fns';
import { changeInputType, changeMarkId } from '../redux/actions/post.action';
import { useDispatch, useSelector } from 'react-redux';

const MarkCard = (props) => {

  const BACKEND_URL = 'https://it4788.catan.io.vn'
  const {markDetail, postDetail} = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const inputType = useSelector((state) => state.post.inputType);

  const apiTime = markDetail.created;

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
      <View style={styles.markContainer}>
        <View style={styles.avatar}>
          <ImageBackground
            source={{uri: (markDetail.poster.avatar != '')? markDetail.poster.avatar:"a"}}
            imageStyle={{
              width: 50,
              height: 50,
              borderRadius: 1000,
            }}
          />
        </View>

        <View style={styles.content}>

          <View style={styles.mark}>
              <Text style={{fontWeight: 'bold'}}>{markDetail.poster.name}</Text>
              <Text>{markDetail.mark_content}</Text>
          </View>

          <View style={styles.time}>
              <Text style={{fontSize: 12, color: '#8c8c8c', fontWeight: '500'}}>{time}</Text>

              <TouchableOpacity
                style={{
                  //backgroundColor: 'pink',
                  //width: 80,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  dispatch(changeInputType("Reply"));
                  dispatch(changeMarkId(markDetail.id));
                }}
              >
                <Text style={{fontSize: 12, color: '#8c8c8c', fontWeight: '700'}}>Phản hồi</Text>
              </TouchableOpacity>
          </View>

        </View>
      </View>

      <View style={styles.comment}>
        <View 
          style={[
            {
              height: 71 * markDetail.comments.length,
              width: 25,
              //backgroundColor: 'yellow',
              borderLeftWidth: 1.5,
              borderLeftColor: '#c4c4c4',
              borderBottomWidth: (markDetail.comments.length != 0)? 1.5:0,
              borderBottomColor: '#c4c4c4',
              borderEndStartRadius: 10,
              marginLeft: 25,
            },
            styles.line,
          ]}>
        </View>

        <View style={styles.commentList}>

          {
            markDetail.comments.map((item) => <CommentCard commentDetail={item}/>)
          }

        </View>
      </View>

    </View>
  )
}

export default MarkCard

const styles = StyleSheet.create({
    container: {
      padding: 10,
      width: '100%',
      height: 'auto',
      flexDirection: 'column',
      //backgroundColor: 'pink',
      marginBottom: 0,
    },
    
    markContainer: {
        flexDirection: 'row',
    },

    avatar: {
        height: 50,
        width: 50,
        borderRadius: 1000,
        backgroundColor: 'gray',
        marginLeft: 2,
    },

    content: {
        height: '100%',
        flex: 1,
        //backgroundColor: 'yellow',
        marginLeft: 8,
        marginRight: 8,
        flexDirection: 'column',
    },

    mark: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ededed',
        borderRadius: 10,
        padding: 7,
    },

    time: {
        paddingLeft: 7,
        marginTop: 3,
        marginBottom: 10,
        flexDirection: 'row',
    },

    comment: {
      height: 'auto',
      width: '100%',
      //backgroundColor: 'pink',
      flexDirection: 'row',
    },

    line: {
      // width: 25,
      // //backgroundColor: 'yellow',
      // borderLeftWidth: 1.5,
      // borderLeftColor: '#c4c4c4',
      // borderBottomWidth: 1.5,
      // borderBottomColor: '#c4c4c4',
      // borderEndStartRadius: 10,
      // marginLeft: 25,
    },

    commentList: {
      flex: 1,
      //backgroundColor: 'blue',
    },

})