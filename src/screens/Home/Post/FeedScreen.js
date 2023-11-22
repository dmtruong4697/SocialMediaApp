import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import PostCard from "../../../components/PostCard";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';//NDH
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';//NDH
import { useNavigation } from '@react-navigation/native';//NDH

const FeedScreen = () => {

  const navigation = useNavigation();//NDH

  const postData = [
    {
      user: {
        avatar:
          "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
        fullname: "John Doe",
      },
      post: {
        createdAt: "2021-01-01",
        userId: "user123",
        content: "Hello, this is my first post   !",
        images: [
          "https://th.bing.com/th/id/R.dcc7a232e55ef6fb90ae0fa7f04505b0?rik=6OD%2feyagC3qLjA&pid=ImgRaw&r=0",
        ],
        likes: [],
      },
    },
    {
      user: {
        avatar:
          "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
        fullname: "Jane Smith",
      },
      post: {
        createdAt: "2021-02-15",
        userId: "user456",
        content: "Check out this amazing photo!",
        images: [
          "https://th.bing.com/th/id/R.dcc7a232e55ef6fb90ae0fa7f04505b0?rik=6OD%2feyagC3qLjA&pid=ImgRaw&r=0",
        ],
        likes: [],
      },
    },
    // Add more posts below
    {
      user: {
        avatar:
          "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
        fullname: "Michael Johnson",
      },
      post: {
        createdAt: "2021-03-20",
        userId: "user789",
        content: "I'm excited to share my new project!",
        images: [
          "https://th.bing.com/th/id/R.dcc7a232e55ef6fb90ae0fa7f04505b0?rik=6OD%2feyagC3qLjA&pid=ImgRaw&r=0",
        ],
        likes: [],
      },
    },
    {
      user: {
        avatar:
          "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
        fullname: "Emily Thompson",
      },
      post: {
        createdAt: "2021-04-10",
        userId: "user1011",
        content: "Happy weekend everyone!",
        images: [
          "https://th.bing.com/th/id/R.dcc7a232e55ef6fb90ae0fa7f04505b0?rik=6OD%2feyagC3qLjA&pid=ImgRaw&r=0",
        ],
        likes: [],
      },
    },
    // Add more posts here if needed
  ];
  return (
    <ScrollView>
      
      <View style={styles.Container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Top posts</Text>
        
            {/* NDH */}
            <TouchableOpacity onPress={() =>
              navigation.navigate({name: 'Search'})
              }>
              <FontAwesomeIcon
                style={styles.searchIcon}
                icon={faMagnifyingGlass}
              />
            </TouchableOpacity>
            {/* NDH */}
        </View>
        

        {/* {commentData.map((item) => <CommentCard
            userId={item.userId}
            avatarImage={item.avatarImage}
            userName={item.userName}
            key={item.userId}
            contentCmt={item.contentCmt}
            timeCmt={item.timeCmt}
            countReact={item.countReact}
          />)
        } */}
        {postData.map((item, key) => (
          <PostCard
            style={styles.postCard}
            user={item.user}
            post={item.post}
            key={key}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    padding: 10,
  },
  postCard: {
    padding: 20,
  },


  searchIcon: {
    fontSize: 25,
    fontWeight: "500",
    padding: 10,
    marginTop: 15,
  },
});
