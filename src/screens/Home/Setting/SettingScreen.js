import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../../redux/actions/auth.action";
import axios from "axios";
const SettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  useEffect(() => {
    if (!currentUser) {
      navigation.navigate({ name: "Login" });
    }
  }, [currentUser, navigation]);
  return (
    <View>
      <NotificationSetting />
      <BlockList />
      <LogoutButton
        onPress={() => {
          // dispatch(logoutRequest(currentUser));
          navigation.navigate({ name: "Login" });
        }}
      />
      {/* Lỗi logout cần sửa tạm thời để như cũ */}

      <Text
        style={{
          color: "red",
          alignSelf: "center",
          fontSize: 25,
          marginTop: 10,
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};
const NotificationSetting = () => {
  const obj = {
    like_comment: "Bình luận",
    from_friends: "Từ bạn bè",
    requested_friend: "Yêu cầu kết bạn",
    suggested_friend: "Đề xuất kết bạn",
    birthday: "Sinh nhật",
    video: "Video",
    report: "Báo cáo",
    sound_on: "Giọng nói",
    notification_on: "Thông báo",
    vibrant_on: "Rung",
    led_on: "Sáng đèn",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [firstState, setFirstState] = useState({});
  const [setting, setSetting] = useState({});
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    console.log(currentUser);

    axios
      .post(
        "https://it4788.catan.io.vn/get_push_settings",
        {},
        {
          headers: {
            Authorization: "Bearer " + currentUser.token,
          },
        }
      )
      .then((res) => {
        setFirstState(res.data.data);
        setSetting(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("setting");
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionPress = (key) => {
    console.log(firstState, setting);
    setSetting((setting) => {
      return { ...setting, [key]: setting[key] == "1" ? "0" : "1" };
    });
  };
  const onPress = (_setting) => {
    console.log("123");
    axios
      .post("https://it4788.catan.io.vn/set_push_settings", _setting, {
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      })
      .then(() => {
        console.log("success");
        setFirstState(_setting);
      });
  };

  return (
    <View>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}
        >
          <Text style={styles.selectedOption}>{"Cài đặt thông báo"}</Text>
          <Text style={styles.dropdownIcon}>{isOpen ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {isOpen && (
          <View>
            <View style={styles.dropdownOptions}>
              {Object.keys(setting)
                .slice(0, -4)
                .map((key, index, array) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(key)}
                  >
                    <Text style={styles.optionText}>
                      {obj[key]}:{setting[key] == "1" ? "Bật" : "Tắt"}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
      </View>
      {isOpen && JSON.stringify(firstState) !== JSON.stringify(setting) && (
        <TouchableOpacity
          style={{
            // width: "100%",
            backgroundColor: "#3b5998",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 25,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
          onPress={() => onPress(setting)}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Lưu thay đổi
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingScreen;

const LogoutButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
const BlockList = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios
      .post(
        "https://it4788.catan.io.vn/get_list_blocks",
        { index: 0, count: 100 },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={[
          {
            id: "12",
            name: "Leo  Messi",
            avatar:
              "https://it4788.catan.io.vn/files/avatar-1703201924547-557531918.jpg",
          },
        ]}
        renderItem={({ item }) => <BlockUser user={item} />}
      />
    </View>
  );
};
const BlockUser = ({ user }) => {
  console.log(user);
  return (
    <View>
      <Text>12</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b5998",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
  },
  container1: {
    backgroundColor: "#ffffff",
    // paddingVertical: 12,
    // paddingHorizontal: 24,

    // alignItems: "center",
    // justifyContent: "center",
  },
  dropdownButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownIcon: {
    fontSize: 14,
  },
  dropdownOptions: {
    // position: "absolute",
    // top: "100%",
    // left: 0,
    // right: 0,
    // backgroundColor: "",
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 4,
    marginTop: 4,
  },
  optionButton: {
    backgroundColor: "#ffffff",
    // borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 2,
  },
  optionText: {
    fontSize: 16,
  },
});
const styles1 = StyleSheet.create({});
