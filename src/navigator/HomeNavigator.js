import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/Home/Post/FeedScreen';
import FriendRequestScreen from '../screens/Home/Friend/FriendRequestScreen';
import NotificationScreen from '../screens/Home/Notification/NotificationScreen';
import SettingScreen from '../screens/Home/Setting/SettingScreen';
import ProfileScreen from '../screens/Home/Profile/ProfileScreen';
import { Icon } from '@rneui/base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUserFriends, faBell, faGear, faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MyHeaderLeftComponent = (props) => {
  const {text} = props;
  return (
    <View style={{ marginLeft: 16 }}>
      <Text style={{ fontSize: 29, fontWeight: 'bold' }}>{text}</Text>
    </View>
  );
};

const MyHeaderRightFeed = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: 'row-reverse' }}>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: ''})}>
              <FontAwesomeIcon size={18} icon={faFacebookMessenger} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: 'Search'})}>
              <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: 'CreatePost'})}>
              <FontAwesomeIcon size={18} icon={faPlus} />
      </TouchableOpacity>
    </View>
  );
};

const HeaderRightFriend = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: 'row-reverse' }}>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: 'Search'})}>
              <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
    </View>
  );
}

const HeaderRightNotiAndMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16, flexDirection: 'row-reverse' }}>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: 'Search'})}>
              <FontAwesomeIcon size={18} icon={faMagnifyingGlass} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate({name: 'Search'})}>
              <FontAwesomeIcon size={18} icon={faGear} />
      </TouchableOpacity>
    </View>
  );
}

const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faHome} />
            )
        },
          headerTitle: () => null,
          headerLeft: () => <MyHeaderLeftComponent text='facebook'/>,
          headerRight: () => <MyHeaderRightFeed/>,
        }}
    />
      <Tab.Screen 
        name="Friend" 
        component={FriendRequestScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faUserFriends} />
            )
        },
        headerTitle: () => null,
        headerLeft: () => <MyHeaderLeftComponent text='Friends'/>,
        headerRight: () => <HeaderRightFriend/>,
        }}
    />
      <Tab.Screen 
        name="Notification" 
        component={NotificationScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faBell} />
            )
        },
        headerTitle: () => null,
        headerLeft: () => <MyHeaderLeftComponent text='Notifications'/>,
        headerRight: () => <HeaderRightNotiAndMenu/>,
        }}
    />
      <Tab.Screen 
        
        
        name="Setting" 
        component={ProfileScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faGear} />
            )
        },
        headerTitle: () => null,
        headerLeft: () => <MyHeaderLeftComponent text='Menu'/>,
        headerRight: () => <HeaderRightNotiAndMenu/>,
        }}
    />
      
    </Tab.Navigator>
  );
}

export default HomeNavigator;

const styles = StyleSheet.create ({
  buttonHeader: {
    borderWidth: 8,
    borderRadius: '50%',
    borderColor: '#e4e6eb',
    backgroundColor: '#e4e6eb',
    marginLeft: 8,
  },
})