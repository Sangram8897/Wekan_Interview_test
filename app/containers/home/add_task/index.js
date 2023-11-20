import React, { useCallback, useReducer, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Keyboard,
    Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTaskRequest, editTaskRequest, taskListRequest, tasksListSuccess } from "../../../store/sagas/tasksActions";
import Input from "../../../components/input";
import { formReducer } from "../../../components/formReducer";
import Button from "../../../components/button";
import DropdownComp from "../../../components/dropdown";
import DatePickerComp from "../../../components/datepicker";
import moment from "moment";
import { task_status } from "../../../config/variables";
import { Colors } from "../../../style/colors";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const AddTask = ({ route, navigation, }) => {
    const dispatch = useDispatch()
    const item = route?.params;
    const user_data = useSelector(state => state.auth.user);
    console.log('item', item);
    useEffect(() => {
        navigation.setOptions({
            title: item ? 'Update Task' : 'Create Task',
        });
    }, []);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: item ? item?.title : '',
            description: item ? item?.description : '',
            due_date: item?.due_date ? new Date(item?.due_date) : null,
            status: item ? item?.status : null,
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
            due_date: formState.inputValues.due_date ? moment(formState.inputValues.due_date).format('DD-MMM-YYYY') : "",
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
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
                height={Platform.OS=='ios'&&150}
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
        </SafeAreaView>
    )
}

export default AddTask
