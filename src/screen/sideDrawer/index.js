import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, DeviceEventEmitter, View, Image, Text, Button, StyleSheet, FlatList, ScrollView, Dimensions, TextInput, TouchableOpacity, ImageBackground, Platform, Modal, Alert, I18nManager, Keyboard } from 'react-native';
import { appColor, imagePath } from '../../theme';
import { AlertController, Helper, ImageLoadView } from '../../utils';
import styles from './style';
import { apiHelper, commonValue, endpoints } from '../../api'
import { AppButton } from '../commonComponents';
import { handlePush } from '../../navigation/navigationService';
import { BASE_URL, WEB_URL } from '../../api/commonValue';
import { FAQ, PRIVACY_POLICY, TERMS_CONDITIONS } from '../../api/endpoints';

const SideDrawer = (props) => {
    const arrSideOptions = [
        { id: 0, title: 'Home', image: imagePath.tab4 },
        { id: 1, title: 'Appointments', image: imagePath.tab1 },
        { id: 2, title: 'Notification', image: imagePath.tab2 },
        { id: 3, title: 'Reminders', image: imagePath.reminders },
        { id: 4, title: 'Profile', image: imagePath.tab3 },
        { id: 5, title: 'Terms & Conditions', image: imagePath.faq },
        { id: 6, title: 'FAQ', image: imagePath.faq },
        { id: 7, title: 'Privacy Policy', image: imagePath.faq },
    ]
    const [userData, setUerData] = useState(global?.userData)

    useEffect(() => {
        Helper.splashHide()

        Helper.methodMyProfileApiCall()

        const unsubscribe = DeviceEventEmitter.addListener('update_user_data', () => {
            setUerData({ ...global?.userData })
        })
        return unsubscribe;
    }, [props.navigation]);

    const methodLogoutApiCall = async () => {
        try {
            Helper.showLoader()
            const response = await apiHelper.post({ url: endpoints.LOGOUT, data: '' })
            Helper.hideLoader()
            if (response && response.status == commonValue.kTrue) {
                Helper.showToast(response.message, 'success')
                Helper.logout(true)
            }
            else {
                Helper.showToast(response.message)
            }
        } catch (error) {
            Helper.hideLoader()
            //console.log('-error----------', error);
            Helper.showToast(commonValue.kSorryError)
        }
    }
    const methodLogout = () => {

        AlertController.alertTwoBtn(commonValue.APP_NAME, commonValue.kLogout, 'Yes', 'No', (isClick) => {
            if (isClick) {
                props.navigation.closeDrawer()

                methodLogoutApiCall()
            }
        })
    }
    const methodNavigate = (item, index) => {

        props.navigation.closeDrawer()
        switch (index) {
            case 0:
                handlePush({ name: 'HomeTab' })
                break;
            case 1:
                handlePush({ name: 'AppointmentsTab' })
                break;
            case 2:
                props.navigation.navigate('Notification')
                break;
            case 3:
                handlePush({ name: 'HomeTab' })

                props.navigation.navigate('Reminder')
                break;
            case 4:
                handlePush({ name: 'HomeTab' })

                handlePush({ name: 'ProfileTab' })
                break;
            case 5:
                handlePush({ name: 'HomeTab' })
                handlePush({ name: 'WebViewScreen', params: { title : 'Terms & Conditions', url :  WEB_URL + TERMS_CONDITIONS } })
                break;
            case 6:
                handlePush({ name: 'HomeTab' })
                handlePush({ name: 'WebViewScreen', params: { title : 'FAQ', url :  WEB_URL + FAQ } })
                break;

            case 7:
                handlePush({ name: 'HomeTab' })
                handlePush({ name: 'WebViewScreen', params: { title : 'Privacy Policy', url :  WEB_URL + PRIVACY_POLICY } })
                break;

                
            default:
                break;
        }
    }
    const renderHeader = () => {
        return (
            <View style={styles.viewHeader}>
                <ImageLoadView
                    style={styles.userImg}
                    resizeMode={'cover'}
                    source={userData?.profileImageUrl}
                />
                <Text style={styles.nameTxt}>{userData?.firstName + ' ' + userData?.lastName}</Text>
            </View>
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => methodNavigate(item, index)} style={styles.itemView}>
                <View style={styles.rowView}>
                    <Image source={item.image} resizeMode={'contain'} style={styles.img} />
                    <Text numberOfLines={2} style={styles.txt}>{item.title}</Text>
                </View>
                <Image source={imagePath.arrowRight} resizeMode={'contain'} style={styles.imgRight} />
            </TouchableOpacity>

        )
    }
    return (
        <View
            style={styles.container}
        >
            <FlatList
                style={styles.container}
                data={arrSideOptions}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
            />
            <AppButton
                text={'Logout'}
                style={{ width: 150, height: 40, marginHorizontal: 0, marginTop: 0, marginVertical: 10 }}
                onPress={() => methodLogout()}
            />
        </View>

    );
};

export default SideDrawer;
