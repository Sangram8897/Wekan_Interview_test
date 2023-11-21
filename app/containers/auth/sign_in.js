import React, { createRef, useReducer, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, } from "react-native";
import { Button, Input, Container } from "components";

import auth from "@react-native-firebase/auth";
import { Strings } from "config/strings";
import {  ScreensRoutes } from "root/navigation/Screens";

import { formReducer } from "store/reducer/formReducer";
import { Colors } from "styles/colors";
import { responseHandler } from "config/message";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const SignIn = ({ navigation }) => {

  const passwordInputRef = createRef();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: ""
    },
    inputValidities: {
      username: false,
      password: false
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      })
    }, [dispatchFormState]);


  const handleSubmitPress = () => {
    console.log('userformState', formState);
    auth()
      .createUserWithEmailAndPassword(formState.inputValues.username, formState.inputValues.password)
      .then((user) => {
        console.log('user', user);
         navigation.navigate(ScreensRoutes.LOG_IN)
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          responseHandler(Strings.ALREADY_IN_USE);
        }
        else if (error.code === 'auth/invalid-email') {
          responseHandler(Strings.INVALID_EMAIL);
        } else {
          responseHandler(Strings.SOMETHING_WRONG);
        }
      });
  };

  return (
    <Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <Input
              id='username'
              label={Strings.EMAIL}
              keyboardType="email-address"
              initialValue={formState.inputValues.username}
              initialValid={formState.inputValidities.username}
              required={true}
              email={true}
              autoCapitalize="none"
              autoFocus={true}
              onSubmitEditing={Keyboard.dismiss}
              onInputChange={inputChangeHandler}
              placeholder={Strings.ENTER_EMAIL}
              errorText={formState.inputValues.username ?
                Strings.EMAIL_VALIDATION_ERROR : Strings.EMAIL_ERROR}
            //   inputAccessoryViewID={inputAccessoryViewID}
            />

            <Input
              id='password'
              label={Strings.PASSWORD}
              keyboardType="default"
              initialValue={formState.inputValues.password}
              initialValid={formState.inputValidities.password}
              required={true}
              minLength={6}
              secureTextEntry={true}
              onInputChange={inputChangeHandler}
              placeholder={Strings.ENTER_PASSWORD}
              onSubmitEditing={Keyboard.dismiss}
              errorText={formState.inputValues.password ?
                Strings.PASSWORD_VALIDATION_ERROR : Strings.PASSWORD_ERROR}
            // inputAccessoryViewID={inputAccessoryViewID}
            />
            <Button
              disabled={!formState.formIsValid}
              backgroundColor={Colors.ACCENTS_UNION_BLUE}
              textColor={Colors.WHITE}
              label={Strings.SIGNIN}
              onPress={handleSubmitPress}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Container>
  );
};
export default SignIn;
