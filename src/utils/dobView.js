import React, { useState, useEffect, useRef , useImperativeHandle, forwardRef} from 'react';
import { ActivityIndicator, SafeAreaView, View, Image, Text, Button, StyleSheet, FlatList, ScrollView, Dimensions, TextInput, TouchableOpacity, ImageBackground, Platform, Modal, Alert, I18nManager, Keyboard } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { appColor, appFonts, imagePath } from '../theme';
import { Helper } from '../utils';

const DatePickerView = (props, ref) => {
    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        reset: () => { reset() },
        setDate: (date) => { setDate(date) }

      }))
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dob, setDob] = useState(props.isDob ? (global?.userData?.birthDate ? global?.userData?.birthDate : '') : props.value? props.value :'');

    const reset = () => {
        setDob('')
    }
    const setDate = (date) => {
        setDob(date)
    }
    const showDatePicker = () => {
        Keyboard.dismiss()
        if(props.type == 'endDate' && !props.startDate){
            Helper.showToast('Please select start date first')
            return
        }
        setDatePickerVisibility(true)
    };
    const handleConfirmStart = (date) => {
        console.log(date)
        setDatePickerVisibility(false)
        if(props.mode == 'time'){
            setDob(moment(date).format('HH:mm'))
            props.onPress(moment(date).format('HH:mm'), props.type)
        }
        else if(props.mode == 'datetime'){
            setDob(date)
            props.onPress(date, props.type)
        }
        else {
            setDob(moment(date).format('YYYY/MM/DD'))
            props.onPress(moment(date).format('YYYY/MM/DD'), props.type)
        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    };
    return (
        <>
            <TouchableOpacity
                onPress={showDatePicker}
                style={styles.dob_view}>
                <View style={styles.format_text}>
                    <Text style={styles.lblDob}>{dob ? (props.mode == 'time' ?  moment(dob, 'HH:mm').format('hh:mm A') : props.mode == 'datetime' ? moment(dob).format('DD/MM/YYYY hh:mm A') : moment(dob, 'YYYY/MM/DD').format('MM/DD/YYYY')) : props.placeholder}</Text>
                </View>
                <View>
                    <Image
                        resizeMode={'contain'}
                        source={imagePath.tab1}
                        style={styles.calender_img}
                    />
                </View>
            </TouchableOpacity>

            {isDatePickerVisible && (
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={props.mode ? props.mode : "date"}
                    {...(props.isDob && { maximumDate: new Date() })}
                    {...(props.type == 'endDate' && props.startDate && { minimumDate: moment(props.startDate,'YYYY/MM/DD').toDate() })}
                    {...(props.minimumDate && { minimumDate: new Date() })}
                    onConfirm={date => {
                        handleConfirmStart(date);
                    }}
                    is24Hour={false}
                    onCancel={() => hideDatePicker()}
                    date={dob ? (props.mode == 'time' ? moment(dob,'HH:mm').toDate() :  moment(dob,'YYYY/MM/DD').toDate()) : new Date()}
                />
            )}
        </>
    )
}
export default forwardRef(DatePickerView)

// export default DatePickerView;
const styles = StyleSheet.create({
    iconCalender: { height: 15, width: 15 },
    format_text: {  flex: 1 },
    calender_img: {
        marginHorizontal: 1,
        height: 25,
        width: 25,
    },
    dob_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 0,
        height: 50,
        width:'100%'
    },
    lblDob: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_15,
        color: appColor.black,
    },
    error: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_15,
        color: appColor.red,
        marginLeft: 22,
        marginBottom: 10,
        marginTop: 5
    },
})