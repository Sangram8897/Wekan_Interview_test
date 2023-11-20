import React, { useState, createRef, useEffect, useReducer, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { loginRequest } from "../../store/sagas/authActions";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/input";
import Button from "../../components/button";
import { formReducer } from "../../components/formReducer";
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [userEmail, setUserEmail] = useState("sangrampaste8897@gmail.com");
  const [userPassword, setUserPassword] = useState("12345678");
  const [errortext, setErrortext] = useState("");
  const user_data = useSelector(state => state.auth.user);

  const passwordInputRef = createRef();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: ""
    },
    inputValidities: {
      username: true,
      password: true
    },
    formIsValid: true,
  });


  const handleSubmitPress = () => {
    setErrortext("");
    // if (!userEmail) {
    //   alert("Please fill Email");
    //   return;
    // }
    // if (!userPassword) {
    //   alert("Please fill Password");
    //   return;
    // }
    console.log('userEmail, userPassword', userEmail, userPassword);
    dispatch(loginRequest(userEmail, userPassword))

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
                keyboardType={'default'}
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
           
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errortext}{" "}
              </Text>
            ) : null}

            <Button
              disabled={!formState.inputValues.username || !formState.inputValues.password}
              backgroundColor="#7DE24E"
              label="LOGIN"
              onPress={handleSubmitPress}
            />

            <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.replace("SignInScreen")
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
  sectionStyle: {
    flexDirection: "row",
  },
  registerTextStyle: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});


