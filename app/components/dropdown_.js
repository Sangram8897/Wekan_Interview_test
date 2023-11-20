import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import AppStyles from '../style'
import Icon from 'react-native-vector-icons/AntDesign'
import Button from './button/button';
import { Colors } from '../style/colors';
import AppButton from './button';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import FieldStateNotifier from './fieldStateNotifier';
import useFieldState from '../containers/loan_journey/hook/useFieldState';

const inputStateColors = {
    DEFAULT: { primary: Colors.GRAY_G2, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    FOCUSED: { primary: Colors.BLUE_B2, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B2 },
    DISABLED: { primary: Colors.GRAY_G2, textTitle: Colors.GRAY_G3, textValue: Colors.GRAY_G3 },

    FILLED: { primary: Colors.BLUE_B5, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },
    PREFILLED: { primary: Colors.GRAY_G1, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },

    SUCCESS: { primary: Colors.ACCENTS_LIME, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    ERROR: { primary: Colors.ACCENTS_SCARLET, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
}



const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
    </TouchableOpacity>
);

const Dropdown = ({ data, title = 'My dropdown', closeOnItemSelection = false, submitButtonText = 'Submit', cancelButtonText = 'Cancel', onChange, selectionProperty = 'name' }) => {
   
    const [background_color, set_background_color] = useState('transparent');
    const [errorText, set_errorText] = useState('Checking Inavalid Email Entered')

    const [fieldState, onFieldValueChange, setFieldValidity, onFieldStatusChange, setFieldVisibility, setFieldTouched] = useFieldState('', true, 'DEFAULT');
   
    console.log('fieldState ====================================');
    console.log('fieldState',fieldState);
    console.log('fieldState ====================================');
    useEffect(() => {
        if (fieldState?.visible == true)
            set_background_color('rgba(52, 52, 52, 0.8)')
        return () => set_background_color('transparent')
    }, [fieldState?.visible])

    useEffect(() => {
        set_input_color_theme(inputStateColors[fieldState?.status])
    }, [fieldState?.status])

    useEffect(() => {
        if (fieldState?.visible == true) {
            if (fieldState.status != 'ERROR') {
                onFieldStatusChange('FOCUSED')
            }
        } else if (fieldState?.touched) {
            setFieldValidity(fieldState?.value ? true : false)
            onFieldStatusChange(fieldState?.value ? 'FILLED' : 'ERROR')
        }
    }, [fieldState?.visible])

    const renderItem = (item, index) => {
        const backgroundColor = '#F1F1F1';
        const color = 'black';

        return (
            <Item
                key={index}
                item={item}
                onPress={() => onDropdownOptionSelection(item[selectionProperty])}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    const onDropdownOptionSelection = (value, validity = true) => {
        onFieldValueChange(value)
        setFieldVisibility(false)
    }

    const onDropdownModalState = (state) => {
        setFieldVisibility(state)
    }

    return (
        <View style={{ marginVertical: 4 }}>
            <TouchableOpacity
                onPress={() =>{ 
                    onDropdownModalState(true)
                    setFieldTouched(true)
                }}
            >
                <View style={[ {
                    borderColor: input_color_theme.primary,
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    flexDirection: 'row',
                   
                }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={AppStyles.fieldLabelText} >{title}</Text>
                        <View style={{ height: 40, flex: 1, justifyContent: 'center' }}>
                            <Text style={AppStyles.fieldValueText} >{fieldState?.value ? fieldState?.value : data?.placeholderText ? data?.placeholderText : 'select option from dropdown'}</Text>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={fieldState?.visible}
                                onRequestClose={() => onDropdownModalState(false)}>
                                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: background_color }}>
                                    <View style={{ flexWrap: 'wrap', width: '100%', alignSelf: 'center', backgroundColor: '#FFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: 'center', padding: 12 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ height: 20, width: 20 }} />
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 12 }}> Dropdown popup title</Text>
                                            </View>
                                            <Icon
                                                onPress={() => onDropdownModalState(false)}
                                                name='closecircleo' size={20} color={'red'} />
                                        </View>

                                        <View style={{ width: '100%' }}>
                                            {(data?.options && data?.options.length > 0) ?
                                                data?.options.map(renderItem)
                                                :
                                                <Text style={{ fontSize: 16, marginVertical: 12 }}>Filter options are not available</Text>
                                            }
                                        </View>
                                        {submitButtonText && <Button
                                            onPress={() => onDropdownModalState(false)}
                                            label={submitButtonText}
                                        />}
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <FontAwesome name={1 == 2 ? 'sort-up' : 'sort-down'} color={input_color_theme.primary} size={18} />
                    {/* <AppButton /> */}

                </View>
            </TouchableOpacity>
            {
                !fieldState.isValid && fieldState.touched && errorText &&
                <FieldStateNotifier text={errorText} color={input_color_theme.primary}></FieldStateNotifier>
            }
        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    item: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
        padding: 12,
        marginVertical: 4,
    },
    title: {
        fontSize: 18,
    },
});