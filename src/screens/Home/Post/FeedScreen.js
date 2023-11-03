import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CommentCard from '../../../components/CommentCard'

const FeedScreen = () => {
  const commentData= [
    {
      userId: '1',
      userName: 'Peter Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/a/aa/FamilyGuy_Single_PeterDrink_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202349',
      contentCmt: 'this is content of comment 1',
      timeCmt: 'Just now',
      countReact: '1 like'
    },
    {
      userId: '2',
      userName: 'Meg Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/1/1b/FamilyGuy_Single_MegMakeup_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171840',
      contentCmt: 'this is content of comment 2',
      timeCmt: '1m',
      countReact: '2 like'
    },    
    {
      userId: '3',
      userName: 'Lois Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/7/7c/FamilyGuy_Single_LoisPose_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171843',
      contentCmt: 'this is content of comment 3',
      timeCmt: '3m',
      countReact: ''
    },    
    {
      userId: '4',
      userName: 'Stewie Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/9/90/FamilyGuy_Single_StewieBackpack_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20200526171841',
      contentCmt: 'this is content of comment 4',
      timeCmt: '1h',
      countReact: '15 like'
    },    
    {
      userId: '5',
      userName: 'Chris Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/e/ee/FamilyGuy_Single_ChrisText_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230815202356',
      contentCmt: 'this is content of comment 5',
      timeCmt: '2h',
      countReact: ''
    },
    {
      userId: '6',
      userName: 'Brian Griffin',
      avatarImage: 'https://static.wikia.nocookie.net/familyguy/images/c/c2/FamilyGuy_Single_BrianWriter_R7.jpg/revision/latest/scale-to-width-down/1000?cb=20230807152447',
      contentCmt: 'this is content of comment 6',
      timeCmt: '1w',
      countReact: '1 like'
    },
  ]
  return (
    <ScrollView>
      <View style={styles.Container}>
        <Text style={styles.title}>Top comments</Text>

        {commentData.map((item) => <CommentCard
            userId={item.userId}
            avatarImage={item.avatarImage}
            userName={item.userName}
            key={item.userId}
            contentCmt={item.contentCmt}
            timeCmt={item.timeCmt}
            countReact={item.countReact}
          />)
        }
      </View>
    </ScrollView>
  )
}

export default FeedScreen

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: '500',
    padding: 10,
  }
})