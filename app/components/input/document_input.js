import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import MultiInputField from '../MultiInputField'
import { Colors } from '../../style/colors'
import useFieldState from '../../containers/loan_journey/hook/useFieldState'
import FieldStateNotifier from '../field_state_notifier'
import AppButton from '../button/index'
import AppStyles from '../../style'

const inputStateColors = {
    DEFAULT: { primary: Colors.GRAY_G2, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    FOCUSED: { primary: Colors.BLUE_B2, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B2 },
    DISABLED: { primary: Colors.GRAY_G2, textTitle: Colors.GRAY_G3, textValue: Colors.GRAY_G3 },

    FILLED: { primary: Colors.BLUE_B5, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },
    PREFILLED: { primary: Colors.GRAY_G1, textTitle: Colors.BLUE_B5, textValue: Colors.BLUE_B5 },

    SUCCESS: { primary: Colors.ACCENTS_LIME, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
    ERROR: { primary: Colors.ACCENTS_SCARLET, textTitle: Colors.BLUE_B2, textValue: Colors.BLUE_B5 },
}
const DocumentInput = ({ data, fieldLabel, index_history, fieldDataType, onVerify }) => {

    const [fieldState, onFieldValueChange, setFieldValidity, onFieldStatusChange, setFieldVisibility, setFieldTouched, setFieldNotifierText] = useFieldState('', true, 'DEFAULT');
    const [input_color_theme, set_input_color_theme] = useState(inputStateColors[fieldState.status])

    const panregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    useEffect(() => {
        set_input_color_theme(inputStateColors[fieldState?.status])
    }, [fieldState?.status])

    const multiInputFieldChange = (multi_input_state) => {
        console.log('multi_input_state', fieldState, multi_input_state);
        if (multi_input_state?.inputs_string) {
            onFieldValueChange(multi_input_state.inputs_string)
        }
        if (multi_input_state?.focused) {
            setFieldTouched(true)
            if (fieldState.status != 'ERROR') {
                onFieldStatusChange('FOCUSED')
            }
        }
        else if (fieldState.touched && !panregex.test(multi_input_state?.inputs_string)) {
            onFieldStatusChange('ERROR')
            setFieldNotifierText('please enter valid pan number')
            setFieldValidity(false)
        }
        if (multi_input_state?.inputs_string && panregex.test(multi_input_state?.inputs_string)) {
            onFieldStatusChange('FILLED')
            setFieldValidity(true)
        }
    }

    return (
        <View style={{ marginVertical: 8 }}>
            <View style={[{
                borderColor: input_color_theme.primary,
                borderWidth: 1,
                borderRadius: 6,
                paddingVertical: 4,
                paddingHorizontal: 8
            }]}>
                {<Text style={AppStyles.fieldLabelText}>
                    {fieldLabel ? fieldLabel : 'test label'}
                </Text>}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <MultiInputField
                            fieldBorderColor={input_color_theme.primary}
                            fieldTextColor={input_color_theme.textValue}
                            multiInputFieldChange={multiInputFieldChange}
                            textAlign={'center'}
                            fieldDataType={fieldDataType}
                            value={''}
                        />
                    </View>
                    {
                        data?.verificationFieldName &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 8 }}></View>
                            <AppButton size='TINY' label={'Verify'} onPress={() => {
                                onVerify()
                                onFieldStatusChange('SUCCESS')
                                setFieldNotifierText('Pan number successfully Verified')
                                setFieldValidity(true)
                            }} />
                        </View>
                    }
                </View>
            </View>
            {
                ((fieldState?.status == 'SUCCESS' || fieldState?.status == 'ERROR') && fieldState.touched && fieldState.notifierText) &&
                <FieldStateNotifier text={fieldState.notifierText} color={input_color_theme.primary}></FieldStateNotifier>
            }
        </View>
    )
}

export default DocumentInput

const styles = StyleSheet.create({})