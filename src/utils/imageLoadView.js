import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator,  View,  StyleSheet, Dimensions, } from 'react-native';
import FastImage from 'react-native-fast-image'
import { IMAGE_URL } from "../api/commonValue";
import { imagePath } from "../theme";

const ImageLoadView = (props) => {
    const [loading, setLoadView] = useState(false)
    const { style, source, resizeMode } = props
    // //console.log('source----------',IMAGE_URL + source)
    return (
        <View style={styles.container}>
            <View style={style}>
                <FastImage
                    style={style}
                    // source={this.state.error ? images.placeholder_adapter : source}
                    // onError={() => {
                    //     if (source.uri) {
                    //         //console.log("image load fail ----------", source.uri)
                    //     }
                    //     // this.setState({ error: true })
                    // }}
                    source={source ? {uri :source} : imagePath.userImg}
                    onLoadStart={(e) => setLoadView(true)}
                    onLoadEnd={(e) => setLoadView(false)}
                    resizeMode={resizeMode}
                // onError={() => this.setState({ defaultImage: images.placeholder_adapter})}
                />
            </View >
            {loading &&
                <ActivityIndicator style={[style, styles.activityIndicator]} animating={true} size="small" color={'#000'} />
            }
        </View>
    )
}
export default ImageLoadView
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        
    },
    activityIndicator: {
        position: 'absolute', zIndex: 1, backgroundColor: "transparent",
    }
})
