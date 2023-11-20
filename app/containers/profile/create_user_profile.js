

import React, { useRef, useEffect, useCallback, useReducer } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "components";

import { useDispatch, useSelector } from "react-redux";
import { profileRequest } from "store/constants/profileActions";
import { formReducer } from "store/reducer/formReducer";


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const CreateProfile = ({ navigation, route }) => {
  const { item } = route?.params;
  const dispatch = useDispatch()
  const user_data = useSelector(state => state.auth.user);
  const input1Ref = useRef(null)

  useEffect(() => {
    navigation.setOptions({
      title: item ? 'Update Profile' : 'Create Profile',
    });
  }, []);

  useEffect(() => {
    // Open the keyboard when the component mounts
    // input1Ref.current && input1Ref.current.focus();
  }, []);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: item ? item.name : '',
      mobile_number: item ? item.mobile_number : '',
      address: item ? item.address : ""
    },
    inputValidities: {
      name: false,
      mobile_number: false,
      address: false
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

  const handleSubmitPress = async () => {
    dispatch(profileRequest(user_data.uid, {
      name: formState.inputValues.name,
      address: formState.inputValues.address,
      mobile_number: formState.inputValues.mobile_number,
      email: user_data.email
    }))
  }

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <Input
              id='name'
              label={'User name'}
              ref={input1Ref}
              keyboardType={'default'}
              initialValue={formState.inputValues.name}
              initialValid={formState.inputValidities.name}
              required={true}
              onInputChange={inputChangeHandler}
              placeholder={'name'}
              onSubmitEditing={Keyboard.dismiss}
            />

            <Input
              id='mobile_number'
              label={'Mobile Number'}
              keyboardType={'default'}
              initialValue={formState.inputValues.mobile_number}
              initialValid={formState.inputValidities.mobile_number}
              required={true}
              onInputChange={inputChangeHandler}
              placeholder={'mobile_number'}
              onSubmitEditing={Keyboard.dismiss}
            />

            <Input
              id='address'
              label={'Address'}
              keyboardType={'default'}
              initialValue={formState.inputValues.address}
              initialValid={formState.inputValidities.address}
              textAlignVertical="top"
              numberOfLines={3}
              minHeight={100}
              height={Platform.OS == 'ios' && 100}

              multiline={true}
              required={true}
              onInputChange={inputChangeHandler}
              placeholder={'address'}
              onSubmitEditing={Keyboard.dismiss}
            />

            <Button
              disabled={!formState.formIsValid}
              backgroundColor="#7DE24E"
              label={item ? "UPDATE" : "CREATE"}
              onPress={handleSubmitPress}
            />

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
    backgroundColor: "#fff",
    alignContent: "center",
    paddingTop: 20
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