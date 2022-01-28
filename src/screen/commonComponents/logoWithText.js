import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native'
import { appColor, appFonts, imagePath } from '../../theme'

const LogoWithText = (props) => {
    const { text } = props
    return (
        <View style={styles.backView}>
            <Image
                style={styles.logo}
                source={imagePath.logo}
                resizeMode={'contain'}
            ></Image>
            {text ? <Text
                style={styles.txt}
            >{text}</Text> : <View/>}
        </View>
    )
}

const styles = StyleSheet.create({
    backView: {
        alignSelf: 'center',
        margin: 10,
        alignItems:'center',
    },
    logo: {
        height: 75,
        width: 200,
    },
    txt: {
        marginTop: 15,
        fontFamily: appFonts.FONT_FAMILY_BOLD,
        fontSize: appFonts.FONT_SIZE_21,
        color:appColor.secondary
    },
})
export default LogoWithText;