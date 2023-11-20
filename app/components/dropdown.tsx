import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../styles/colors';

const DropdownComp= ({label, placeholder, data, value, setDropdownValue=()=>{}}: any) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.inputContainer}>
         {label && <Text style={[styles.fieldLabelText]}>{label}</Text>}
   <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        minHeight={100}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setDropdownValue(item.value);
          setIsFocus(false);
        }}
      />
    </View> 
  );
};

export default DropdownComp

const styles = StyleSheet.create({
    fieldLabelText: {
        marginLeft: 4,
        marginBottom: 4,
        fontSize: Platform.OS == 'ios' ? 14 : 12,
        color: Colors.ACCENTS_UNION_BLUE,
        fontFamily: 'Montserrat-SemiBold'
    },
    inputContainer: {
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
    },
  dropdown: {
    height: Platform.OS == 'ios' ? 55 : 50,
    width:'100%',
    alignSelf:'center',
    marginVertical:4,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    ...Platform.select({
        ios: {
            shadowColor: '#CCC',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
        },
        android: {
            elevation:5,
        },
    }),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color:'gray'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color:'black'
  },
});

// import React, { useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const data = [
//   { label: 'Item 1', value: '1', search: 'Item 1' },
//   { label: 'Item 2', value: '2', search: 'Item 2' },
//   { label: 'Item 3', value: '3', search: 'Item 3' },
//   { label: 'Item 4', value: '4', search: 'Item 4' },
//   { label: 'Item 5', value: '5', search: 'Item 5' },
//   { label: 'Item 6', value: '6', search: 'Item 6' },
//   { label: 'Item 7', value: '7', search: 'Item 7' },
//   { label: 'Item 8', value: '8', search: 'Item 8' },
// ];

// const DropdownComp= () => {
//   const [value, setValue] = useState<string>();
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//        // placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
      
//         data={data}
//        // search
//         maxHeight={300}
//         minHeight={100}
//         labelField="label"
//         valueField="value"
//        // searchField="search"
//         //placeholder={!value ? 'Dropdown 1' : '...'}
//        // searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={(item) => {
//           setValue(item.value);
//           setIsFocus(false);
//         }}
       
//       />
//     </View>
//   );
// };

// export default DropdownComp

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     width:'92%',
//   },
//   dropdown: {
//     width:'100%',
//     height: 60,
//     borderColor: 'gray',
//    overflow:'hidden',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical:4
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });