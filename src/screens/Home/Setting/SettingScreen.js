import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
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
  }, [currentUser]);
  return (
    <View>
      <NotificationSetting />
      <LogoutButton
        onPress={() => {
          dispatch(logoutRequest(currentUser));
          //navigation.navigate({ name: "Login" });
        }}
      />
      {/* <Button
        title="Profile"
        type="clear"
        titleStyle={{ fontSize: 16, color: "#ffffff" }}
        style={{
          marginRight: 10,
          width: 140,
          borderRadius: 10,
          backgroundColor: "#2069a1",
        }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <Text
        style={{
          color: "red",
          alignSelf: "center",
          marginTop: 100,
        }}
      >
        {errorMessage}
      </Text> */}
    </View>
  );
};
const NotificationSetting = () => {
  let firstState = {};

  const obj = {
    like_comment: "Bình luận",
    from_friends: "Từ bạn bè",
    requested_friend: "Yêu cầu kết bạn",
    suggested_friend: "Đề xuất kết bạn",
    birthday: "Sinh nhật",
    video: "Video",
    report: "Báo cáo",
    sound_on: "Âm thanh bật",
    notification_on: "Thông báo bật",
    vibrant_on: "Chế độ màu sắc sôi động bật",
    led_on: "Đèn LED bật",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
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
        firstState = res.data.data;
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
  const onPress = () => {
    console.log("123");
    axios
      .post("https://it4788.catan.io.vn/set_push_settings", setting, {
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      })
      .then(() => {
        console.log("success");
      });
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.selectedOption}>{"Cài đặt thông báo"}</Text>
        <Text style={styles.dropdownIcon}>{isOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {Object.keys(setting).map((key) => (
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

          <TouchableOpacity
            style={{
              backgroundColor: "#2196F3",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 4,
            }}
            onPress={onPress}
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
        </View>
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    position: "relative",
    zIndex: 1,
  },
  dropdownButton: {
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
});
