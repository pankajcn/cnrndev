import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Platform, TouchableOpacity } from 'react-native'
import { appColor, appFonts, imagePath } from '../../theme'
import { FloatingLabelInput } from 'react-native-floating-label-input';

const FloatingTextInput = (props) => {
  return (
    <View>
      <View style={{ marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 0, marginTop: props.marginTop, marginBottom: props.marginBottom, flexDirection: 'row', alignItems: 'center' }}>

        <FloatingLabelInput
          label={props.placeholder}
          textAlign={"left"}
          customLabelStyles={
            {
              colorBlurred: appColor.black,
              colorFocused: appColor.black,
              fontSizeBlurred: appFonts.FONT_SIZE_14,
              fontSizeFocused: appFonts.FONT_SIZE_14,
            }}
          labelStyles={styles.lableStyle}
          containerStyles={styles.containerStyle}
          inputStyles={styles.inputStyle}
          value={props.value}
          isPassword={props.secureTextEntry}
          onChangeText={(text) => {
            if (props.value == '' && text == ' ') {
              return
            }
            props.onChangeText(text)

          }}
          // blurOnSubmit={props.blurOnSubmit}
          keyboardType={props.keyboardType || "default"}
          returnKeyType={props.returnKeyType}
          underlineColorAndroid="transparent"
          // autoFocus={props.autoFocus}
          // maxLength={props.maxLength}
          // multiline={props.multiline}
          // ref={props.getfocus}
          // onSubmitEditing={props.setfocus}
          editable={props?.editable}
          showPasswordImageStyles={{
            height: 15,
            width: 15,
            resizeMode: 'contain',
            marginBottom: 5
          }}
          customShowPasswordImage={imagePath.eye_closed}
          customHidePasswordImage={imagePath.eye_opened}
          leftComponent={props.leftImage ? (
            <View style={{ marginRight: 12 }}>
              <Image
                source={props.leftIcon}
                resizeMode={"contain"}
                style={{ width: 20, height: 16, marginBottom: 8, }}
              />
            </View>
          ) : null}

        />
        {!props.editable ? <TouchableOpacity style={{height:'100%',width:'90%', zIndex:1, position:'absolute'}} onPress={() => props?.onPress()} hitSlop={{ left: 15, bottom: 15, right: 15, bottom: 15 }}/> : <View />}

        {props.value && props.isClear ? <TouchableOpacity onPress={() => props?.isClear()} hitSlop={{ left: 15, bottom: 15, right: 15, bottom: 15 }}>
          <Image resizeMode={'contain'} source={imagePath.close} style={{
            height: 15,
            width: 15,
          }} />
        </TouchableOpacity> : <View />}

      </View>
      <View style={{ backgroundColor: appColor.lightGrey, height: 1, top: Platform.OS === 'ios' ? -6 : -18, }}></View>
      {props.isErrorMsg ? <Text style={[styles.error, { top: Platform.OS === 'android' ? -18 : 0, }]}>{props.isErrorMsg}</Text> : <View />}

    </View>
  )
}

export default FloatingTextInput
const styles = StyleSheet.create({
  rightImageIcon: {
    width: 16,
    height: 14,
    resizeMode: "contain",
    alignSelf: "flex-end"
  },
  error: {
    fontFamily: appFonts.FONT_FAMILY_REGULAR,
    fontSize: appFonts.FONT_SIZE_14,
    color: appColor.red,
  },
  lableStyle: {
    fontFamily: appFonts.FONT_FAMILY_REGULAR,
    fontSize: appFonts.FONT_SIZE_14,
    paddingBottom: 10,
    color: appColor.black,
  },
  containerStyle: {
    paddingBottom: 10,
    marginTop: 5,
    alignItems: "center",
  },
  inputStyle: {
    fontFamily: appFonts.FONT_FAMILY_REGULAR,
    fontSize: appFonts.FONT_SIZE_14,
    paddingTop: 15,
    color: appColor.black,
    paddingLeft: Platform.OS == 'ios' ? 5 : 5
  },
});