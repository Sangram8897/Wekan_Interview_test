

import React, { useState, createRef,useCallback } from "react";
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

import auth from "@react-native-firebase/auth";
import { loginRequest } from "../../store/sagas/authActions";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { profileRequest } from "../../store/sagas/profileActions";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
          ...state.inputValues,
          [action.input]: action.value,
      };
      const updatedValidities = {
          ...state.inputValidities,
          [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
      }
      return {
          formIsValid: updatedFormIsValid,
          inputValues: updatedValues,
          inputValidities: updatedValidities,
      }
  }
  return state;
}

const CreateProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
        name: 'Sundar kumar',
        package_image_url:null
    },
    inputValidities: {
        name: false,
        package_image_url:false,
    },
    formIsValid: false
});
const inputChangeHandler = useCallback(
  (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          input: inputIdentifier,
          isValid: inputValidity,
      })
  }, [dispatchFormState]);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const user_data = useSelector(state => state.auth.user);

  const passwordInputRef = createRef();

  //console.log('user_data', user_data);
  const handleSubmitPress = async () => {

    dispatch(profileRequest(user_data.uid, {
      name: userEmail,
      age: userPassword,
      address: 'At post Adare,Chiplun, Ratnagiri',
      mobile_number: '9021010551'
    }))

  }
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
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Create Profile</Text>
        <View>
          <KeyboardAvoidingView enabled>

            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errortext}{" "}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>
                Create
              </Text>
            </TouchableOpacity>
    
          </KeyboardAvoidingView>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};
export default CreateProfile;

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