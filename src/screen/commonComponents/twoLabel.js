import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { appColor, appFonts, imagePath } from '../../theme'

const TwoLabel = (props) => {
    const { text, textTwo ,onPress } = props
    return (
        <View style={styles.backView}>
            <Text
                style={styles.txt}
            >{text}</Text>
            <TouchableOpacity onPress={()=> onPress()}>
            <Text
            style={styles.txtTwo}
            >{textTwo}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backView: {
        margin: 30,
        alignItems: 'center',
        flexDirection: 'row'
    },

    txt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_17,
        color: appColor.secondary
    },
    txtTwo: {
        fontFamily: appFonts.FONT_FAMILY_BOLD,
        fontSize: appFonts.FONT_SIZE_18,
        color: appColor.secondary,
        marginLeft:5
    },
})
export default TwoLabel;