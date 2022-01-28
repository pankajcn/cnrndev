import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    ImagePath,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import { appColor, appFonts, imagePath } from '../theme';

const AppHeader = (prop) => {
    let headerShow = { headerShown: true, headerTransparent: false }
    let { isMenu, leftClick, title, rightClick, rightIcon, backgroundColor } = prop
    // StatusBar.setBackgroundColor(backgroundColor)
    return prop.navigation.setOptions({

        headerLeft: () => (
            <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
                // onPress={() => isMenu ? prop.navigation.openDrawer() : prop.navigation.goBack()}
                onPress={() => leftClick()}

                style={{ marginHorizontal: 15, height: 30, width: 30 }}
            >
                <Image
                    resizeMode={"contain"}
                    source={isMenu ? imagePath.menu : imagePath.back}
                    style={styles.backImg}
                />
            </TouchableOpacity>
        ),
        headerTitle: () => {
            0;
            return (
                <View>
                    {title ? (
                        <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
                    ) : null}
                </View>
            );
        },
        headerRight: () => rightIcon ? (
            <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
                onPress={() => rightClick()}
                style={{ marginRight: 15, height: 30, width: 30 }}
            >
                <Image
                    resizeMode={"contain"}
                    source={rightIcon}
                    style={styles.backImg}
                />
            </TouchableOpacity>
        ) : (<View />),
        headerStyle: [
            styles.headerShadow,
            { backgroundColor: appColor.secondary },
            // { backgroundColor: backgroundColor ? backgroundColor : appColor.secondary },
        ],
        ...headerShow
    },
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    headerShadow: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    backImg: {
        height: 25,
        width: 25,
    },
    titleText: {
        fontFamily: appFonts.FONT_FAMILY_BOLD,
        fontSize: appFonts.FONT_SIZE_18,
        color: appColor.white
    },
});
