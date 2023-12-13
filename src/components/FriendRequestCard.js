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
};

FriendRequestCard.defaultProps = {
  avatarImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczWMXADUdpzXqlMtq4iW6-epspP9EcPF5Qw&usqp=CAU",
  userName: "User name",
  userId: "",
  pressAccept: () => {},
  pressDel: () => {},
};
function FriendRequestCard(props) {
  const { avatarImage, userName, userId, pressAccept, pressDel } = props;
  const [isHidden, setIsHidden] = useState(false);

  return (
    <View>
     {isHidden ? 
       null : 
      <View style={styles.container}>
        <TouchableOpacity style={styles.avatarImage}>
          <Image style={styles.image} source={{ uri: avatarImage }} />
        </TouchableOpacity>

        <View style={styles.contentView}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{userName}</Text>

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
    //backgroundColor: '#e4e9ed',
    height: 90,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 5,
  },

  avatarImage: {
    width: 75,
    height: 75,
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
    padding: 5,
  },

  buttonView: {
    flexDirection: "row",
    marginTop: 10,
  },
});
