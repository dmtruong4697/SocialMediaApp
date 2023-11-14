import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/themed";
import PropTypes from "prop-types";
PostCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullname: PropTypes.string,
  }),
  post: PropTypes.shape({
    createdAt: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    images: PropTypes.array,
    likes: PropTypes.array,
  }),
};
function handleLike() {
  return;
}
function PostCard(prop) {
  const { user, post } = prop;
  post.likes = [];
  return (
    <>
      <View style={styles.post}>
        <View style={styles.container}>
          <View style={styles.user}>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri: user.avatar,
                }}
                style={styles.avatar}
              />
              <View style={styles.details}>
                <View style={{ textDecoration: "none", color: "inherit" }}>
                  <Text style={styles.name}>{user.fullname}</Text>
                </View>
                <Text style={styles.date}>
                  {/* {moment(post.createdAt).fromNow()} */}
                  {post.createdAt}
                </Text>
              </View>
            </View>
            {/* {showAction && post.userId === currentUser._id && (
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            )} */}
            {/* {menuOpen && post.userId === currentUser._id && showAction && (
              <>
                <button
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                  key={1}
                  className="delete"
                >
                  xóa
                </button>
                <button
                  onClick={() => {
                    setOpenUpdate(true);
                  }}
                  key={2}
                  className="updateButton"
                >
                  cập nhật
                </button>
              </>
            )} */}
          </View>
          <View style={styles.content}>
            <Text>{post.content}</Text>
            {post.images && post.images[0] && (
              // <img src={post.images[0]} alt="" />
              <TouchableOpacity>
                <Image
                  source={{
                    uri: post.images[0],
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.info}>
            <View style={styles.item}>
              {false ? (
                <Icon
                  name="favorite"
                  type="material"
                  style={{ color: "red" }}
                  onClick={handleLike}
                />
              ) : (
                <Icon name="favorite" type="material" onClick={handleLike} />
              )}
              <Text>{post.likes?.length} Likes</Text>
            </View>
            <View style={styles.item}>
              <Icon type="material" name="textsms"></Icon>
              <Text>Comments</Text>
            </View>
            <View
              style={styles.item}
              //   onClick={() => {
              //     setOpenShare(true);
              //   }}
            >
              <Icon type="material" name="share"></Icon>
              <Text>Share</Text>
            </View>
          </View>

          {/* {commentOpen && (
            <Comments postId={post._id} postComment={post.comments} />
          )} */}
        </View>
      </View>
    </>
  );
}
export default PostCard;
const styles = StyleSheet.create({
  post: {
    elevation: 4, // Android-only elevation for box shadow effect
    borderRadius: 20,
    backgroundColor: "white", // Replace "themed" with your theme function or color value
    color: "#000", // Replace "themed" with your theme function or color value
    margin: 10,
  },
  container: {
    padding: 20,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  userInfo: {
    flexDirection: "row",
    gap: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  details: {
    flexDirection: "column",
  },
  name: {
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
  },
  delete: {
    position: "absolute",
    top: 30,
    right: 0,
    borderWidth: 0,
    backgroundColor: "#f0544f",
    padding: 5,
    cursor: "pointer",
    color: "white",
  },
  updateButton: {
    position: "absolute",
    top: 55,
    right: 0,
    borderWidth: 0,
    backgroundColor: "#5271ff",
    padding: 5,
    cursor: "pointer",
    color: "white",
  },
  content: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    width: 250,
    height: 200,
    resizeMode: "cover",
    marginTop: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    fontSize: 14,
  },
});
