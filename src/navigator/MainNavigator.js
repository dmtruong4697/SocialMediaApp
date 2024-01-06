import { StyleSheet, Text, View, } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginScreen from "../screens/Login/LoginScreen";
import SignUpScreen from "../screens/Login/SignUpScreen";
import ForgotPasswordScreen from "../screens/Login/ForgotPasswordScreen";
import HomeNavigator from "./HomeNavigator";
import EditProfileScreen from "../screens/Home/Profile/EditProfileScreen";
import ProfileScreen from "../screens/Home/Profile/ProfileScreen";
import FriendListScreen from "../screens/Home/Friend/FriendListScreen";
import FriendSuggestedScreen from "../screens/Home/Friend/FriendSuggestedScreen";
import SearchResultScreen from "../screens/Home/Search/SearchResultScreen";
import EditDetailProfile from "../screens/Home/Profile/EditDetailProfile";
import SearchScreen from "../screens/Home/Search/SearchScreen";
import ListFriendScreen from "../screens/Home/Profile/ListFriendScreen";
import { faL } from "@fortawesome/free-solid-svg-icons";
import AllSearchRecent from "../screens/Home/Search/AllSearchRecent";
import VerifyCode from "../screens/Login/VerifyCode";
import ChangeInfoScreen from '../screens/Login/ChangeInfoScreen';
import CreatePostScreen from '../screens/Home/Post/CreatePostScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCancel, faMultiply, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import PostDetailScreen from '../screens/Home/Post/PostDetailScreen';
import UserProfileScreen from '../screens/Home/Profile/UserProfileScreen';
import EditAvatar from "../screens/Home/Profile/EditAvatar";
import EditCover from "../screens/Home/Profile/EditCover";
import SettingScreen from "../screens/Home/Setting/SettingScreen";
import BlockListScreen from "../screens/Home/Friend/BlockListScreen";
import EditPostScreen from "../screens/Home/Post/EditPostScreen";
import ListFeelScreen from "../components/ListFeelScreen";

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  const navigation = useNavigation();
  const HeaderRightFriend = () => {
    const navigation = useNavigation();
    return (
      <View style={{ flexDirection: "row-reverse" }}>
        <TouchableOpacity
          // style={styles.buttonHeader}
          onPress={() => navigation.navigate({ name: "Search" })}
        >
          <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="SignUp" component={SignUpScreen} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      <Stack.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='EditProfile'
        component={EditProfileScreen}

      />
      <Stack.Screen
        name='EditAvatar'
        component={EditAvatar}

      />
      <Stack.Screen
        name='EditCover'
        component={EditCover}

      />
      <Stack.Screen
        name='ListFriend'
        component={ListFriendScreen}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
      />
      <Stack.Screen
        name='User Profile'
        component={UserProfileScreen}
      />
      <Stack.Screen
        name='FriendList'
        component={FriendListScreen}
        options={{
          headerTitle: 'Bạn bè',
          headerRight: () => <HeaderRightFriend />,
        }}
      />

      <Stack.Screen
        name="FriendSuggest"
        component={FriendSuggestedScreen}
        options={{
          headerTitle: "Gợi ý",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: "Search" });
              }}
            >
              <FontAwesomeIcon size={20} color="black" icon={faMagnifyingGlass} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingHeader"
        component={SettingScreen}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Edit Detail Profile" component={EditDetailProfile} />
      <Stack.Screen
        name="HistorySearch"
        component={AllSearchRecent}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="VerifyCode" component={VerifyCode} />

      <Stack.Screen
        name="ChangeInfo"
        component={ChangeInfoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Tạo bài viết",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: "Feed" });
              }}
            >
              <FontAwesomeIcon size={20} icon={faMultiply} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: "Bài đăng",
        }}
      />

      <Stack.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{
          title: "Sửa bài đăng",
        }}
      />

      <Stack.Screen
        name="ListFeel"
        component={ListFeelScreen}
        options={{
          title: "Danh sách bày tỏ cảm xúc",
        }}
      />

      <Stack.Screen
        name="BlockScreen"
        component={BlockListScreen}
        options={{
          title: 'Chặn',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    padding: 10,
    backgroundColor: "#0780DC",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
  },

  buttonHeader: {
      borderWidth: 8,
      borderRadius: 50,
      borderColor: "#e4e6eb",
      backgroundColor: "#e4e6eb",
      marginLeft: 8,
      marginRight: 0,
  },
});
