import React, { useState, useEffect, useRef , useImperativeHandle, forwardRef} from 'react';
import { SafeAreaView, TextInput, View, Image, Text, StyleSheet, Platform } from 'react-native';
import { appColor, appFonts, imagePath } from "../theme";
import RNPickerSelect from "react-native-picker-select";

const AppPicker = (props, ref) => {
    const [value, setValue] = useState(props.value)
    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        reset: () => { reset() },
        setData: (data) => { setData(data) }

      }))
      const reset = () => {
        setValue('')
    }
    const setData = data => {
        setValue(data)
    }
    return (
        <View
            style={{
                width: '100%',
                paddingVertical: Platform.OS == 'ios' ? 0 : 0,
            }}
        >
            <RNPickerSelect
                items={props.items}
                onValueChange={value => {
                    if (Platform.OS == 'ios') {
                        setValue(value)
                    }
                    else {
                        setValue(value)

                        props.onValueChange(value, props.type)
                    }
                }}
                onDonePress={() => props.onDonePress(value, props.type)}
                useNativeAndroidPickerStyle={false}
                value={value}
                style={pickerSelectStyles}
                placeholder={{ label: props.placeholder, value: null }}
                // placeholderTextColor={AppColors.white}
                Icon={() => (
                    <Image
                        resizeMode="contain"
                        source={imagePath.downArrow}
                        style={[
                            { height: 15, width: 15, tintColor: appColor.darkGrey},
                        ]}
                    />
                )}
            />
        </View>

    );
};

export default forwardRef(AppPicker);
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: appColor.darkGrey,
        maxWidth: '100%',
        minWidth: '100%',
        height: 30,
        fontSize: appFonts.FONT_SIZE_15,
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
    },
    inputAndroid: {
        color: appColor.darkGrey,
        maxWidth: '100%',
        minWidth: '100%',
        height: 30,
        fontSize: appFonts.FONT_SIZE_15,
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
        paddingVertical:0
    }
});

