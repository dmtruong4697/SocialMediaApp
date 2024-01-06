// import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';
import axios from 'axios';

// export const handleChangePage = async (type, objectId, currentUser, navigation) => {
//     if ((+type >= 3) && currentUser && currentUser.token) {
//         try {
//             const response = await axios.post(
//                 "https://it4788.catan.io.vn/get_post",
//                 {
//                     id: objectId,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${currentUser.token}`,
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 navigation.navigate('PostDetail', { postDetail: response.data.data });
//             } else {
//                 console.log('response status: ', response.status);
//             }
//         } catch (error) {
//             console.error("Lỗi khi tải bài viết này:", error);
//         }
//     } else if ((+type < 3) && currentUser && currentUser.token) {
//         navigation.navigate('User Profile', { user_id: objectId });
//     }

// };

// const handleTitle = (userName, type) => {
//     switch (type) {
//         case "1":
//             return `${userName} đã gửi cho bạn một lời mời kết bạn`;

//         case "2":
//             return `${userName} đã chấp nhận lời mời kết bạn của bạn`;
//         case "3":
//             return `${userName} đã thêm một bài viết mới`;
//         case "4":
//             return `${userName} đã cập nhật một bài viết`;
//         case "5":
//             return `${userName} đã bày tỏ cảm xúc về một bài viết`;
//         case "6":
//             return `${userName} đã bình luận về một bài viết`;
//         case "7":
//             return `${userName} đã trả lời bình luận trong một bài viết`;
//         case "8":
//             return `${userName} đã thêm một video mới`;
//         case "9":
//             return `${userName} đã thêm một mark mới`;
//         default:
//             return "Thông báo này không có tiêu đề"
//     }
// }

//method was called to get FCM token for notification
export const getFcmToken = async (currentUser) => {
    console.log(currentUser);
    let token = null;
    await checkApplicationNotificationPermission();
    await registerAppWithFCM();
    try {
        token = await messaging().getToken();
        //console.log('getFcmToken-->', token);
        if (token) {
            try {
                const response = await axios.post(
                    "https://it4788.catan.io.vn/set_devtoken",
                    {
                        devtype: "1",
                        devtoken: token
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    console.log("Set dev token data succcess");
                } else {
                    console.log("response status: ", response.status);
                }
            } catch (error) {
                console.log("set dev token error", error);
            }
        }

    } catch (error) {
        console.log('getFcmToken Device Token error ', error);
    }
    return token;
};

//method was called on  user register with firebase FCM for notification
// export async function registerAppWithFCM() {
//     console.log(
//         'registerAppWithFCM status',
//         messaging().isDeviceRegisteredForRemoteMessages,
//     );
//     if (!messaging().isDeviceRegisteredForRemoteMessages) {
//         await messaging()
//             .registerDeviceForRemoteMessages()
//             .then(status => {
//                 console.log('registerDeviceForRemoteMessages status', status);
//             })
//             .catch(error => {
//                 console.log('registerDeviceForRemoteMessages error ', error);
//             });
//     }
// }

//method was called on un register the user from firebase for stoping receiving notifications
// export async function unRegisterAppWithFCM() {
//     console.log(
//         'unRegisterAppWithFCM status',
//         messaging().isDeviceRegisteredForRemoteMessages,
//     );

//     if (messaging().isDeviceRegisteredForRemoteMessages) {
//         await messaging()
//             .unregisterDeviceForRemoteMessages()
//             .then(status => {
//                 console.log('unregisterDeviceForRemoteMessages status', status);
//             })
//             .catch(error => {
//                 console.log('unregisterDeviceForRemoteMessages error ', error);
//             });
//     }
//     await messaging().deleteToken();
//     console.log(
//         'unRegisterAppWithFCM status',
//         messaging().isDeviceRegisteredForRemoteMessages,
//     );
// }

// export const checkApplicationNotificationPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//     }
//     request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
//         .then(result => {
//             console.log('POST_NOTIFICATIONS status:', result);
//         })
//         .catch(error => {
//             console.log('POST_NOTIFICATIONS error ', error);
//         });
// };

// //method was called to listener events from firebase for notification triger
// export function registerListenerWithFCM(currentUser, navigation) {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('onMessage Received : ', JSON.stringify(remoteMessage));
//         let jsonString;
//         if (remoteMessage?.notification?.title &&
//             remoteMessage?.notification?.data) {
//             jsonString = JSON.parse(remoteMessage.notification.data.json);
//             if (
//                 jsonString.user.id !== currentUser.id
//             ) {
//                 onDisplayNotification(
//                     remoteMessage.notification?.title,
//                     remoteMessage?.data,
//                 );
//             }
//         }
//     });
//     notifee.onForegroundEvent(async ({ type, detail }) => {
//         switch (type) {
//             case EventType.DISMISSED:
//                 console.log('User dismissed notification', detail.notification);
//                 break;
//             case EventType.PRESS:
//                 console.log('User pressed notification', detail.notification.data.json);
//                 if (detail.notification.data.json !== undefined) {
//                     let jsonObject = JSON.parse(detail.notification.data.json);
//                     if ((jsonObject.type && jsonObject.object_id) !== undefined) {
//                         await handleChangePage(jsonObject.type, jsonObject.object_id, currentUser, navigation);
//                     }
//                 }
//                 break;
//         }
//     });

//     notifee.onBackgroundEvent(async ({ type, detail }) => {
//         switch (type) {
//             case EventType.DISMISSED:
//                 console.log('User dismissed notification', detail.notification);
//                 break;
//             case EventType.PRESS:
//                 console.log('User pressed notification', detail.notification.data.json);
//                 if (detail.notification.data.json !== undefined) {
//                     let jsonObject = JSON.parse(detail.notification.data.json);
//                     if ((jsonObject.type && jsonObject.object_id) !== undefined) {
//                         await handleChangePage(jsonObject.type, jsonObject.object_id, currentUser, navigation);
//                     }
//                 }
//                 break;
//         }
//     });

//     messaging().onNotificationOpenedApp(async remoteMessage => {
//         console.log(
//             'onNotificationOpenedApp Received',
//             JSON.stringify(remoteMessage),
//         );
//         // if (remoteMessage?.data?.clickAction) {
//         //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
//         // }
//     });
//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );
//             }
//         });

//     return unsubscribe;
// }

// //method was called to display notification
// async function onDisplayNotification(title, data) {
//     console.log('onDisplayNotification HieuCao: ', JSON.stringify(data));
//     // Request permissions (required for iOS)
//     await notifee.requestPermission();
//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//     });
//     let body = "";
//     if (data) {
//         body = handleTitle(JSON.parse(data?.json)?.user?.username, JSON.parse(data?.json)?.type);
//     }
//     // Display a notification
//     await notifee.displayNotification({
//         title: title,
//         body: body,
//         data: data,
//         android: {
//             channelId,
//             // pressAction is needed if you want the notification to open the app when pressed
//             pressAction: {
//                 id: 'default',
//             },
//         },
//     });
// }