import React, { useReducer, useEffect, useContext } from 'react'
import { StyleSheet, TextInput, Text, View, Platform, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { Colors } from '../styles/colors';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_CHANGE = 'INPUT_CHANGE';

interface InputProps extends TextInputProps {
    id: string;
    label: string;
    initialValue: string;
    initialValid: boolean;
    autoFocus?: boolean;
    onInputChange: (id: string, value: string, isValid: boolean) => void;
    onSubmitEditing?: () => void;
    // containerStyle: StyleProp<ViewStyle>;
    // labelStyle: StyleProp<TextStyle>;
    // textInputStyle: StyleProp<TextStyle>;
     required?: boolean;
    // email: boolean;
    // min: number;
    // max: number;
    // minLength: number;

    // errorText?: string;
     minHeight?: number;
     height?: number | boolean;
    // keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad' ;
}

interface InputState {
    value: string;
    isValid: boolean;
    touched: boolean;
}

const inputReducer = (state: InputState, action: any) => {
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

const Input: React.FC<InputProps> = (props: any) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false,
    });

    const { onInputChange = () => { }, id, } = props;
    useEffect(() => {
        // if(inputState.touched){
        onInputChange(id, inputState.value, inputState.isValid);

    }, [inputState, onInputChange])

    const textChangeHandler = (text: string) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props?.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props?.email && emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props?.min != null && +text < props.min) {
            isValid = false;
        }
        if (props?.max != null && +text > props.max) {
            isValid = false;
        }
        if (props?.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }
    return (
        <View style={styles.inputContainer}>
            {props.label && <Text style={[styles.fieldLabelText]}>{props.label}</Text>}
            {/* <View style={styles.inputContainer}> */}
            <TextInput
                {...props}
                style={[styles.textInput, { color: 'black' }]}
                value={inputState.value}
                onChangeText={(text) => textChangeHandler(text)}
                onBlur={lostFocusHandler}
                onSubmitEditing={props.onSubmitEditing}
                inputAccessoryViewID={'uniqueID'}
                // textAlignVertical="top"
                placeholder={props.placeholder}

            />
            {/* </View> */}
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
        marginVertical: 4,
        borderWidth: 0.5,
        borderColor: Colors.GRAY_G1,
        elevation: 5,
        minHeight: Platform.OS == 'ios' ? 55 : 50,
        ...Platform.select({
            ios: {
                shadowColor: '#CCC',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {

            },
        }),
    },
    inputContainer: {
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
    },
    fieldLabelText: {
        marginLeft: 4,
        marginBottom: 4,
        fontSize: Platform.OS == 'ios' ? 14 : 12,
        color: Colors.ACCENTS_UNION_BLUE,
        fontFamily: 'Montserrat-SemiBold'
    },
})