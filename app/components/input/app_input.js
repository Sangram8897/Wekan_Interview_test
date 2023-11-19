import React, { useReducer, useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native'
import IsEmpty from '../../utils/IsEmpty'
import AppStyles from '../../style';
import FieldStateNotifier from '../field_state_notifier';
import { Colors } from '../../style/colors';
import { FloatingTitleTextInputField } from './FloatingTitleTextInputField';
import useFieldState from '../../containers/loan_journey/hook/useFieldState';
import AppButton from '../button';

const inputStateColors = {
    DEFAULT: { primary: Colors.GRAY_G2, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    FOCUSED: { primary: Colors.BLUE_B2, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B2 },
    DISABLED: { primary: Colors.GRAY_G2, textTitle: Colors.GRAY_G3, textValue: Colors.GRAY_G3 },

    FILLED: { primary: Colors.BLUE_B5, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },
    PREFILLED: { primary: Colors.GRAY_G1, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },

    SUCCESS: { primary: Colors.ACCENTS_LIME, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    ERROR: { primary: Colors.ACCENTS_SCARLET, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
}

const AppInput = (props) => {

    const [fieldState, onFieldValueChange, setFieldValidity, onFieldStatusChange, setFieldVisibility, setFieldTouched, setFieldNotifierText] = useFieldState('', true, 'DEFAULT');

    const [errorText, set_errorText] = useState('Checking Inavalid Email Entered')
    //const [input_state, set_input_state] = useState('ERROR')
    const [input_color_theme, set_input_color_theme] = useState(inputStateColors[fieldState?.status ? fieldState.status : 'FILLED'])

    const { onInputChange = () => { }, id, containerStyle = {}, labelStyle = {}, textInputStyle = {}, data } = props;
    useEffect(() => {
        //  console.log('formState','calling',fieldState);
        onInputChange('value', fieldState.value, props.index_history, fieldState.isValid);
    }, [fieldState, onInputChange])

    useEffect(() => {
        if (fieldState?.status) {
            set_input_color_theme(inputStateColors[fieldState?.status])
        }
    }, [fieldState.status])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        console.log('props.regex', props?.regex);
        // if (props?.data?.regex && !props.data.regex.test(text.toLowerCase())) {
        //     isValid = false;
        //     set_errorText('Inavalid Email Entered')
        // }

        if (props.required && text.trim().length === 0) {
            isValid = false;
            set_errorText('this field is required')
        }

        if (props.min != null && +text < props.min) {
            isValid = false;
            set_errorText('min required error')
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
            set_errorText('max required error')
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        if (!isValid) {
            onFieldStatusChange('ERROR')
        } else if (fieldState.status == 'ERROR' && isValid) {
            onFieldStatusChange('FOCUSED')
        }

        onFieldValueChange(text, isValid)
    }

    const lostFocusHandler = () => {
        setFieldTouched(true)
        if (fieldState.status == 'FOCUSED') {
            onFieldStatusChange('FILLED')
        }
        if (props?.onBlur) {
            props.onBlur()
        }
    }

    return (
        <View style={{ marginVertical: 4 }}>
            <View style={[{
                borderColor: input_color_theme.primary,
                borderWidth: 1,
                borderRadius: 6,
                paddingTop: 4,
                paddingHorizontal: 8
            }]}>
                {
                    <Text style={[AppStyles.fieldLabelText, { color: input_color_theme.textTitle }]}>{props?.label}</Text>}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            {...props}
                            onFocus={() => {
                                if (fieldState?.status != 'ERROR') {
                                    onFieldStatusChange('FOCUSED')
                                }
                            }}
                            //  onFocus={() => set_start_editing(true)}
                            placeholder={props?.placeHolder ? props?.placeHolder : ''}
                            style={[AppStyles.fieldValueText, { textAlignVertical: 'top', color: input_color_theme.textValue }]}
                            value={fieldState.value}
                            onChangeText={(text) => textChangeHandler(text)}
                            onBlur={() => lostFocusHandler()}
                            inputAccessoryViewID={'uniqueID'}
                            textAlignVertical="top"
                        />

                    </View>
                    {
                        ((props?.data?.verificationFieldName) && !props?.data?.submitPageOnVerify) &&

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 8 }}></View>
                            <AppButton size='TINY' label={'Verify'} onPress={() => {
                                props.onVerify()
                                onFieldStatusChange('SUCCESS')
                                setFieldNotifierText('Pan number successfully Verified')
                                setFieldValidity(true)
                            }} />
                        </View>
                    }
                </View>
            </View>
            <View>
                {
                    ((fieldState?.status == 'SUCCESS' || fieldState?.status == 'ERROR') && !fieldState.isValid && fieldState.touched && fieldState.notifierText) &&
                    <FieldStateNotifier text={fieldState.notifierText} color={input_color_theme.primary}></FieldStateNotifier>
                }
            </View>

        </View>
    )
}

export default AppInput

/**
 *                     <TextInput
                dense={true}
                mode={'flat'}
                disabled={props?.disabled}
                activeUnderlineColor={input_color_theme.primary}

                underlineStyle={{ borderBottomWidth: 0, borderWidth: 0.5, borderColor: Colors.WHITE }}
                //mode={'outlined'}
                label={props?.label}
               // placeholder={props?.placeholder ? props?.placeholder : ''}
                value={props?.value ? props?.value : ''}
                onChangeText={(text) => textChangeHandler(text)}
                onBlur={lostFocusHandler}
                style={[{ borderWidth: 1, borderColor: input_color_theme.primary, backgroundColor: Colors.WHITE }]}
            // onChangeText={text => { }}
            />
 */

/**
 *             {IsEmpty(props.labal) && <Text style={[AppStyles.fieldLabelText, { color: input_color_theme?.textTitle }]}>my label</Text>}
          

                <TextInput
                    {...props}
                    //  onFocus={() => set_start_editing(true)}
                    style={[AppStyles.textInput, { borderRadius: 4, borderWidth: 1, borderColor: input_color_theme.primary }]}
                    value={inputState.value}
                    onChangeText={(text) => textChangeHandler(text)}
                    onBlur={lostFocusHandler}
                    inputAccessoryViewID={'uniqueID'}
                    textAlignVertical="top"
                /> 
 */