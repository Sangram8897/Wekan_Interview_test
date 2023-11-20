import React, { useCallback, useReducer } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Keyboard,
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

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const AddTask = ({ route, navigation, }) => {
    const dispatch = useDispatch()
    const item = route?.params;
    const user_data = useSelector(state => state.auth.user);

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
            due_date:formState.inputValues.due_date? moment(formState.inputValues.due_date).format('DD-MMM-YYYY'):"",
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
                numberOfLines={6}
                multiline={true}
                keyboardType={'default'}
                initialValue={formState.inputValues.description}
                initialValid={formState.inputValidities.description}
                required={true}
                onInputChange={inputChangeHandler}
                placeholder={'description'}
                onSubmitEditing={Keyboard.dismiss}
            // inputAccessoryViewID={inputAccessoryViewID}
            />

            <DatePickerComp
                placeholder={'Select Due Date'}
                date={formState.inputValues.due_date}
                setDate={(date) =>{
                    console.log('date',date);
                    inputChangeHandler('due_date', date, true)}}
            />

            <DropdownComp
                placeholder={'Select Status'}
                value={formState.inputValues.status}
                data={task_status}
                setDropdownValue={(status) => inputChangeHandler('status', status, true)}
            />

            <Button
                disabled={!formState.inputValues.title && !formState.inputValues.due_date}
                backgroundColor="blue"
                textColor="white"
                label="ADD TASK"
                onPress={handleSubmitPress}
            />
        </SafeAreaView>
    )
}

export default AddTask
