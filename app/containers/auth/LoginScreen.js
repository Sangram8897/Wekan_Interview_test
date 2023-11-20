import React, { createRef, useReducer, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "components";
import { Colors } from "styles/colors";
import { formReducer } from "store/reducer/formReducer";

import { loginRequest } from "store/constants/authActions";
import { useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const passwordInputRef = createRef();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "sangrampaste8897@gmail.com",
      password: "123456"
    },
    inputValidities: {
      username: true,
      password: true
    },
    formIsValid: true,
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
              id='username'
              label={'Email'}
              keyboardType={'default'}
              autoFocus={true}
              initialValue={formState.inputValues.username}
              initialValid={formState.inputValidities.username}
              required={true}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              placeholder={'User name'}
            //   inputAccessoryViewID={inputAccessoryViewID}
            />

            <Input
              id='password'
              label={'Password'}
              keyboardType={'default'}
              initialValue={formState.inputValues.password}
              initialValid={formState.inputValidities.password}
              required={true}
              secureTextEntry={true}
              onInputChange={inputChangeHandler}
              placeholder={'Password'}
              onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <Button
              disabled={!formState.inputValues.username || !formState.inputValues.password}
              backgroundColor={Colors.ACCENTS_UNION_BLUE}
              textColor={Colors.WHITE}
              label="LOGIN"
              onPress={handleSubmitPress}
            />

            <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.navigate("ResetPasswordScreen")
              }
            >
              Forgot Password
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.navigate("SignInScreen")
              }
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  registerTextStyle: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
});


