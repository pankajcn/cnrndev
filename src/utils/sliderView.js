
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { appColor } from '../theme';

const SliderView = (props) => {
    return (
        <View>
            <View style={styles.container}>
                {/* <View style={styles.offsetLayer}></View> */}
            </View>
            <View style={[styles.progressLayer, { width: props.fill, borderWidth: props.fill ? 10 : 0 }]} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: 14,
        borderWidth: 10,
        // borderRadius:7,
        // borderWidth: 10,
        // borderRadius: 100,
        borderColor: 'grey',
        justifyContent: 'center',
        marginTop: 5,
        padding: 0
        // alignItems: 'center'
    },
    progressLayer: {
        width: 0,
        height: 14,
        borderWidth: 0,
        borderColor: appColor.primary,
        // borderWidth: 20,
        // borderRadius: 100,
        position: 'absolute',
        left: 0,
        marginTop: 5,

        // borderLeftColor: 'transparent',
        // borderBottomColor: 'transparent',
        // borderRightColor: '#3498db',
        // borderTopColor: '#3498db',
        // transform:[{rotateZ: '-45deg'}]
    },
    offsetLayer: {
        width: '100%',
        height: 14,
        borderRadius: 7,
        borderWidth: 10,

        // borderWidth: 20,
        // borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'grey',
        borderTopColor: 'grey',
        transform: [{ rotateZ: '-135deg' }]
    }
});

export default SliderView;
