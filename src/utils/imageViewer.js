import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, RefreshControl, DeviceEventEmitter, SafeAreaView, View, Image, Text, Button, StyleSheet, FlatList, ScrollView, Dimensions, TextInput, TouchableOpacity, ImageBackground, Platform, Modal, Alert, I18nManager, Keyboard } from 'react-native';
import ImageLoadView from './imageLoadView';

import { imagePath } from '../theme';

const ImageViewer = (props) => {
    const { image } = props.route.params
    //console.log('ImageViewer------', image)
    const renderImage = () => {
        return (
            <ImageLoadView
                    style={{ height: '100%', width: '100%' }}
                    resizeMode={'contain'}
                    source={image}
                />
        )
    }
    return (

        <View style={styles.container} >
            {renderImage()}
            <TouchableOpacity
                hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                onPress={() => { props.navigation.goBack() }}
                style={{ position: 'absolute', zIndex: 1, marginHorizontal: 15, marginTop: 20 }}
            >
                <Image resizeMode={'contain'} source={imagePath.close} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
        </View>
    );
}

export default ImageViewer;
const styles = StyleSheet.create({
    container: { flex: 1 }

})