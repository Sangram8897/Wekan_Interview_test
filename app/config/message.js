import { Alert } from 'react-native';
import { errorMessages } from './ErrorMessages';


export const errorHandler = response => {
    if (response.status) {
        // let _message = errorMessages[response.status].title;
        let _message = errorMessages[response.status].message;
        Alert.alert(
            'Error!',
            _message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
        );
    }
};

export const alertHandler = (_message, callback = () => { }) => {
    Alert.alert(
        'Warning !',
        _message,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => callback(),
                style: 'ok',
            }],
        { cancelable: true },
    );
};

export const responseHandler = (_message) => {
    Alert.alert(
        'Warning !',
        _message,
        [
            {
                text: 'OK',
                onPress: () => { },
                style: 'ok',
            }],
        { cancelable: true },
    );
};