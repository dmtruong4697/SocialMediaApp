import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../screens/Home/Post/FeedScreen";
import FriendRequestScreen from "../screens/Home/Friend/FriendRequestScreen";
import NotificationScreen from "../screens/Home/Notification/NotificationScreen";
import SettingScreen from "../screens/Home/Setting/SettingScreen";
import ProfileScreen from "../screens/Home/Profile/ProfileScreen";
import { Icon } from "@rneui/base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUserFriends,
  faBell,
  faGear,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { updateCoinRequest } from "../redux/actions/coin.action";
import { useDispatch } from "react-redux";
const Tab = createBottomTabNavigator();

const MyHeaderLeftComponent = (props) => {
  const { text, color = "black" } = props;
  return (
    <View style={{ marginLeft: 16 }}>
      <Text style={{ fontSize: 29, fontWeight: "bold", color: color }}>
        {text}
      </Text>
    </View>
  );
};

const MyHeaderRightFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: "row-reverse" }}>
      {/* <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: ''})}>
              <FontAwesomeIcon size={18} icon={faFacebookMessenger} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => navigation.navigate({ name: "Search" })}
      >
        <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => navigation.navigate({ name: "CreatePost" })}
      >
        <FontAwesomeIcon size={18} icon={faPlus} />
      </TouchableOpacity>
    </View>
  );
};

const HeaderRightFriend = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: "row-reverse" }}>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => navigation.navigate({ name: "Search" })}
      >
        <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
    </View>
  );
};

const HeaderRightNotiAndMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: "row-reverse" }}>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => navigation.navigate({ name: "Search" })}
      >
        <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonHeader}
        onPress={() => {
          navigation.navigate({ name: "SettingHeader" });
        }}
      >
        <FontAwesomeIcon size={18} icon={faGear} />
      </TouchableOpacity>
    </View>
  );
};

const HomeNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 10,
                  marginRight: 12,
                }}
                source={require("../../assets/icons/home.png")}
              />
            );
          },
          headerTitle: () => null,
          headerLeft: () => (
            <MyHeaderLeftComponent text="facebook" color="#467ce6" />
          ),
          headerRight: () => <MyHeaderRightFeed />,
          //tabBarShowLabel: false,
          tabBarLabel: "Trang chủ",
          tabBarLabelStyle: {
            color: "black",
          },
          headerTintColor: "#467ce6",
        }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendRequestScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 10,
                  marginRight: 12,
                }}
                source={require("../../assets/icons/friend.png")}
              />
            );
          },
          headerTitle: () => null,
          headerLeft: () => <MyHeaderLeftComponent text="Bạn bè" />,
          headerRight: () => <HeaderRightFriend />,
          tabBarLabel: "Bạn bè",
          tabBarLabelStyle: {
            color: "black",
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 28,
                  width: 28,
                  marginLeft: 10,
                  marginRight: 12,
                }}
                source={require("../../assets/icons/notification.png")}
              />
            );
          },
          headerTitle: () => null,
          headerLeft: () => <MyHeaderLeftComponent text="Thông báo" />,
          headerRight: () => <HeaderRightNotiAndMenu />,
          tabBarLabel: "Thông báo",
          tabBarLabelStyle: {
            color: "black",
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        listeners={{
          tabPress: () => {
            dispatch(updateCoinRequest());
          },
          tabLongPress: () => {
            dispatch(updateCoinRequest());
          },
        }}
        options={{
          tabBarIcon: () => {
            return (
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 10,
                  marginRight: 12,
                }}
                source={require("../../assets/icons/menu.png")}
              />
            );
          },
          headerTitle: () => null,
          headerLeft: () => <MyHeaderLeftComponent text="Menu" />,
          headerRight: () => <HeaderRightNotiAndMenu />,

          tabBarLabel: "Menu",
          tabBarLabelStyle: {
            color: "black",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  buttonHeader: {
    borderWidth: 8,
    borderRadius: 50,
    borderColor: "#e4e6eb",
    backgroundColor: "#e4e6eb",
    marginLeft: 8,
  },
});
