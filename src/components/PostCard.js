import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useRef, useEffect } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";
import Modal from "react-native-modal";
import { useKeyboard } from "@react-native-community/hooks";
import { useWindowDimensions } from "react-native";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
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
function CommentModal({ showComment, setShowComment, user }) {
  const keyBoard = useKeyboard();
  const window = useWindowDimensions();
  const commentViewHeight =
    window.height - keyBoard.coordinates.end.height - 180;
  console.log(keyBoard, commentViewHeight);
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [keyBoard.keyboardShown]);
  // console.log(window, keyBoard);
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);
  return (
    <Modal
      // customBackdrop={
      //   <TouchableWithoutFeedback>
      //     <View style={{ flex: 1 }} />
      //   </TouchableWithoutFeedback>
      // }
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      isVisible={showComment}
      // onBackdropPress={() => setShowComment(false)}
      onSwipeComplete={() => setShowComment(false)}
      swipeDirection={["down"]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      scrollOffset={scrollOffset}
      scrollTo={(p) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo(p);
        }
      }}
      scrollOffsetMax={100000} //content height - ScrollView height
      propagateSwipe={true}
    >
      <View style={styles.commentModal}>
        <View style={styles.CommentHeader}>
          <Text style={{ fontSize: 25, fontWeight: 500 }}> Bình luận</Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onScroll={(e) => {
            setScrollOffset(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          style={{
            height: commentViewHeight,
          }}
        >
          <View style={styles.commentContent}>
            {[...Array(20).keys()].map((v, i) => (
              <CommentCard key={i} />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 30,
          }}
        >
          <Input style={styles.commentInput} placeholder="Viết bình luận..." />
          <Icon type="material" name="send" />
        </View>
      </View>
    </Modal>
  );
}
function ShareModal({ showModal, setShowModal, user }) {
  const keyBoard = useKeyboard();
  const window = useWindowDimensions();
  const commentViewHeight = window.height - keyBoard.keyboardHeight - 300;
  console.log(keyBoard, commentViewHeight);
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [keyBoard.keyboardShown]);
  // console.log(window, keyBoard);
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);
  const [textInputSize, setTextInputSize] = useState(35);
  return (
    <Modal
      // customBackdrop={
      //   <TouchableWithoutFeedback>
      //     <View style={{ flex: 1 }} />
      //   </TouchableWithoutFeedback>
      // }
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      isVisible={showModal}
      // onBackdropPress={() => setShowComment(false)}
      onSwipeComplete={() => setShowModal(false)}
      swipeDirection={["down"]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      scrollOffset={scrollOffset}
      scrollTo={(p) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo(p);
        }
      }}
      scrollOffsetMax={100} //content height - ScrollView height
      propagateSwipe={true}
    >
      <View style={styles.commentModal}>
        <View style={styles.CommentHeader}>
          <Text style={{ fontSize: 25, fontWeight: 500 }}> Chia sẻ</Text>
        </View>
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
            {/* <Text style={styles.date}>
              {moment(post.createdAt).fromNow()}
              {post.createdAt}
            </Text> */}
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onScroll={(e) => {
            setScrollOffset(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          style={{
            height: commentViewHeight + Math.min(textInputSize - 35, 50) - 20,
          }}
        >
          <TextInput
            editable
            multiline
            numberOfLines={20}
            maxLength={999}
            placeholder="Hãy nói gì đó về nội dung này..."
            onContentSizeChange={(e) => {
              setTextInputSize(e.nativeEvent.contentSize.height);
            }}
            style={{
              ...styles.shareTextInput,
              ...{ height: Math.max(35, textInputSize) },
            }}
          />
        </ScrollView>
        <Button type="solid" style={styles.shareButton}>
          Chia sẻ
        </Button>
      </View>
    </Modal>
  );
}
function PostCard(prop) {
  const { user, post } = prop;
  post.likes = [];
  const [like, setLike] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [showShare, setShowShare] = useState(false);
  return (
    <View>
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
            {/* Like section */}
            <View style={styles.item}>
              <Pressable
                onPress={() => {
                  setLike((like) => !like);
                }}
              >
                <Icon
                  name="thumb-up"
                  type="material"
                  color={like ? "black" : "#4267B2"}
                  onClick={() => {
                    console.log(123);
                    setLike((like) => !like);
                  }}
                />
              </Pressable>
              <Text>{post.likes?.length} Likes</Text>
            </View>
            {/* Comment section */}
            <Pressable
              onPress={() => {
                setShowComment(true);
              }}
            >
              <View style={styles.item}>
                <Icon type="material" name="textsms"></Icon>
                <Text>Comments</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowShare((showShare) => !showShare);
              }}
            >
              <View
                style={styles.item}
                //   onClick={() => {
                //     setOpenShare(true);
                //   }}
              >
                <Icon type="material" name="share"></Icon>
                <Text>Share</Text>
              </View>
            </Pressable>
          </View>

          {/* {commentOpen && (
            <Comments postId={post._id} postComment={post.comments} />
          )} */}
        </View>
      </View>

      <View>
        <CommentModal
          showComment={showComment}
          setShowComment={setShowComment}
        />
      </View>
      <View>
        <ShareModal
          showModal={showShare}
          setShowModal={setShowShare}
          user={user}
        />
      </View>
    </View>
  );
}
export default PostCard;
const styles = StyleSheet.create({
  post: {
    elevation: 4, // Android-only elevation for box shadow effect
    borderRadius: 20,
    backgroundColor: "white", // Replace "themed" with your theme function or color value
    color: "#000", // Replace "themed" with your theme function or color value
    margin: 0,
    marginVertical: 10,
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
  commentModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CommentHeader: {
    padding: 10,
  },
  commentContent: {
    paddingLeft: 10,
  },
  commentInput: {
    backgroundColor: "rgba(219, 210, 214, 0.3)",
    borderRadius: 9999,
    flex: 80,
  },
  shareTextInput: {
    backgroundColor: "white",
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
  },
  shareButton: {},
});
