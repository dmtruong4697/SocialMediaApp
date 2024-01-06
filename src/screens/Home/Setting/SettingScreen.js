import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon } from "@rneui/themed";
import { FlatList, Image, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../../redux/actions/auth.action";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <NotificationSetting />
      <BlockList />
      <ChangePassword />
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
    </ScrollView>
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
            marginLeft: 200,
            marginRight: 20,
            backgroundColor: "#3b5980",
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
            // marginHorizontal: 20,
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
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
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
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setOpen((state) => !state);
          navigation.navigate("BlockScreen", { BlockListUser: userList})
        }}
      >
        <Text style={styles.selectedOption}>{"Danh sách chặn"}</Text>
        <Text style={styles.dropdownIcon}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <FlatList
          keyExtractor={(item) => item.id}
          data={userList}
          renderItem={({ item, index }) => (
            <BlockUser user={item} index={index} setUserList={setUserList} />
          )}
        />
      )}
    </View>
  );
};
const BlockUser = ({ user, index, setUserList }) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(user);
  return (
    <View style={styles1.userBlockContaine}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={() => {
          if (currentUser.id != user.id) {
            navigation.navigate("User Profile", {
              user_id: user.id,
            });
          } else {
            navigation.navigate("Profile");
          }
        }}
      >
        <Image
          source={user.avatar ? { uri: user.avatar } : null}
          style={{ width: 40, height: 40, borderRadius: 9999 }}
        />
        <Text style={{ fontSize: 20, textAlign: "center", marginLeft: 5 }}>
          {" "}
          {user.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles1.unBanButton}
        onPress={() => {
          axios
            .post(
              "https://it4788.catan.io.vn/unblock",
              { user_id: user.id },
              { headers: { Authorization: `Bearer ${currentUser.token}` } }
            )
            .then((res) => {
              // console.log(res);
              axios
                .post(
                  "https://it4788.catan.io.vn/get_list_blocks",
                  { index: "0", count: "100" },
                  { headers: { Authorization: `Bearer ${currentUser.token}` } }
                )
                .then((res) => {
                  setUserList(res.data.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log("123");
              console.log(err);
            });
        }}
      >
        <Text style={styles1.text}>Bỏ chặn</Text>
      </TouchableOpacity>
    </View>
  );
};
const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setOpen((state) => !state);
        }}
      >
        <Text style={styles.selectedOption}>{"Đổi mật khẩu"}</Text>
        <Text style={styles.dropdownIcon}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View>
          <View style={{ marginTop: 10 }}>
            <View style={styles2.container}>
              <TextInput
                style={styles2.input}
                placeholder="Nhập mật khẩu cũ"
                secureTextEntry={!showPassword1}
                value={password1}
                onChangeText={(text) => {
                  setPassword1(text);
                }}
              />
              <TouchableOpacity
                style={styles2.toggle}
                onPress={() => {
                  setShowPassword1((state) => !state);
                }}
              >
                <Icon
                  name={showPassword1 ? "eye" : "eye-slash"}
                  type="font-awesome-5"
                  style={styles2.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles2.container}>
              <TextInput
                style={styles2.input}
                placeholder="Nhập mật khẩu mới"
                secureTextEntry={!showPassword2}
                value={password2}
                onChangeText={(text) => {
                  setPassword2(text);
                }}
              />
              <TouchableOpacity
                style={styles2.toggle}
                onPress={() => {
                  setShowPassword2((state) => !state);
                }}
              >
                <Icon
                  name={showPassword2 ? "eye" : "eye-slash"}
                  type="font-awesome-5"
                  style={styles2.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles2.container}>
              <TextInput
                style={styles2.input}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={!showPassword3}
                value={password3}
                onChangeText={(text) => {
                  setPassword3(text);
                }}
              />
              <TouchableOpacity
                style={styles2.toggle}
                onPress={() => {
                  setShowPassword3((state) => !state);
                }}
              >
                <Icon
                  name={showPassword3 ? "eye" : "eye-slash"}
                  type="font-awesome-5"
                  style={styles2.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {password1 && password2 && password3 && (
            <View>
              <TouchableOpacity
                style={{
                  marginLeft: 200,
                  marginRight: 20,
                  backgroundColor: "#3b5980",
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
                }}
                onPress={() => {
                  if (password2 != password3) {
                    setErrorMessage("Mật khẩu nhập lại chưa khớp");
                    return;
                  }
                  if (password2.length < 6) {
                    setErrorMessage("Mật khẩu mới phải ít nhất 6 kí tự");
                    return;
                  }
                  {
                    axios
                      .post(
                        "https://it4788.catan.io.vn/change_password",
                        { password: password1, new_password: password2 },
                        {
                          headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                          },
                        }
                      )
                      .then((res) => {
                        setPassword1("");
                        setPassword2("");
                        setPassword3("");
                      })
                      .catch((err) => {
                        console.log(err?.response?.data?.message);
                        if (
                          err?.response?.data?.message ==
                          "Password is not correct"
                        ) {
                          setErrorMessage("Mật khẩu chưa chính xác");
                        } else {
                          setErrorMessage("Lỗi. Xin vui lòng thử lại");
                        }
                      });
                  }
                }}
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
          <Text
            style={{
              color: "red",
              alignSelf: "center",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            {errorMessage}
          </Text>
        </View>
      )}
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
    marginVertical: 10,
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
const styles1 = StyleSheet.create({
  userBlockContaine: {
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
  unBanButton: {
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
    fontSize: 12,
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
  },
});
const styles2 = {
  container: {
    position: "relative",
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  toggle: {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  icon: {
    width: 30,
    height: 22,
  },
};
