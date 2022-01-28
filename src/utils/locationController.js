import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { commonValue } from '../api';
import { AppHeader } from '../navigation';
import { appColor } from '../theme';

const GooglePlacesInput = (props) => {

    useEffect(() => {
        AppHeader({
            ...props,
            title: 'Search Location',
            backgroundColor: appColor.primary,
            leftClick: () => { props.navigation.goBack() },
            rightClick: () => { },
        });

    }, []);
    return (
        // <GooglePlacesAutocomplete
        //     placeholder='Search'
        //     onPress={(data, details = null) => {
        //         // 'details' is provided when fetchDetails = true
        //         //console.log(data, details);
        //     }}
        //     query={{
        //         key: commonValue.GOOGLE_PLACE_KEY,
        //         language: 'en',
        //     }}
        // />
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                fetchDetails={true}
                // GooglePlacesDetailsQuery={{ fields: ["address_components", "geometry", "icon", "name"]}}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    //console.log('details-----------------', JSON.stringify(details));

                    //console.log('data-------------', data);
                    if (details && details?.address_components) {
                        let dic = {
                            city: '',
                            state: '',
                            zipCode: '',
                            addressLine1: '',
                            addressLine2: '',
                            country: ''
                        }
                        dic.addressLine1 = details?.formatted_address
                        dic.addressLine2 = details?.name

                        if (details?.geometry && details?.geometry?.location) {
                            dic.lat = details?.geometry?.location?.lat
                            dic.lng = details?.geometry?.location?.lng
                        }

                        details?.address_components?.map((item) => {
                            if (item?.types && item?.types.indexOf('country') > -1) {
                                dic.country = item?.long_name
                            }
                            else if (item?.types && item?.types.indexOf('administrative_area_level_2') > -1) {
                                dic.city = item?.long_name
                            }
                            else if (item?.types && item?.types.indexOf('administrative_area_level_1') > -1) {
                                dic.state = item?.long_name
                            }
                            else if (item?.types && item?.types.indexOf('postal_code') > -1) {
                                dic.zipCode = item?.long_name
                            }
                        })
                        props.route.params.callback(dic)
                        props.navigation.goBack()
                    }



                }}

                query={{
                    key: commonValue.GOOGLE_PLACE_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        // backgroundColor: 'grey',
                    },
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
        </View>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    textInputContainer: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
    },
    poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
    },
    powered: {},
    listView: {},
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    },

})
export default GooglePlacesInput;