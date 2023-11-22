import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/Home/Post/FeedScreen';
import FriendRequestScreen from '../screens/Home/Friend/FriendRequestScreen';
import NotificationScreen from '../screens/Home/Notification/NotificationScreen';
import SettingScreen from '../screens/Home/Setting/SettingScreen';
import { Icon } from '@rneui/base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUserFriends, faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import ProfileScreen from '../screens/Home/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

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
        }}}
    />
      <Tab.Screen 
        name="Friend" 
        component={FriendRequestScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faUserFriends} />
            )
        }}}
    />
      <Tab.Screen 
        name="Notification" 
        component={NotificationScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faBell} />
            )
        }}}
    />
      <Tab.Screen 
        
        
        name="Setting" 
        component={ProfileScreen} 
        options={{tabBarIcon: () => {
            return(
                <FontAwesomeIcon icon={faGear} />
            )
        }}}
    />
      
    </Tab.Navigator>
  );
}

export default HomeNavigator