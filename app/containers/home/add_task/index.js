import React, { useState, createRef, useEffect, useCallback, useReducer } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addTaskRequest, editTaskRequest, taskListRequest, tasksListSuccess } from "../../../store/sagas/tasksActions";
import Input from "../../../components/input";
import { formReducer } from "../../../components/formReducer";
import Button from "../../../components/button";
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const AddTask = ({ route, navigation, }) => {
    const dispatch = useDispatch()
    const item = route?.params;
    const user_data = useSelector(state => state.auth.user);
    const task_list = useSelector(state => state.tasksReducer.tasks);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: item ? item?.title : '',
            description: item ? item?.description : '',
            due_date: item ? new Date(item?.due_date) : new Date(),
            status: item ? item?.status : 'IN_PROGRESS',
        },
        inputValidities: {
            name: false,
            package_image_url: false,
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

    const handleSubmitPress = () => {
        let data = {
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            due_date: formState.inputValues.due_date,
            status: formState.inputValues.status,
            uid: user_data?.uid
        }
        if (item) {
            dispatch(editTaskRequest(item?.id, data))
        } else {
            dispatch(addTaskRequest(data))
        }
        dispatch(taskListRequest())
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Input
                id='title'
                keyboardType={'default'}
                initialValue={formState.inputValues.title}
                initialValid={formState.inputValidities.title}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'title'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />
            <Input
                id='description'
                keyboardType={'default'}
                initialValue={formState.inputValues.description}
                initialValid={formState.inputValidities.description}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'description'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <Input
                id='due_date'
                keyboardType={'default'}
                initialValue={formState.inputValues.due_date}
                initialValid={formState.inputValidities.due_date}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'due_date'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />
            <Input
                id='status'
                keyboardType={'default'}
                initialValue={formState.inputValues.status}
                initialValid={formState.inputValidities.status}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'status'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <Button
                disabled={!formState.inputValues.title && !formState.inputValues.due_date}
                backgroundColor="#7DE24E"
                label="ADD TASK"
                onPress={handleSubmitPress}
            />
        </SafeAreaView>
    )
}

export default AddTask

const styles = StyleSheet.create({})


// import React, { useState, createRef, useEffect } from "react";
// import {
//     SafeAreaView,
//     StyleSheet,
//     TextInput,
//     View,
//     Text,
//     ScrollView,
//     Image,
//     Keyboard,
//     TouchableOpacity,
//     KeyboardAvoidingView,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addTaskRequest, editTaskRequest, taskListRequest, tasksListSuccess } from "../../../store/sagas/tasksActions";

// const initialState = {
//     inputValues: {
//         title: 'Sundar kumar',
//         description: '',
//         due_date: new Date(),
//         status: 'IN_PROGRESS',

//     },
//     inputValidities: {
//         name: false,
//         package_image_url: false,
//     },
//     formIsValid: false
// }

// const AddTask = ({ route, navigation, }) => {
//     const dispatch = useDispatch()
//     const item = route?.params;
//     const [userEmail, setUserEmail] = useState(item ? item?.name : "");
//     const [userPassword, setUserPassword] = useState("12345678");
//     const [errortext, setErrortext] = useState("");
//     const user_data = useSelector(state => state.auth.user);
//     const task_list = useSelector(state => state.tasksReducer.tasks);

//     const passwordInputRef = createRef();

//     console.log('task_list item', item);

//     const AddTaskData = async () => {
//         let data = {
//             name: userEmail,
//             age: 30,
//             uid: user_data?.uid
//         }
//         if (item) {
//             dispatch(editTaskRequest(item?.id, data))
//         } else {
//             dispatch(addTaskRequest(data))
//         }
//         dispatch(taskListRequest())
//         navigation.goBack();
//     }

//     return (
//         <SafeAreaView style={styles.mainBody}>
//             <ScrollView
//                 keyboardShouldPersistTaps="handled"
//                 contentContainerStyle={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignContent: "center",
//                 }}
//             >
//                 <View>
//                     <KeyboardAvoidingView enabled>

//                         <View style={styles.sectionStyle}>
//                             <TextInput
//                                 style={styles.inputStyle}
//                                 onChangeText={(UserEmail) =>
//                                     setUserEmail(UserEmail)
//                                 }
//                                 value={userEmail}
//                                 placeholder="Enter Email"
//                                 placeholderTextColor="#8b9cb5"
//                                 autoCapitalize="none"
//                                 keyboardType="email-address"
//                                 returnKeyType="next"
//                                 onSubmitEditing={() =>
//                                     passwordInputRef.current &&
//                                     passwordInputRef.current.focus()
//                                 }
//                                 underlineColorAndroid="#f000"
//                                 blurOnSubmit={false}
//                             />
//                         </View>
//                         <View style={styles.sectionStyle}>
//                             <TextInput
//                                 style={styles.inputStyle}
//                                 onChangeText={(UserPassword) =>
//                                     setUserPassword(UserPassword)
//                                 }
//                                 placeholder="Enter Password"
//                                 placeholderTextColor="#8b9cb5"
//                                 keyboardType="default"
//                                 ref={passwordInputRef}
//                                 onSubmitEditing={Keyboard.dismiss}
//                                 blurOnSubmit={false}
//                                 secureTextEntry={true}
//                                 underlineColorAndroid="#f000"
//                                 returnKeyType="next"
//                             />
//                         </View>
//                         {errortext != "" ? (
//                             <Text style={styles.errorTextStyle}>
//                                 {" "}
//                                 {errortext}{" "}
//                             </Text>
//                         ) : null}
//                         <TouchableOpacity
//                             style={styles.buttonStyle}
//                             activeOpacity={0.5}
//                             onPress={AddTaskData}
//                         >
//                             <Text style={styles.buttonTextStyle}>
//                                 LOGIN
//                             </Text>
//                         </TouchableOpacity>
//                         <Text
//                             style={styles.registerTextStyle}
//                             onPress={() =>
//                                 navigation.navigate("RegisterScreen")
//                             }
//                         >
//                             New Here ? Register
//                         </Text>
//                     </KeyboardAvoidingView>
//                 </View>
//             </ScrollView>
//             <Text
//                 style={{
//                     fontSize: 18,
//                     textAlign: "center",
//                     color: "white",
//                 }}
//             >
//                 React Native Firebase Authentication
//             </Text>
//             <Text
//                 style={{
//                     fontSize: 16,
//                     textAlign: "center",
//                     color: "white",
//                 }}
//             >
//                 www.aboutreact.com
//             </Text>
//         </SafeAreaView>
//     );
// };
// export default AddTask;

// const styles = StyleSheet.create({
//     mainBody: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "#fff",
//         alignContent: "center",
//     },
//     sectionStyle: {
//         flexDirection: "row",
//         height: 40,
//         marginTop: 20,
//         marginLeft: 35,
//         marginRight: 35,
//         margin: 10,
//     },
//     buttonStyle: {
//         backgroundColor: "#7DE24E",
//         borderWidth: 0,
//         color: "#FFFFFF",
//         borderColor: "#7DE24E",
//         height: 40,
//         alignItems: "center",
//         borderRadius: 30,
//         marginLeft: 35,
//         marginRight: 35,
//         marginTop: 20,
//         marginBottom: 25,
//     },
//     buttonTextStyle: {
//         color: "#FFFFFF",
//         paddingVertical: 10,
//         fontSize: 16,
//     },
//     inputStyle: {
//         flex: 1,
//         height: 50,
//         color: "white",
//         padding: 15,
//         color: 'red',
//         borderWidth: 1,
//         borderRadius: 10,
//         borderColor: "#dadae8",
//     },
//     registerTextStyle: {
//         color: "#FFFFFF",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 14,
//         alignSelf: "center",
//         padding: 10,
//     },
//     errorTextStyle: {
//         color: "red",
//         textAlign: "center",
//         fontSize: 14,
//     },
// });