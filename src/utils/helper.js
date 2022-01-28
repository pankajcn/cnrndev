import { DeviceEventEmitter, Alert, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-root-toast';
import moment from 'moment';
import { showMessage, hideMessage } from 'react-native-flash-message';
import CameraRoll from "@react-native-community/cameraroll";
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
// import RNFetchBlob from 'rn-fetch-blob'

import { removeData, setData } from '../api/storageHelper';
import { kReward, kUserData, kUserToken } from '../api/commonValue';
import { CommonActions } from '@react-navigation/native';
import { handleSetRoot } from '../navigation/navigationService';
import { apiHelper, commonValue, endpoints } from '../api'
import Localized from '../utils/LocalizedStrings';
// import NotificationHandler from '../utils/NotificationHandler';
import { Constant } from '.';

export let deviceId = ''

export const setDeviceToken = (token) => {
    deviceId = token
}
export const setGlobalNavigation = (navigation) => {
    global.navRef = navigation;
}
export const setGlobalUserToken = (token) => {
    global.userToken = token;
}
export const setUserData = (data) => {
    global.userData = data;
}
export const registerLoader = (ref) => {
    global.loader = ref;
}
export const showLoader = (ref) => {
    global.loader?.showLoader()
}
export const hideLoader = (ref) => {
    global.loader?.hideLoader()
}
export const registerUser = (data) => {
    if (data.token) {
        setData(kUserToken, data.token)
        setGlobalUserToken(data.token)
    }
    setData(kUserData, data)
    setUserData(data)
}
export const handleLogout = (navigation, screenName) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: screenName },
            ],
        })
    );
}
export const logout = async (isLogin = true) => {
    removeData(kUserToken)
    setGlobalUserToken('')
    setUserData('')
    removeData(kUserData)
    removeData(kReward)

    if (isLogin) {
        handleSetRoot({ name: 'Auth' })
    }
}
export const splashHide = () => {
    SplashScreen.hide()
}
export function showToast(message, type = 'danger') {
    if (message) {
        // Toast.show(msg, {
        //     containerStyle: { marginTop: 50 },
        //     duration: Toast.durations.LONG,
        //     position: Toast.positions[position],
        //     backgroundColor: 'white',
        //     textColor: 'black',
        //     shadow: true,
        //     animation: true,
        //     hideOnPress: true,
        //     delay: 0,

        // });
        showMessage({
            message: message,
            type: type  //'danger', 'success', 'info','warning'
        });
    }
}
export async function methodMyProfileApiCall() {
    try {
        const response = await apiHelper.get({ url: endpoints.MY_PROFILE, data: '' })
        //console.log('methodMyProfileApiCall-----------', response);
        if (response && response.status == commonValue.kTrue && response.resultObj) {
            registerUser(response.resultObj)
            DeviceEventEmitter.emit('update_user_data')
        }
        else {
        }
    } catch (error) {
        //console.log('-error----------', error);
    }
}
export const getDateString = (date, formate) => {

    if (date) {
        return moment(date).format(formate)
    }
    return ''
}
export const getTimeString = (date, formate = 'HH:mm:ss', convertFormate = 'hh:mm A') => {

    if (date) {
        return moment(date, formate).format(convertFormate)
    }
    return ''
}
export const getDateTimeString = (date, formate) => {

    if (date) {
        return moment(date).format(formate)
    }
    return ''
}
export const strCapitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

export const MethodBackconfirm = (alertMessage, navigation) => {
    Alert.alert(
        Localized.Alert.kAppName,
        alertMessage,
        [
            { text: Localized.Alert.OK, onPress: () => { navigation.goBack() } },
        ],
        { cancelable: false }
    )
}

export const addSpaceAfterComma = (string) => {
    return string.replace(/, /g, ",").replace(/,/g, ", ")
}

//https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
export const formatPhoneNumber = (phoneNumberString) =>  {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return '';
}

//Download File Permission
export function FileDownload(url) {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === 'ios') {
        console.log("what is an image url ===== ", url)
        CameraRoll.saveToCameraRoll(url, "photo").then(showToast(Localized.Alert.kDocumentSaveMsg, 'success'))
                .catch(err => console.log('image Download err:', err))
        // downloadFile(url);
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'storage title',
            message: 'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            //console.log('Storage Permission Granted.');
            downloadFile(url);
          } else {
            //If permission denied then show alert 'Storage Permission 
            Alert.alert('Gallery permission not granted');
          }
        });
      } catch (err) {
        //To handle permission related issue
        //console.log('error', err);
      }
    }
}
  
//Download File method
export async function downloadFile(url) {

showToast('Document download start...', 'info');
let extenstion = url.split('.');
let extentionType = extenstion[extenstion.length - 1];

// const { config, fs } = RNFetchBlob;
let PictureDir = Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
let date = new Date();
const iosConfig = {
    fileCache: true,
    appendExt: extentionType,
    path:
    PictureDir +
    '/DocShowMedication_' +
    Math.floor(date.getTime() + date.getSeconds() / 2) + "." + extentionType,
    title: 'Medicine Report File',
    useDownloadManager: true,
};
const androidConfig = {
    fileCache: true,
    addAndroidDownloads: {
    //Related to the Android only
    useDownloadManager: true,
    notification: true,
    // mime: 'application/pdf',
    path:
        PictureDir +
        '/DocShowMedication_' +
        Math.floor(date.getTime() + date.getSeconds() / 2)+ "." + extentionType,
    description: 'Medicine Report File',
    },
}

const configOptions = Platform.select({
    ios: iosConfig,
    android: androidConfig,
});

config(configOptions)
    .fetch('GET', url)
    .then((res) => {
    //Showing alert after successful downloading
    console.log('res -> ', JSON.stringify(res), url);
    if (Platform.OS === "ios") {
        try {
           // RNFetchBlob.ios.openDocument(res.data);
            // RNFetchBlob.fs.writeFile(iosConfig.path, res.data, 'base64');
            // RNFetchBlob.ios.previewDocument(iosConfig.path);
          } catch (error) {
            console.log(error.message);
          }
    }
    else{
        alert('Medicine Report File Downloaded Successfully.');
    }
    });
}

export function widthAutoAdjust(_width) {
    if(Dimensions.get('window').width <= 412) {
        return _width + 10
    }else{
        return _width
    }
}
// export const alertNotification = (title, message, notif) => {
    
//     if(title == Constant.alarmTitle) {
//         Alert.alert(
//             title,
//             message,
//             [
//                 { text: Localized.Alert.skip, onPress: () => { 
//                         NotificationHandler.onAction(notif, 'skip');
//                     } 
//                 },
//                 { text: Localized.Alert.snooze, onPress: () => { 
//                     NotificationHandler.onAction(notif, 'snooze');
//                 } }, 
//                 { text: Localized.Alert.take, onPress: () => { 
//                     NotificationHandler.onAction(notif, 'take');
//                 } },
//             ],
//             { cancelable: false }
//         )
//     }
//  } 


 export const checkAndroidStoragePermission = async (cb) => {
    await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then(result => {
            if (result === "granted") {
                cb(true)
            }
            else if (result === "blocked" || result === "unavailable") {
                cb(false)

                this.DeniedPermissionPopup()
            }
            else {
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((status) => {
                    if (status === "granted") {
                        cb(true)

                    } else {
                        cb(false)

                        console.log('permission denied');
                    }
                });
            }
        })
        .catch(error => {
            cb(false)

            alert(error)
        });
}


export const MethodDocumentDownload = async (Image_Url) => {

    let extenstion = Image_Url.split('.');
    let extentionType = extenstion[extenstion.length - 1];
    console.log("Document url image", Image_Url, extentionType)

    if (Image_Url) {
        if (Platform.OS === 'android') {
            // Helper.showLoader()
            Alert.alert(
                Localized.Alert.kAppName,
                Localized.Alert.kDocumentDownload,
                [
                    {
                        text: Localized.Alert.OK, onPress: () => {
                            checkAndroidStoragePermission((Permission) => {
                                if (Permission) {
                                    RNFetchBlob
                                        .config({
                                            fileCache: true,
                                            appendExt: extentionType
                                        })
                                        .fetch('GET', Image_Url)
                                        .then((res) => {
                                            CameraRoll.save(res.path(), 'photo').then(onfulfilled => {
                                                showToast(Localized.Alert.kDocumentSaveMsg, 'success');
                                            }).catch(error => {
                                                console.log('image Download err:', error);
                                            });
                                            // log.d("Path", red.path())
                                            //     .then(Helper.showToast(Localized.Alert.kDocumentSaveMsg))
                                            //     .catch(err => console.log('image Download err:', err))
                                        })
                                }
                            })
                        }
                    },
                ],
                { cancelable: false }
            )
        }
        else {
            CameraRoll.saveToCameraRoll(Image_Url, "photo").then(showToast(Localized.Alert.kDocumentSaveMsg, 'success'))
                .catch(err => console.log('image Download err:', err))
        }
    }
    else {
        showToast(Localized.Alert.kNoData, 'success')
    }
}
