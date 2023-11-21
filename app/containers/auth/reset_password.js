import React, { useReducer, useCallback } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import auth from "@react-native-firebase/auth";

import { Button, Input } from 'components';
import { Colors } from 'styles/colors';
import { formReducer } from 'store/reducer/formReducer';
import { Strings } from 'config/strings';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const ResetPassword = ({ navigation }) => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            username: "",
        },
        inputValidities: {
            username: false,
        },
        formIsValid: false,
    });

    const handleResetPassword = async () => {
        try {
            await auth().sendPasswordResetEmail(formState.inputValues.username);
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
                    required={true}
                    email={true}
                    id='username'
                    label={Strings.EMAIL}
                    keyboardType={'default'}
                    autoFocus={true}
                    initialValue={formState.inputValues.username}
                    initialValid={formState.inputValidities.username}
                    onInputChange={inputChangeHandler}
                    placeholder={Strings.ENTER_EMAIL}
                //   inputAccessoryViewID={inputAccessoryViewID}
                />
                <View style={{ height: 16 }} />

                <Button
                    disabled={!formState.formIsValid}
                    backgroundColor={Colors.ACCENTS_UNION_BLUE}
                    textColor={Colors.WHITE}
                    label={Strings.SIGNIN}
                    onPress={handleResetPassword}
                />
            </View>
        </SafeAreaView>
    );
};
export default ResetPassword;