import React, { useCallback, useReducer, useEffect } from "react";
import { Keyboard, Platform, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { addTaskRequest, editTaskRequest, taskListRequest } from "store/constants/tasksActions";

import { formReducer, FormState } from "store/reducer/formReducer";
import { task_status } from "config/variables";
import { Colors } from "styles/colors";

import { Input, Button, DropdownComp, DatePickerComp, Container } from 'components/index'
import { RootState } from "store/configure_store";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
// interface RouterProps {
//     navigation: NavigationProp<any, any>;
//     route: RouteProp<any, any>;
// }


const AddTask = ({ route, navigation, }) => {
    const dispatch = useDispatch()
    const item = route?.params;
    const user_data = useSelector((state) => state.auth.user);

    useEffect(() => {
        navigation.setOptions({
            title: item ? 'Update Task' : 'Create Task',
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
            due_date: formState.inputValues?.due_date ? formState.inputValues.due_date : "",
            status: formState.inputValues.status,
            uid: user_data?.uid
        }
        if (item?.id) {
            dispatch(editTaskRequest(item?.id, data))
        } else {
            dispatch(addTaskRequest(data))
        }
        dispatch(taskListRequest())
        navigation.goBack();
    }

    return (
        <Container>
            <Input
                id='title'
                autoFocus={true}
                label={'Task Title'}
                keyboardType={'default'}
                initialValue={formState.inputValues.title}
                initialValid={formState.inputValidities.title}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'Enter task title'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />
            <Input
                id='description'
                label={'Task Description'}
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
                placeholder={'Enter task Description'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <DatePickerComp
                label={'Select Task Due Date'}
                placeholder={'Select Due Date'}
                date={formState.inputValues.due_date}
                setDate={(date) => {
                    console.log('date', date);
                    inputChangeHandler('due_date', date, true)
                }}
            />

            <DropdownComp
                label={'Select Task Status'}
                placeholder={'Select Status'}
                value={formState.inputValues.status}
                data={task_status}
                setDropdownValue={(status) => inputChangeHandler('status', status, true)}
            />

            <Button
                disabled={!formState.inputValues.title && !formState.inputValues.due_date}
                backgroundColor={Colors.ACCENTS_UNION_BLUE}
                textColor={Colors.WHITE}
                label={item ? 'UPDATE' : "ADD"}
                onPress={handleSubmitPress}
            />
        </Container>
    )
}

export default AddTask
