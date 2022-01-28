import React from 'react';
import { Alert} from 'react-native';
import { APP_NAME} from '../api/commonValue';

export const alert = (title = APP_NAME, alertMessage, cb) => {
    Alert.alert(
        title,
        alertMessage,
        [
            {
                text: "OK",
                onPress: () => {
                    if (cb) cb(true);
                },
            },
        ],
        { cancelable: false }
    );
}
export const alertTwoBtn = (title = APP_NAME, alertMessage, txtFirst = 'Yes', txtSec = 'No', cb) => {
    Alert.alert(
        title,
        alertMessage,
        [
            {
                text: txtFirst,
                onPress: () => {
                    if (cb) cb(true);
                },
            },
            {
                text: txtSec,
                onPress: () => {
                    if (cb) cb(false);
                },
                style: "cancel",
            },
        ],
        { cancelable: false }
    );
}
export const alertThreeBtn = (title = APP_NAME, alertMessage, txtFirst = 'Yes', txtSec = 'No', cb) => {
    Alert.alert(
        title,
        alertMessage,
        [
            {
                text: txtFirst,
                onPress: () => {
                    if (cb) cb(txtFirst);
                },
            },
            {
                text: txtSec,
                onPress: () => {
                    if (cb) cb(txtSec);
                },
                style: "cancel",
            },
            {
                text: 'Cancel',
                onPress: () => {
                    if (cb) cb('Cancel');
                },
                style: "cancel",
            },
        ],
        { cancelable: false }
    );
}