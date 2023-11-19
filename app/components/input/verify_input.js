
import React, { useReducer, useEffect, useState, useContext } from 'react'
import { StyleSheet, TextInput, Text, View, Platform ,Button} from 'react-native'
import IsEmpty from '../../utils/IsEmpty'
import AppStyles from '../../style';
import FieldStateNotifier from '../field_state_notifier';

const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            }
        default:
            return state;
    }
}

const VerifyInput = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false,
    });
    const [errorText, set_errorText] = useState(null)

    const { onInputChange = () => { }, id, containerStyle = {}, labelStyle = {}, textInputStyle = {}, data } = props;
    useEffect(() => {
        //console.log('formState calling from here touched', inputState.touched, 'start_editing',start_editing,'value', inputState?.value,'initialValue', props.initialValue);
        //if (inputState.touched)
        onInputChange('value', inputState.value, props.index_history, inputState.isValid);

    }, [inputState, onInputChange])


    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        console.log('props.regex', props?.regex);
        if (props?.regex && !props.regex.test(text.toLowerCase())) {
            isValid = false;
            set_errorText('Inavalid Email Entered')
        }

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
        // if (props.minLength != null && text.length < props.minLength) {
        //     isValid = false;
        // }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
        if (props?.onBlur) {
            props.onBlur()
        }
    }

    return (
        <View style={AppStyles.componentContainer}>
            {!IsEmpty(props.labal) && <Text style={[AppStyles.fieldLabelText, { color: data?.active ? 'red' : 'gray' }]}>{props.labal}</Text>}
            <View
            // style={AppStyles.componentInnerContainer}
            >

                <View style={{flex:1, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        {...props}
                        //  onFocus={() => set_start_editing(true)}
                        style={[AppStyles.textInput,{flex:1}]}
                        value={inputState.value}
                        onChangeText={(text) => textChangeHandler(text)}
                        onBlur={lostFocusHandler}
                        inputAccessoryViewID={'uniqueID'}
                        textAlignVertical="top"
                    />
                    <Button title='verify' onPress={props.onVerify}/>
                </View>

                {
                    !inputState.isValid && inputState.touched && errorText &&
                    <FieldStateNotifier text={errorText}></FieldStateNotifier>
                }
            </View>
        </View>
    )
}

export default VerifyInput

