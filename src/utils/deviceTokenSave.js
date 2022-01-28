import { DeviceEventEmitter, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Helper } from '.';
import { setDeviceToken, device_token } from './helper';
import { JSON_HEADER } from '../api/commonValue';
import { apiHelper, commonValue, endpoints } from '../api'

export function updateDeviceToken() {
    if (Platform.OS === 'android') {
        getToken();
    }
    else {
        checkPermission()
    }
}
export async function getToken() {
    let fcmToken = null;
    // await messaging().deleteToken();
    fcmToken = await messaging().getToken()
    if (fcmToken) {
        sendToken(fcmToken);
    }
}
export function checkPermission() {
    messaging().hasPermission().then((enabled) => {
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
    });
}
export function requestPermission() {
    try {
        messaging().requestPermission().then((enabled) => {
            if (enabled) {
                getToken();
            }
            else {
                getToken();

            }
        });
    } catch (error) {
    }
}
export async function sendToken(fcmToken) {
    setDeviceToken(fcmToken)
    console.log('sendToken----------', fcmToken)
    if (global?.userToken) {
        let temp = {};
        temp.device_type = Platform.OS;
        temp.deviceId = fcmToken;
        temp.userId = global?.userData?.id;
        methodUploadDeviceToken(temp)
    }
}
const methodUploadDeviceToken = async (request) => {
    try {
        const response = await apiHelper.post({ url: endpoints.UPDATE_DEVICE_TOKEN, data: JSON.stringify(request), header: JSON_HEADER })
        //console.log('methodUploadDeviceToken-----------', response);
        if (response && response.status == commonValue.kTrue) {
        }
        else {
        }
    } catch (error) {
        //console.log('-error----------', error);
    }
}