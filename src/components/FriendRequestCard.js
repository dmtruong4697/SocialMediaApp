import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, {useState} from "react";
import { Button } from "@rneui/themed";
import PropTypes from "prop-types";

FriendRequestCard.propTypes = {
  avatarImage: PropTypes.string,
  userName: PropTypes.string,
  userId: PropTypes.string,
  pressAccept: PropTypes.func,
  pressDel: PropTypes.func,
  mutualFriend: PropTypes.string,
};

function FriendRequestCard(props) {
  const { avatarImage, userName, userId, pressAccept, pressDel, mutualFriend } = props;
  const [isHidden, setIsHidden] = useState(false);
  const avatarBackUp = 'https://imgur.com/BwwePkj.jpg'

  return (
    <View>
     {isHidden ? 
       null : 
      <View style={styles.container}>
        <TouchableOpacity style={styles.avatarImage}>
          <Image style={styles.image} source={{ uri: (avatarImage ? avatarImage : avatarBackUp) }} />
        </TouchableOpacity>

        <View style={styles.contentView}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{userName}</Text>

          <Text style={{ fontSize: 14, color: '#A8A8A8' }}>{mutualFriend} bạn chung</Text> 

          <View style={styles.buttonView}>
            <Button
              title="Xác nhận"
              type="clear"
              titleStyle={{ fontSize: 16, color: "#ffffff" }}
              style={{
                marginRight: 10,
                width: 140,
                borderRadius: 8,
                backgroundColor: "#1373ab",
              }}
              onPress={() => {
                pressAccept();
                setIsHidden(true);
                console.log("Xác nhận");
              }}
            />

            <Button
              title="Xóa"
              color={"gray"}
              type="clear"
              titleStyle={{ fontSize: 16, color: "#000000" }}
              style={{
                marginRight: 10,
                width: 140,
                borderRadius: 8,
                backgroundColor: "#cdd4cf",
              }}
              onPress={() => {
                pressDel();
                setIsHidden(true);
                console.log("Xóa");
              }}
            />
          </View>
        </View>
      </View>
     }
    </View>
  );
}

export default FriendRequestCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#e4e9ed',
    // height: 90,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: '4%',
  },

  avatarImage: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: "gray",
  },

  image: {
    height: "100%",
    width: "100%",
    borderRadius: 1000,
  },

  contentView: {
    flexDirection: "column",
    height: "100%",
    width: "80%",
    paddingHorizontal: 10,
  },

  buttonView: {
    flexDirection: "row",
    marginTop: 10,
  },
});
