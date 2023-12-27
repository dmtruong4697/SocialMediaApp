import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { React, useState, useEffect } from "react";

import { Input } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faListSquares, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import ProfileCard from "../../../components/ProfileCard";
import axios from "axios";
import { useSelector } from "react-redux";
const ListFriendScreen = () => {
  //******************************************************** */
  const [index, setIndex] = useState("0");
  const [friendListData, setFriendListData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [count, setCount] = useState(0);
  const handleListFriend = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_user_friends",
        {
          index: index,
          count: "10",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Get friends success");
        setFriendListData(response.data?.data?.friends || []);
        setCount(response.data?.data?.total || 0);
      } else {
        console.log("Get friends fail, response data:", response.data);
        console.log("response status: ", response.status);
        Alert.alert("Get fail", "please try again");
      }
    } catch (error) {
      console.error("Get friends false:", error);
      Alert.alert("Get friends false", "Please try again.");
      if (error.response) {
        console.error("response data: ", error.response.data);
        console.error("response status: ", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Yêu cầu đã được gửi nhưng không nhận được response
        console.error("Request data:", error.request);
      } else {
        // Các lỗi khác
        console.error("Lỗi không xác định:", error.message);
      }
    }
  };
  useEffect(() => {
    handleListFriend();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    console.log("search");
  };
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.listfriend_header}>
          <View>
            <Button
              title="Tất cả"
              type="clear"
              titleStyle={{ fontSize: 15, color: "#0780DC", fontWeight: 700 }}
              style={{
                borderRadius: 14,
                backgroundColor: "#DFE8FA",
              }}
            />
          </View>
          <View>
            <Button
              title="Gần đây"
              type="clear"
              titleStyle={{ fontSize: 15, color: "#303030", fontWeight: 700 }}
              style={{
                borderRadius: 14,
                backgroundColor: "#D1D1D2",
              }}
            />
          </View>
        </View>
        <View style={styles.search_friend}>
          <Input
            leftIcon={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Tìm kiếm bạn bè"
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.listfriend_contain}>
          {friendListData.map((item) => (
            <ProfileCard
              userId={item.id}
              avatarImage={item.avatar}
              userName={item.username}
              pressUnFriend={() => {
                handleUnFriend(item.id);
                setCount(count - "0" - 1);
              }}
              blockUser={() => {
                handleBlock(item.id);
                setCount(count - "0" - 1);
              }}
              mutualFriend={item.same_friends}
              key={item.id}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListFriendScreen;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  listfriend_header: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "red",
  },
});
