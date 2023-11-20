
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const DatePickerComp = ({ date = '', placeholder = "", setDate = () => { } }) => {
    const [open, setOpen] = useState(false)
    console.log('date',date);
//return <></>
    return (
        <View style={styles.inputContainer}>
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
            <DatePicker
                modal
                mode={'date'}
                open={open}
                date={date ? date : new Date()}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            {date ? <Text style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
                color: 'black',
                marginRight: 10,

            }}>{moment(date).format('DD-MMM-YYYY')}</Text> :
                <Text style={styles.placeholderText}>{placeholder}</Text>
            }
            <Fontisto
                onPress={() => setOpen(true)}
                name={'date'} size={20} color={'gray'} />
        </View>
    )
};

export default DatePickerComp;

const styles = StyleSheet.create({
    placeholderText: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: 'gray'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 10,
        minHeight: Platform.OS == 'ios' ? 55 : 50,
        borderWidth: 0.5,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderColor: '#777777',
        borderRadius: 5,
        // padding: Platform.OS == 'ios' ? 14 : 12,
    },
})