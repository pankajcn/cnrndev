import { StyleSheet } from 'react-native';
import { appColor, appFonts } from '../../theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor.white
    },
    txt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.black,
        marginTop:10
    },
    txtHead: {
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.white,
    },
    img: {
        height: 80,
        width: 80,
    },
    txtReed: {
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.secondary,
    },
    backView: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop:15,
    },
    bottomView: {
        width: '100%',
        backgroundColor: appColor.green,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    bottomTxt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_16,
        color: appColor.white,
    }
})
export default styles;