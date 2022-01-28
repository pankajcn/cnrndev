/* eslint-disable prettier/prettier */
/**
 * React Native App
 * Developed and maintained by capital numbers
 * @format
 */

import React, {useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, DeviceEventEmitter } from 'react-native';
import { AppHeader } from '../../navigation';
import styles from './style';
import { apiHelper, commonValue, endpoints } from '../../api';
import { Helper, KeyboardScroll, Validation  } from '../../utils';
import Localized from '../../utils/LocalizedStrings';
import { AppButton } from '../commonComponents';
import { imagePath } from '../../theme';

const UserList = (props) => {

    const arrSideOptions = [
        { id: 0, title: Localized.User.name, type: 'name', keyboardType: 'default' },
        { id: 1, title: Localized.User.surname, type: 'surname', keyboardType: 'default' },
    ]

    const [userRequest, setuserRequest] = useState({
        name: props.route.params.dicData?.name || '',
        surname: props.route.params.dicData?.surname || '',
        validators: {
            name: { error: '', required: true },
            surname: { error: '', required: true },
        },
    });

    useEffect(() => {
        AppHeader({
            ...props,
            isMenu: false,
            title: 'User update',
            leftClick: () => {props.navigation.goBack()},
            rightClick: () => {},
        });
        const unsubscribe = props.navigation.addListener('focus', () => {
        })
        return () => {
            unsubscribe();
        };
    }, []);

    //API Calling
    const MethodsUserADD = () => {
        let validForm = Validation.ValidateForm(userRequest);
        setuserRequest({ ...userRequest }, validForm.value)
        if (validForm.status) {
          Keyboard.dismiss();
          let dic = { ...userRequest, id: props.route.params.dicData?.id || 0 };
          delete dic.validators;
          methodAddUserApiCall(dic);
        }
    }

    const methodAddUserApiCall = async (request) => {
        try {
          Helper.showLoader()
          const response = await apiHelper.post({ url: endpoints.USERDETAILSUPDATE, data: JSON.stringify(request) })
          Helper.hideLoader();
          if (response) {
            DeviceEventEmitter.emit('update_userlist');
            Helper.showToast(response.message, 'success');
            props.navigation.goBack();
          }
          else {
            Helper.showToast(response.message);
          }
        } catch (error) {
          Helper.hideLoader()
          Helper.showToast(commonValue.kSorryError);
        }
    };

    //Methods
    const methodAddEditUserRequest = (key, value) => {
        let dic = { ...userRequest };
        dic[key] = value;
        if (dic.validators && dic.validators[key]) {
          dic.validators[key].error = '';
        }
        setuserRequest(dic);
    };

    //UI rendering
    const renderItem = (item, index) => {
        let { title, type, keyboardType } = item;
        return (
          <View key={index.toString()} style={styles.backView}>
            <View style={styles.itemView}>
              <Text numberOfLines={1} style={styles.txtTitle}>{title}</Text>
              <View style={styles.rowView}>
                <TextInput
                  editable={true}
                  value={userRequest?.[type]}
                  scrollEnabled={false}
                  onChangeText={(text) => {
                    if (userRequest?.[type] === '' && text === ' ') {
                      return
                    }
                    methodAddEditUserRequest(type, text);
                  }}
                  keyboardType={keyboardType}
                  underlineColorAndroid="transparent"
                  placeholder={title}
                  style={styles.textInput}
                />
                {userRequest?.[type] && type !== 'email' ? <TouchableOpacity onPress={() => methodAddEditUserRequest(type, '')} hitSlop={{ left: 15, bottom: 15, right: 15, bottom: 15 }}>
                  <Image resizeMode={'contain'} source={imagePath.close} style={styles.cross} />
                </TouchableOpacity> : <View />}
              </View>
            </View>
            {userRequest?.validators?.[type]?.error ? <Text style={styles.txtError}>{userRequest?.validators?.[type]?.error}</Text> : <View />}
          </View>
        );
      };

    return (
        <View style={styles.container}>
        <KeyboardScroll style={styles.container}>
          {arrSideOptions.map((item, index) => {
            return (
                renderItem(item, index)
              );
          })}
          <View style={{ height: 10 }} />
          <AppButton
            text={Localized.User.submit}
            marginTop={10}
            onPress={() => MethodsUserADD()}
          />
          <View style={{ height: 15 }} />
        </KeyboardScroll>
      </View>
    );
};

export default UserList;
