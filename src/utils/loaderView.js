import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Helper } from '../utils';
import { appColor } from "../theme";

class LoaderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderShow: false
        }
    }

    componentDidMount() {
        Helper.registerLoader(this)
    }

    showLoader() {
        this.setState({ loaderShow: true })
    }
    hideLoader() {
        this.setState({ loaderShow: false })
    }
    render() {
        const { loaderShow } = this.state
        return loaderShow ? (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={appColor.white} />
            </View>
        ) : <View />
    }
};

export default LoaderView;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

