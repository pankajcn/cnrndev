/* eslint-disable prettier/prettier */
/**
 * React Native App
 * Developed and maintained by capital numbers
 * @format
 */

import React, {useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { AppHeader } from '../../navigation';
import styles from './style'
import { apiHelper, commonValue, endpoints } from '../../api';
import { Helper  } from '../../utils';
import { getData, setData } from '../../api/storageHelper'
import { handlePush } from '../../navigation/navigationService';

const UserList = (props) => {
    const [record, setRecord] = useState([]);

    useEffect(() => {
        AppHeader({
            ...props,
            isMenu: false,
            title: 'CN RN User list',
            leftClick: () => {props.navigation.goBack()},
            rightClick: () => {},
        });
        userData()
        const unsubscribe = DeviceEventEmitter.addListener('update_userlist', () => {
            MethodUsersList();
        });
        return unsubscribe;

    }, []);

    //API Calling
    const MethodUsersList = async () => {

            Helper.showLoader();
            const response = await apiHelper.get({ url: endpoints.USERLIST, data: {} });
            Helper.hideLoader();
            setRecord(response.data);
            setData(commonValue.kUserInfo, response.data)

    };

    //Methods
    const userData = async () => {
        let UserInfo = await getData(commonValue.kUserInfo)

        if (UserInfo !== null) {
            setRecord(UserInfo);
        } else {
            MethodUsersList();
        }
    };

    const MethodUpdateUser = (item) => {
        handlePush({ name: 'updateUser', params: { dicData: item } });
    };

    //UI rendering
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() =>  MethodUpdateUser(item)} style={[styles.backView]}>
                <Text numberOfLines={2} style={styles.txt}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.container}
                numColumns={1}
                extraData={record}
                data={record}
                bounces={false}
                showsHorizontalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default UserList;
