import React, { useState, useReducer, useCallback } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import auth from "@react-native-firebase/auth";
import {Button,Input} from 'components';
import { Colors } from 'styles/colors';
import { formReducer } from 'store/reducer/formReducer';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('sangrampaste8897@gmail.com');
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
        },
        inputValidities: {
            email: true,
        },
        formIsValid: true,
    });

    const handleResetPassword = async () => {
        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert('Password Reset Email Sent',
                'Check your email for instructions to reset your password.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]
            );

        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ height: 16 }} />
                <Input
                    id='username'
                    label={'Enter your email'}
                    keyboardType={'default'}
                    autoFocus={true}
                    initialValue={formState.inputValues.email}
                    initialValid={formState.inputValidities.email}
                    required={true}
                    onInputChange={inputChangeHandler}
                    placeholder={'User name'}
                //   inputAccessoryViewID={inputAccessoryViewID}
                />
                <View style={{ height: 16 }} />
                <Button
                    // disabled={!formState.isValid}
                    backgroundColor={Colors.ACCENTS_UNION_BLUE}
                    textColor={Colors.WHITE}
                    label="RESET PASSWORD"
                    onPress={handleResetPassword}
                />




            </View>

        </SafeAreaView>
    );
};
export default ResetPasswordScreen;