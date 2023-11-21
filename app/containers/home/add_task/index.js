import React, { useCallback, useReducer, useEffect } from "react";
import { Keyboard, Platform, ScrollView, View, KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { addTaskRequest, editTaskRequest, taskListRequest } from "store/constants/tasksActions";

import { formReducer } from "store/reducer/formReducer";
import { task_status } from "config/variables";
import { Colors } from "styles/colors";

import { Input, Button, DropdownComp, DatePickerComp, Container } from 'components/index'
import moment from "moment";
import { Strings } from "config/strings";
import { ScreensRoutes } from "root/navigation/Screens";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const AddTask = ({ route, navigation, }) => {
    const dispatch = useDispatch()
    const item = route?.params;
    const user_data = useSelector((state) => state.auth.user);

    useEffect(() => {
        navigation.setOptions({
            title: item ? Strings.UPDATE_TASK : Strings.CREATE_TASK,
        });
    }, []);

    const initialFormState = {
        inputValues: {
            title: item ? item.title : '',
            description: item ? item.description : '',
            due_date: item?.due_date ? new Date(item.due_date).toString() : null,
            status: item ? item.status : null,
        },
        inputValidities: {
            title: false,
            description: false,
            due_date: false,
            status: false,
        },
        formIsValid: false,
    };
    const [formState, dispatchFormState] = useReducer(formReducer, initialFormState);

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
            due_date: formState.inputValues?.due_date ?
                moment(formState.inputValues?.due_date).format('YYYY-MM-DD') : null,
            status: formState.inputValues.status,
            uid: user_data?.uid
        }
        if (item?.id) {
            dispatch(editTaskRequest(item?.id, data))
        } else {
            dispatch(addTaskRequest(data))
        }
        dispatch(taskListRequest(user_data.uid))
        navigation.replace(ScreensRoutes.DASHBOARD);
    }

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
                            id='title'
                            autoFocus={true}
                            label={Strings.TASK_TITLE}
                            keyboardType={'default'}
                            initialValue={formState.inputValues.title}
                            initialValid={formState.inputValidities.title}
                            required={true}
                            onInputChange={inputChangeHandler}
                            placeholder={Strings.ENTER_TASK_TITLE}
                            onSubmitEditing={Keyboard.dismiss}
                        // inputAccessoryViewID={inputAccessoryViewID}
                        />
                        <Input
                            id='description'
                            label={Strings.TASK_DESCRIPTION}
                            textAlignVertical="top"
                            numberOfLines={6}
                            minHeight={140}
                            height={Platform.OS == 'ios' && 150}
                            multiline={true}
                            keyboardType={'default'}
                            initialValue={formState.inputValues.description}
                            initialValid={formState.inputValidities.description}
                            required={true}
                            onInputChange={inputChangeHandler}
                            placeholder={Strings.ENTER_TASK_DESCRIPTION}
                            onSubmitEditing={Keyboard.dismiss}
                        // inputAccessoryViewID={inputAccessoryViewID}
                        />

                        <DatePickerComp
                            label={Strings.TASK_DUE_DATE}
                            placeholder={Strings.ENTER_TASK_DUE_DATE}
                            date={formState.inputValues.due_date}
                            setDate={(date) => {
                                console.log('date', date);
                                inputChangeHandler('due_date', date, true)
                            }}
                        />

                        <DropdownComp
                            label={Strings.TASK_STATUS}
                            placeholder={Strings.ENTER_TASK_STATUS}
                            value={formState.inputValues.status}
                            data={task_status}
                            setDropdownValue={(status) => inputChangeHandler('status', status, true)}
                        />

                        <Button
                            disabled={!formState.inputValues.title && !formState.inputValues.due_date}
                            backgroundColor={Colors.ACCENTS_UNION_BLUE}
                            textColor={Colors.WHITE}
                            label={item ? Strings.CAP_UPDATE : Strings.CAP_CREATE}
                            onPress={handleSubmitPress}
                        />
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </Container>
    )
}

export default AddTask
