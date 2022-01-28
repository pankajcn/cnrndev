import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native'
import { handleSetRoot } from '../../navigation/navigationService'
import { setGlobalUserToken, setUserData, setGlobalNavigation  } from '../../utils/helper'
import { getData  } from '../../api/storageHelper'
import { kUserToken, kUserData  } from '../../api/commonValue'
import { appColor  } from '../../theme'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setGlobalNavigation(navigation)
        async function checkUserLogin() {
            let token = await getData(kUserToken)
            let userData = await getData(kUserData)
            if (token) {
                setGlobalUserToken(token)
                setUserData(userData)
                setTimeout(() => {
                    handleSetRoot({ name: 'Drawer' });
                }, 1000)
            }
            else {
                setTimeout(() => {
                    handleSetRoot({ name: 'Home' });
                }, 1000)
            }
        }
        checkUserLogin()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: appColor.secondary }}>
        </View>
    )
}

export default Splash;