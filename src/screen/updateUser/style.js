import { StyleSheet } from 'react-native';
import { appColor, appFonts } from '../../theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor.white
    },
    txt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_18,
        color: appColor.black,
        width: '70%'
    },
    showTxt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_18,
        color: appColor.black,
        width: '60%'
    },
    showTxtTitle: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_18,
        color: appColor.darkGrey,
        width: '40%'
    },
    txtTitle: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_16,
        color: appColor.darkGrey,
        width: '70%'
    },
    nameTxt: {
        fontFamily: appFonts.FONT_FAMILY_BOLD,
        fontSize: appFonts.FONT_SIZE_14,
        color: appColor.white,
        textAlign: 'center'
    },
    btnView: {
        marginTop: 15,
        height: 30,
        paddingHorizontal:30,
        backgroundColor: appColor.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    emailTxt: {
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
        fontSize: appFonts.FONT_SIZE_17,
        color: appColor.darkGrey,
        marginTop: 7,
        textAlign: 'left'
    },
    img: {
        height: 25,
        width: 25,
    },
    imgRight: {
        height: 17,
        width: 17,
    },
    backView: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop: 15,
    },
    userImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    viewName: {
        marginLeft: 15,
        width: '70%'
    },
    viewHeader: {
        paddingTop: 50,
        paddingBottom: 20,
        marginHorizontal: 22,
        alignItems: 'center',
    },
    itemView: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth:1.0,
        borderRadius:8,
        borderColor:appColor.lightGrey
    },
    backView: {
        marginTop:15,
        marginHorizontal: 15,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop:5,
        height:30
    },
    txtError: {
        marginTop: 10,
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_15,
        color: appColor.red,
    },
    showItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 1.0,
        borderBottomColor: appColor.lightGrey
    },
    showRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    cross:{
        height:15,
        width:15,
    },

    ViewActiveBack:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical:10
    },
    imgIC: {
        width: 25, 
        height: 25
    },
    txtActivestatus: {
        color: appColor.darkgrey, 
        fontSize: 16, 
        fontFamily: appFonts.Medium,
        marginLeft:8
    },
    viewActive: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    textInput:{
        height: '100%', width: '95%', fontFamily: appFonts.FONT_FAMILY_REGULAR, fontSize: appFonts.FONT_SIZE_13, color: appColor.black, paddingVertical: 0
    }
})
export default styles;