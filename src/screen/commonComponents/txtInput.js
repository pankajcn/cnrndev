import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { appColor, appFonts, imagePath } from '../../theme'

const TxtInput = (props) => {
    const { mainViewStyle, isErrorMsg, placeholder, getFocus, onSubmitEditing, onChangeText, icon, value, secureTextEntry, returnKeyType = 'next', multiline, maxLength, keyboardType } = props
    const [passwordShow, setPassShow] = useState(secureTextEntry);
    return (
        <View style={[styles.mainView, mainViewStyle && mainViewStyle]}>
            <View style={styles.backView}>
                {icon ? <TouchableOpacity hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }} activeOpacity={1.0} disabled={!secureTextEntry} onPress={() => setPassShow(!passwordShow)}>
                    <Image
                        style={styles.logo}
                        source={(secureTextEntry && !passwordShow) ? imagePath.hidePass : icon}
                        resizeMode={'contain'}
                    ></Image>
                </TouchableOpacity> : <View/>}
                <TextInput
                    value={value}
                    secureTextEntry={passwordShow}
                    onChangeText={(text) => {
                        if (value == '' && text == ' ') {
                            return
                        }
                        onChangeText(text)
                    }}
                    placeholder={placeholder}
                    // placeholderTextColor={}
                    keyboardType={keyboardType || "default"}
                    returnKeyType={returnKeyType}
                    underlineColorAndroid="transparent"
                    maxLength={maxLength}
                    ref={getFocus}
                    onSubmitEditing={onSubmitEditing}
                    multiline={multiline}
                    style={styles.txt}
                >
                </TextInput>
            </View>
            {isErrorMsg ? <Text style={styles.txtError}>{isErrorMsg}</Text> : <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: 22,
    },
    backView: {
        width: '100%',
        height: 54,
        borderRadius: (54 / 2),
        backgroundColor: appColor.white,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    logo: {
        height: 17,
        width: 17,
        marginLeft: 20,
        tintColor: appColor.secondary
    },
    txt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_15,
        color: appColor.black,
        height: '100%',
        marginHorizontal: 10,
        width: '85%'
    },
    txtError: {
        marginTop: 10,
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.red,
    },

})
export default TxtInput;