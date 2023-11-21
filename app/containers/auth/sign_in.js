// https://aboutreact.com/react-native-firebase-authentication/

// Import React and Component
import React, { createRef, useReducer, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView, } from "react-native";
import { Button, Input } from "components";

import auth from "@react-native-firebase/auth";
import { Strings } from "config/strings";
import helper from "config/helper";

import { Screens } from "root/navigation/Screens";

import { formReducer } from "store/reducer/formReducer";
import { REGEXP } from "utils/index";
import IsEmpty from "utils/IsEmpty";
import validate from "validate.js";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const SignIn = ({ navigation }) => {

  const passwordInputRef = createRef();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      constraints: {
        username: {
          presence: true,
          format: {
            pattern: REGEXP.EMAIL_VALIDATOR,
            message: "Please enter valid username",
          },
        },
        password: {
          presence: true,
          length: {
            minimum: 6,
          },
        },
      }
    },
    inputValidities: {
      username: true,
      password: true,
      constraints: true
    },
    formIsValid: true,
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

  const emailVaildation = () => {
    var usernameError = validate.isEmpty(formState?.inputValues?.username);
    usernameError = validate(
      { username: formState?.inputValues?.username?.trim() + "" },
      formState?.inputValues?.constraints
    );
    usernameError = usernameError && usernameError.username ? true : false;
    if (usernameError == true) {
      if (IsEmpty(formState?.inputValues?.username)) {
        helper.errorToast(Strings.EMAIL_ERROR)
      } else {
        helper.errorToast(Strings.EMAIL_VALID_ERROR)
      }
    }
    return usernameError;
  }

  const passwordVaildation = () => {
    var passwordError = validate.isEmpty(formState?.inputValues?.password);
    passwordError = validate({ password: formState?.inputValues?.password + "" }, formState?.inputValues?.constraints);
    passwordError = passwordError && passwordError.password ? true : false;
    if (passwordError == true) {
      if (IsEmpty(formState?.inputValues?.password)) {
        helper.errorToast()
      } else if (!IsEmpty(formState?.inputValues?.password) && formState?.inputValues?.password?.length < 6) {
        helper.errorToast(Strings.PASSOWORD_VALID_ERROR)
      }
    }
    return passwordError;
  }

  const validation = async () => {
    try {
      var usernameError = await emailVaildation()
      var passwordError = await passwordVaildation()

      if (usernameError || passwordError) {
        return false;
      } else {
        return true;
      }
    }
    catch (err) {
      alert(err)
    }
  }


  const handleSubmitPress = () => {
    // if (!userEmail) {
    //   alert("Please fill Email");
    //   return;
    // }
    // if (!userPassword) {
    //   alert("Please fill Password");
    //   return;
    // }
    if (validation()) {
      auth()
        .createUserWithEmailAndPassword(formState.inputValues.username, formState.inputValues.password)
        .then((user) => {
          console.log('user', user);
          navigation.navigate(Screens.LOGIN)
          // If server response message same as Data Matched
          // if (user) navigation.replace("HomeScreen");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-email")
            setErrortext(error.message);
          else if (error.code === "auth/user-not-found")
            setErrortext("No User Found");
          else {
            setErrortext(
              "Please check your email id or password"
            );
          }
        });
    }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
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
              keyboardType="email-address"
              initialValue={formState.inputValues.username}
              initialValid={formState.inputValidities.username}
              required={true}
              email={true}
              autoCapitalize="none"
              autoFocus={true}
              onInputChange={inputChangeHandler}
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              placeholder={Strings.Enter_Email}
            //   inputAccessoryViewID={inputAccessoryViewID}
            />

            <Input
              id='password'
              keyboardType="default"
              ref={passwordInputRef}
              initialValue={formState.inputValues.password}
              initialValid={formState.inputValidities.password}
              required={true}
              minLength={4}
              secureTextEntry={true}
              onInputChange={inputChangeHandler}
              placeholder={Strings.Enter_Password}
              onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />
            <Button
              disabled={!formState.inputValues.username || !formState.inputValues.password}
              backgroundColor="#7DE24E"
              label={Strings.SIGNIN}
              onPress={handleSubmitPress}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    height: 50,
    color: "white",
    padding: 15,
    color: 'red',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});