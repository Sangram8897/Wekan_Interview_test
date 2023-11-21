import React, { createRef, useReducer, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "components";
import { Colors } from "styles/colors";
import { formReducer } from "store/reducer/formReducer";

import { loginRequest } from "store/constants/authActions";
import { useDispatch } from "react-redux";
import { Strings } from "config/strings";
import { ScreensRoutes } from "root/navigation/Screens";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const Login = ({ navigation }) => {
  const dispatch = useDispatch()

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

  const handleSubmitPress = () => {
    dispatch(loginRequest(formState.inputValues.username, formState.inputValues.password))
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>

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
              onSubmitEditing={Keyboard.dismiss}
              placeholder={Strings.ENTER_EMAIL}
              errorText={Strings.EMAIL_ERROR}
            //   inputAccessoryViewID={inputAccessoryViewID}
            />

            <Input
              id='password'
              label={Strings.PASSWORD}
              keyboardType={'default'}
              initialValue={formState.inputValues.password}
              initialValid={formState.inputValidities.password}
              required={true}
              secureTextEntry={true}
              onInputChange={inputChangeHandler}
              placeholder={Strings.ENTER_PASSWORD}
              onSubmitEditing={Keyboard.dismiss}
              minLength={6}
              errorText={Strings.PASSWORD_ERROR}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <Button
              disabled={!formState.formIsValid}
              backgroundColor={Colors.PRIMARY}
              textColor={Colors.WHITE}
              label={Strings.LOGIN}
              onPress={handleSubmitPress}
            />

            <Text
              style={styles.forgotPwdTextStyle}
              onPress={() =>
                navigation.navigate(ScreensRoutes.RESET_PASSWORD)
              }
            >
              {Strings.FORGOT_PASSWORD}
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.navigate(ScreensRoutes.SIGN_IN)
              }
            >
              {Strings.CREATE_NEW_ACCOUNT}
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  registerTextStyle: {
    color: "#0096FF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
  forgotPwdTextStyle: {
    color: Colors.GRAY_G4,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    margin: 12
  },
});


