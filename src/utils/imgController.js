import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, View, Image, Text, Button, StyleSheet, FlatList, ScrollView, Dimensions, TextInput, TouchableOpacity, ImageBackground, Platform, Modal, Alert, I18nManager, Keyboard } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, openSettings } from 'react-native-permissions';
import { commonValue } from '../api';
import { appColor, appFonts, imagePath } from '../theme';
import { AlertController } from '../utils';
import DocumentPicker from 'react-native-document-picker';

const ImgController = (props) => {
    if (props.route.params) {
        var { onSuccess, isCroping, quality, isDocument } = props.route.params;
    }

    const messages = {
        CAMERA_PERMISSION: 'Access to the camera has been prohibited please enable it in the Settings app to continue.',
        IMAGE_PROCESSING: 'Uploading, please wait...',
        FILE_ERROR: 'Please select a valid file.',
    };

    const selectCamera = async () => {
        checkPermission(PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.IOS.CAMERA, 'camera');
    }

    const selectGallery = async (type) => {
        checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.IOS.PHOTO_LIBRARY, type);
    }
    
    const selectDocument = async (type) => {
        checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.IOS.PHOTO_LIBRARY, type);
    }

    const checkPermission = async (androidType, iosType, mediaType) => {
        await check(Platform.select({
            android: androidType,
            ios: iosType
        })).then(result => {
            if (result == "granted" || result == "limited") {
                if (mediaType == 'camera')
                    openCameraView();
                else if (mediaType == 'gallery') {
                    openGalleryView()
                }
                else if (mediaType == 'document') {
                    openDocumentView()
                }
                return
            }
            else if (result == "blocked" || result == "unavailable") {
                AlertController.alertTwoBtn(commonValue.APP_NAME,messages.CAMERA_PERMISSION, 'Yes', 'No', ((status) => {
                    if (status) {
                        openSettings().catch(() => {
                            console.warn('cannot open settings')
                        });
                    }
                }));
                return
            }
            request(
                Platform.select({
                    android: androidType,
                    ios: iosType
                })
            ).then((status) => {
                if (status == "granted" || status == "limited") {
                    if (mediaType == 'camera') {
                        openCameraView();
                    }
                    else if (mediaType == 'gallery') {
                        openGalleryView()
                    }
                    else if (mediaType == 'document') {
                        openDocumentView()
                    }
                }
                // else if (result == "blocked" || result == "unavailable") {
                //     AlertController.permissionConfirm(messages.CAMERA_PERMISSION, ((status) => {
                //         if (status) {
                //             openSettings().catch(() => {
                //                 console.warn('cannot open settings')
                //             });
                //         }
                //     }));
                //     return
                // }
            });
        });
    }

    const onComplete = (res) => {
        props.navigation.goBack(null)
        onSuccess(res)
    }

    const openDocumentView = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
              type: [DocumentPicker.types.pdf],
            })
            console.log(
              res[0].uri,
              res[0].type, // mime type
              res[0].name,
              res[0].size,
            )
            onComplete(res[0])
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err
            }
          }
        // DocumentPicker.pickSingle({
        //     type: [DocumentPicker.types.allFiles],
        //     //There can me more options as well
        //     // DocumentPicker.types.allFiles
        //     // DocumentPicker.types.images
        //     // DocumentPicker.types.plainText
        //     // DocumentPicker.types.audio
        //     // DocumentPicker.types.pdf
        //   }).then((response) => {
        //     // res = response[0]
        //     // console.log("Data show:----", response);
        //     // console.log('res : ' + JSON.stringify(res));
        //     // console.log('URI : ' + res.uri);
        //     // console.log('File copyUrl : ' + res.fileCopyUri);
        //     // console.log('Type : ' + res.type);
        //     // console.log('File Name : ' + res.name);
        //     // console.log('File Size : ' + res.size);
        //     // console.log('Extension : ' + res.type.split('/')[1].trim());
        //     onComplete(response[0])
        //   }).catch((e) => {
        //     if (e.message == "Cannot find image data") {
        //         AlertController.alert(messages.FILE_ERROR);
        //     }
        //   });
         
    }

    const openCameraView = async () => {
        ImageCropPicker.openCamera({
            cropping: isCroping || false,
            compressImageQuality: 0.6,
            loadingLabelText: messages.IMAGE_PROCESSING,
            mediaType: "photo",
        }).then((response) => {
            onComplete(response)
        }).catch((e) => {
            if (e.message == "Cannot find image data") {
                AlertController.alert(messages.FILE_ERROR);
            }
        });
    }

    const openGalleryView = async () => {
        ImageCropPicker.openPicker({
            mediaType: "photo",
            compressImageQuality: 0.6,
            cropping: isCroping || false,
            loadingLabelText: messages.IMAGE_PROCESSING,
        }).then((response) => {
            onComplete(response)
        }).catch((e) => {
            if (e.message == "Cannot find image data") {
                AlertController.alert(messages.FILE_ERROR);
            }
        });
    }


    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: appColor.primary }}>
                <TouchableOpacity
                    onPress={() => selectCamera()}
                    style={styles.touchable}>
                    <Image source={imagePath.camera} style={styles.iconStyle} resizeMode={'contain'} />
                    <Text style={styles.textStyle}>Camera</Text>
                </TouchableOpacity>
                <View style={styles.seperator} />
                <TouchableOpacity
                    onPress={() => selectGallery('gallery')}
                    style={styles.touchable}>
                    <Image source={imagePath.gallery} style={styles.iconStyle} resizeMode={'contain'} />
                    <Text style={styles.textStyle}>Gallery</Text>
                </TouchableOpacity>
                <View style={styles.seperator} />
                {isDocument == true &&
                <TouchableOpacity
                    onPress={() => selectDocument('document')}
                    style={styles.touchable}>
                    <Image source={imagePath.gallery} style={styles.iconStyle} resizeMode={'contain'} />
                    <Text style={styles.textStyle}>Document</Text>
                </TouchableOpacity>
                }
                <View style={styles.seperator} />
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={styles.touchable}>
                    <Image source={imagePath.cancel} style={styles.iconStyle} resizeMode={'contain'} />
                    <Text style={styles.textStyle}>Dismiss</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ImgController;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        justifyContent: 'flex-end'
    },
    touchable: {
        flexDirection: 'row',
        backgroundColor: appColor.primary,
        padding: 15,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: appFonts.FONT_SIZE_16,
        color: appColor.white,
        fontFamily: appFonts.FONT_FAMILY_MEDIUM
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: appColor.white,
    },
    iconStyle: {
        height: 15,
        width: 15,
        marginRight: 10,
        tintColor: appColor.white
    }
})