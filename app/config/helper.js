import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const helper = {
    charLimit_msg: 'Description character limit 1500.',
    getInitials(data) {
        let initial = data?.substr(0, 2)
        return initial?.toUpperCase();
    },
    getDisplayDateInString(date) {
        return moment(date).fromNow();
    },
    successToast(message) {
        Toast.show({
            text2: message,
            type: 'success',
            text1: 'Success',
        })
    },

    errorToast(message) {
        Toast.show({
            text2: message,
            type: 'error',
            text1: 'Error',
        })
    },

    ErrorWarningToast(message) {
        Toast.show({
            text2: message,
            type: 'error',
            text1: 'Error',
        })
    },


    infoToast(message) {
        Toast.show({
            text2: message,
            type: 'info',
            text1: 'info',
        })
    },

    trainingToast(message){
        Toast.show({
            text2: message,
            type: 'success',
            text1: 'success',
        });
    },

    msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }

}

export default helper;

