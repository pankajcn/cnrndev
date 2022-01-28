import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { appColor, appFonts, imagePath } from '../../theme'

const AppButton = (props) => {
    const { text, onPress, marginTop, style } = props
    return (
        <TouchableOpacity
            style={[styles.backView, marginTop && { marginTop: marginTop }, style && style ]}
            onPress={() => onPress()}
        >
            <Text style={styles.txt}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backView: {
        alignSelf: 'center',
        marginHorizontal: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColor.secondary,
        borderRadius: 27,
        height: 54,
        marginTop: 30,
        width: '85%'
    },
    txt: {
        fontFamily: appFonts.FONT_FAMILY_BOLD,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.white
    },
})
export default AppButton;