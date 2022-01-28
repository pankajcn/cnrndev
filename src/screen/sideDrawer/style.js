import { StyleSheet } from 'react-native';
import { appColor, appFonts } from '../../theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColor.white
    },
    txt: {
        fontFamily: appFonts.FONT_FAMILY_REGULAR,
        fontSize: appFonts.FONT_SIZE_15,
        color: appColor.black,
        marginLeft:10,
        width:'80%'
    },
    nameTxt: {
        fontFamily: appFonts.FONT_FAMILY_MEDIUM,
        fontSize: appFonts.FONT_SIZE_25,
        color: appColor.white,
        marginTop: 10,
        textAlign:'center'
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
    viewHeader: {
        backgroundColor: appColor.secondary,
        paddingTop: 80,
        paddingBottom: 20,
        paddingHorizontal:22,
        alignItems:'center',justifyContent:'center'
    },
    itemView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        marginTop: 30,
        justifyContent:'space-between',
    },
    rowView:{
        flexDirection: 'row', 
        alignItems: 'center',
        width:'90%' ,
    }
})
export default styles;