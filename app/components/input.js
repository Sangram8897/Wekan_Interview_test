import React, { useReducer, useEffect, useContext } from 'react'
import { StyleSheet, TextInput, Text, View, Platform } from 'react-native'
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

    const { onInputChange = () => { }, id, containerStyle = {}, labelStyle = {}, textInputStyle = {} } = props;
    useEffect(() => {
        // if(inputState.touched){
        onInputChange(id, inputState.value, inputState.isValid);

    }, [inputState, onInputChange])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && emailRegex.test(test.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }
    return (
        <View style={{ width:'100%' }}>
            <View style={styles.inputContainer}>
                <TextInput
                    {...props}
                    style={[styles.textInput, { color: 'black' }]}
                    value={inputState.value}
                    onChangeText={(text) => textChangeHandler(text)}
                    onBlur={lostFocusHandler}
                    onSubmitEditing={props.onSubmitEditing}
                    inputAccessoryViewID={'uniqueID'}
                    textAlignVertical="top"
                    placeholder={props.placeholder}

                />
            </View>
            {
                !inputState.isValid && inputState.touched &&
                <Text style={{ fontSize: 10, color: 'red' }}>{props.errorText}</Text>
            }
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    textInput: {
        // textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: 10,
        fontSize: 14,
        width: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#FFF',
    },
    inputContainer: {
        marginVertical: 8,
        minHeight: Platform.OS == 'ios' ? 55 : 50,
        borderWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#777777',
        borderRadius: 5,
        // padding: Platform.OS == 'ios' ? 14 : 12,
    },
})