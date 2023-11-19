import React, { useReducer, useEffect, useState, useContext } from 'react'
import { StyleSheet, TextInput, Text, View, Platform } from 'react-native'
import IsEmpty from '../../utils/IsEmpty';
import FieldStateNotifier from '../field_state_notifier';
import AppStyles from '../../style';


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

const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false,
    });


    const { onInputChange = () => { }, id, containerStyle = {}, labelStyle = {}, textInputStyle = {}, data } = props;
    useEffect(() => {
        //console.log('formState calling from here touched', inputState.touched, 'start_editing',start_editing,'value', inputState?.value,'initialValue', props.initialValue);
        //if (inputState.touched)
        onInputChange(id, inputState.value, props.index_history, inputState.isValid);

    }, [inputState, onInputChange])


    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid;
        //regex
        console.log('props.regex', props?.regex);
        if (props?.regex) {
            try {
                new RegExp(props?.regex);
                if (regex.test(text.toLowerCase())) {
                    isValid = true;
                }
            } catch (e) {
                isValid = false;
            }

        }
        console.log('props.regex isValid', isValid);
        // if (props.required && text.trim().length === 0) {
        //     isValid = false;
        // }
        // if (props.email && emailRegex.test(test.toLowerCase())) {
        //     isValid = false;
        // }
        // if (props.min != null && +text < props.min) {
        //     isValid = false;
        // }
        // if (props.max != null && +text > props.max) {
        //     isValid = false;
        // }
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
        <View style={{ marginVertical: 4 }}>
            {!IsEmpty(props.labal) && <Text style={[AppStyles.fieldLabelText, { color: 'gray' }]}>{props.labal}</Text>}
            <View
            // style={AppStyles.componentInnerContainer}
            >

                <TextInput
                    {...props}
                    //  onFocus={() => set_start_editing(true)}
                    style={[AppStyles.textInput]}
                    placeholder={props?.placeholder ? props?.placeholder : ''}
                    value={inputState.value}
                    onChangeText={(text) => textChangeHandler(text)}
                    onBlur={lostFocusHandler}
                    inputAccessoryViewID={'uniqueID'}
                    textAlignVertical="top"
                />
                {
                    inputState.isValid && inputState.touched &&
                    <FieldStateNotifier text={props.errorText}></FieldStateNotifier>
                }
            </View>
        </View>
    )
}

export default Input

