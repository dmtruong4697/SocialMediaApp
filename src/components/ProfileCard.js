import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Button } from "@rneui/themed";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDotCircle,
  faEllipsis,
  faBan,
  faXmark,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = (props) => {
  const {
    avatarImage,
    userName,
    userId,
    isNotFriend,
    mutualFriends,
    pressUnFriend,
    mutualFriend,
    pressAddFriend,
    pressCancel,
    blockUser,
    isFriendSearch,
  } = props;
  const [optionVisible, setOptionVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [actionAdd, setActionAdd] = useState(false);
  const avatarBackUp = "https://imgur.com/BwwePkj.jpg";
  const navigation = useNavigation();

  const delSuggestFriends = () => {
    setIsHidden(true);
    console.log("Đã gỡ");
  };

  const translateToProfile = (user_id) => {
    navigation.navigate("User Profile", { user_id: user_id });
  };

  return (
    <View>
      {isHidden ? null : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.avatarImage}
            onPress={() => {
              translateToProfile(userId);
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: avatarImage ? avatarImage : avatarBackUp }}
            />
          </TouchableOpacity>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                translateToProfile(userId);
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>{userName}</Text>
              <Text style={{ fontSize: 14, color: "#A8A8A8" }}>
                {mutualFriend} mutual friends
              </Text>
            </TouchableOpacity>
            {isNotFriend ? (
              actionAdd ? (
                <View style={styles.button_cancel}>
                  <Button
                    title="Cancel"
                    color="gray"
                    type="clear"
                    titleStyle={{
                      fontSize: 16,
                      color: "#ffffff",
                      fontWeight: 600,
                    }}
                    style={{
                      borderRadius: 8,
                      backgroundColor: "gray",
                    }}
                    onPress={() => {
                      setActionAdd(false);
                      console.log("Hủy");
                      pressCancel();
                    }}
                  />
                </View>
              ) : (
                <View style={styles.profile_button}>
                  <View style={styles.button_1}>
                    <Button
                      title="Thêm bạn bè"
                      type="clear"
                      titleStyle={{
                        fontSize: 16,
                        color: "#0780DC",
                        fontWeight: 600,
                      }}
                      style={{
                        borderRadius: 8,
                        backgroundColor: "#BADFFC",
                      }}
                      onPress={() => {
                        pressAddFriend();
                        setActionAdd(true);
                        console.log("Gửi lời mời kết bạn");
                      }}
                    />
                  </View>

                  <View style={styles.button_2}>
                    <Button
                      title="Gỡ"
                      color="gray"
                      type="clear"
                      titleStyle={{
                        fontSize: 16,
                        color: "#0780DC",
                        fontWeight: 600,
                      }}
                      style={{
                        borderRadius: 8,
                        backgroundColor: "gray",
                      }}
                      onPress={() => {
                        delSuggestFriends();
                      }}
                    />
                  </View>
                </View>
              )
            ) : (
              <View>
                <Text>{mutualFriends}</Text>
              </View>
            )}
          </View>
          {isNotFriend ? null : (
            <View>
              <View style={styles.optionView}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => setOptionVisible(true)}
                >
                  <FontAwesomeIcon icon={faEllipsis} size={24} />
                </TouchableOpacity>
              </View>

              <Modal
                isVisible={optionVisible}
                onBackdropPress={() => setOptionVisible(false)}
                style={styles.optionModal}
                backdropColor={"#919492"}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
              >
                <View
                  style={{
                    height: "auto",
                    width: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.optionAction,
                      styles.optionActionHeaderModal,
                    ]}
                    onPress={() => {}}
                  >
                    <Image
                      style={{
                        height: "100%",
                        aspectRatio: 1,
                        borderRadius: 100,
                      }}
                      source={{ uri: avatarImage ? avatarImage : avatarBackUp }}
                    />
                    <Text style={{ fontSize: 18 }}>{userName}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionAction}
                    onPress={() => {
                      pressUnFriend();
                      console.log("huy");
                      setIsHidden(true);
                    }}
                  >
                    <View style={styles.iconModal}>
                      <FontAwesomeIcon icon={faFacebookMessenger} />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        Nhắn tin cho {userName}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionAction}
                    onPress={() => {
                      pressUnFriend();
                      console.log("huy");
                      setIsHidden(true);
                    }}
                  >
                    <View style={styles.iconModal}>
                      <FontAwesomeIcon icon={faRectangleXmark} />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        Bỏ theo dõi {userName}
                      </Text>
                      <Text style={{ fontSize: 13, color: "gray" }}>
                        Không nhìn thấy bài viết nhưng vẫn là bạn bè.
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {isFriendSearch ? <TouchableOpacity
                    style={styles.optionAction}
                    onPress={() => {
                      pressUnFriend();
                      console.log("huy");
                      setIsHidden(true);
                    }}
                  >
                    <View style={styles.iconModal}>
                      <FontAwesomeIcon icon={faXmark} />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        Hủy kết bạn với {userName}
                      </Text>
                      <Text style={{ fontSize: 13, color: "gray" }}>
                        Hủy kết bạn với {userName}
                      </Text>
                    </View>
                  </TouchableOpacity> : null}

                  <TouchableOpacity
                    style={[styles.optionAction, { paddingBottom: 10 }]}
                    onPress={() => {
                      blockUser();
                      setIsHidden(true);
                    }}
                  >
                    <View style={styles.iconModal}>
                      <FontAwesomeIcon icon={faBan} />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        Chặn {userName}
                      </Text>
                      <Text style={{ fontSize: 13, color: "gray" }}>
                        {userName} sẽ không nhìn thấy bạn hoặc liên hệ với bạn
                        trên facebook
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

ProfileCard.propTypes = {
  avatarImage: PropTypes.string,
  userName: PropTypes.string,
  userId: PropTypes.string,
  isNotFriend: PropTypes.bool,
  pressUnFriend: PropTypes.func,
  mutualFriend: PropTypes.string,
  isFriendSearch: PropTypes.bool,
  pressAddFriend: PropTypes.func,
  pressCancel: PropTypes.func,
  blockUser: PropTypes.func,
  translateToProfile: PropTypes.func,
};


export default ProfileCard;
const styles = StyleSheet.create({
  container: {
    height: 85,
    width: "95%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 5,
  },

  avatarImage: {
    alignSelf: "center",
    flex: 1,
    borderRadius: 1000,
  },

  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 1000,
  },

  content: {
    flex: 4,
    height: "100%",
    paddingTop: 5,
    paddingLeft: 10,
    justifyContent: "center",
    //backgroundColor: 'pink'
  },

  profile_button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  button_1: {
    flex: 1,
  },
  button_2: {
    flex: 1,
  },

  optionView: {
    //backgroundColor:'green',
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  optionButton: {
    //backgroundColor: 'red',
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  optionModal: {
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 0,
  },

  optionAction: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    // backgroundColor: 'pink',
    marginTop: 5,
    marginBottom: 5,
    // justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: "15%",
    alignItems: "center",
    gap: 10,
  },

  optionActionHeaderModal: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 15,
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    height: 70,
  },

  button_cancel: {
    marginTop: 10,
  },

  avtBackUp: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 1000,
  },

  iconModal: {
    borderWidth: 12,
    borderRadius: 50,
    borderColor: "#e4e6eb",
    backgroundColor: "#e4e6eb",
  },
});
