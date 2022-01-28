import React, { useState,useEffect } from "react"
import { Text, TouchableOpacity, View, ShadowPropTypesIOS } from "react-native"
import ReactNativePickerModule from "react-native-picker-module"
// import img1 from "./images/ic_attach_file_black_24dp.png"
// import img2 from "./images/ic_attach_money_black_24dp.png"
// import img3 from "./images/ic_border_color_black_24dp.png"
// import img4 from "./images/ic_format_bold_black_24dp.png"
// import img5 from "./images/ic_insert_drive_file_black_24dp.png"
// import img6 from "./images/ic_insert_emoticon_black_24dp.png"
// import img7 from "./images/ic_insert_invitation_black_24dp.png"
 
const PickerModule = (props) => {
  let pickerRef = null
  const [valueText, setValueText] = useState()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const dataAndImageSet = {
    data: ["Javascript", "Go", "Java", "Kotlin", "C++", "C#", "PHP"],
    // images: [img1, img2, img3, img4, img5, img6, img7],
  }
  var isSelectedIndex = -1
  useEffect(() => {
    if(pickerRef){
        isSelectedIndex = -1
        pickerRef.show()
    }
    
}, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ReactNativePickerModule
        pickerRef={e => (pickerRef = e)}
        selectedValue={selectedIndex}
        title={props.title}
        items={props.arrData}
        // images={dataAndImageSet.images}
        onDismiss={() => {
          console.log("Confirm")
          console.log("Confirm")
          props.callbackPickerSelectValue({selectedindex:isSelectedIndex,isConfirm:true})

        //   props.callbackPickerSelectValue(valueText)
        }}
        onCancel={() => {
          console.log("Cancelled")
          props.callbackPickerSelectValue({selectedindex:-1,isConfirm:false})

        }}
        onValueChange={(valueText, index) => {
          console.log("onValueChange----------: ", valueText)
        //   console.log("index: ", index)
        //   setValueText(valueText)
        //   setSelectedIndex(index)
        isSelectedIndex = index
       // props.callbackPickerSelectValue({selectedindex:index})
        }}
      />
    </View>
  )
  
}
 
export default PickerModule