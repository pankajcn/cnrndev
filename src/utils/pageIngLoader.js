
import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { appColor } from "../theme";

const PageIngLoader = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'small'} color={appColor.themeColor} />
            <SafeAreaView/>
        </View>
    )
};
export default PageIngLoader;
const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom:10
    }
});