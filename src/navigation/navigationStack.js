import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text, 
    View,
    Keyboard,
    Image,
    Dimensions,
    Platform

} from 'react-native';
import { imagePath, appFonts, appColor } from '../theme'
const DeviceW = Dimensions.get('screen').width


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//V---

//Auth
// import ImgController from '../utils/imgController'
import Splash from '../screen/splash';
import Home from '../screen/home'
import UserList from '../screen/UserList';
import updateUser from '../screen/updateUser';
import SideDrawer from '../screen/sideDrawer'
import { ImageViewer, LocationController } from '../utils';

const options = {
    gestureEnabled: true, // If you want to swipe back like iOS on Android
    ...TransitionPresets.SlideFromRightIOS
}

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name='Splash' component={Splash} options={{ ...options, headerShown: false }} />
                <Stack.Screen name='Home' component={Home} options={{ ...options, headerShown: false }} />
                <Stack.Screen name='UserList' component={UserList} options={{ ...options, headerShown: false }} />
                <Stack.Screen name='updateUser' component={updateUser} options={{ ...options, headerShown: false }} />
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    {/* <Stack.Screen name="ImgController" component={ImgController} options={{ headerShown: false, presentation: 'transparentModal' }} /> */}
                    <Stack.Screen name="ImageViewer" component={ImageViewer} options={{ headerShown: false, headerTransparent: false }}/>
                </Stack.Group>
                
            </Stack.Navigator>
        </NavigationContainer>
    );

};
const drawer = () => (
    <Drawer.Navigator
        drawerStyle={{
            backgroundColor: appColor.transparent,
            width: '85%'
        }}
        initialRouteName='drawer'
        drawerType='front' drawerContent={props => <SideDrawer {...props} />}>
        <Drawer.Screen name='drawer' component={Tabs} options={{ ...options, headerShown: false }} />

    </Drawer.Navigator>
)



const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={Home} />
        </HomeStack.Navigator>
    );
}

const getTabBarVisibility = (route, navigation) => {

    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';
    //console.log('getTabBarVisibility--------', routeName)

    if (routeName == 'MyProfile') {
        return false;
    }
    return true;
}


function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false,
                    "tabBarHideOnKeyboard": true,
                    "tabBarShowLabel": false,
                    "tabBarStyle": [
                      {
                        height: 65,
                        backgroundColor: appColor.white
                      },
                      null
                    ]
             }}
            initialRouteName={'HomeTab'}
        >
            
            <Tab.Screen
                name='HomeTab'
                component={HomeStackScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: '',
                    // keyboardHidesTabBar: true,
                    tabBarIcon: ({ focused }) => (
                        <RenderTabBarIcon
                            isFocused={focused}
                            inactive_tab_icon={imagePath.tab4}
                            active_tab_icon={imagePath.tab4}
                            active_color={appColor.secondary}
                            inactive_color={appColor.grey}
                            lable={'Home'} />
                    ),

                })}
            />

        </Tab.Navigator>
    );

}
const RenderTabBarIcon = (props) => {
    const { isFocused, active_tab_icon, inactive_tab_icon, lable, active_color, inactive_color } = props;
    return (
        <View style={tabStyle.viewOfTabs}>
            <Image
                style={[Platform.OS == 'ios' ? tabStyle.tabIconCss : tabStyle.tabIconAndroidCss]}
                resizeMode={'contain'}
                source={isFocused ? active_tab_icon : inactive_tab_icon} />
            <Text numberOfLines={1} style={[tabStyle.lableCss, { color: isFocused ? active_color : inactive_color }]}>{lable}</Text>
        </View>
    );
}


const tabStyle = StyleSheet.create({
    viewOfTabs: {
        // alignItems: 'center', justifyContent: 'center', width: '100%',
        alignItems: "center", justifyContent: "center", width: DeviceW / 4
    },
    tabIconCss: {
        // height: 30, width: 30, marginTop: 5
        height: 25, width: 25, marginTop: 14

    },
    tabIconAndroidCss: {
        // height: 30, width: 30, marginTop: 5
        height: 20, width: 20, marginTop: 16

    },
    lableCss: {
        // fontSize: 11,
        // marginTop: 5,
         color: 'grey', paddingBottom: 3, fontSize: 12,height:20,justifyContent:'center'
    },
});


export default NavigationStack;
