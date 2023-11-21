
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import { Colors } from 'styles/colors';

interface DatePickerCompProps {
    label?: string;
    date?: string | null;
    placeholder?: string;
    setDate: (date: Date) => void;
}

const DatePickerComp = ({
    label = '',
    date = '',
    placeholder = "",
    setDate = () => { } }: DatePickerCompProps) => {

    const [open, setOpen] = useState(false)
    console.log('date', date);

    return (
        <View style={styles.inputContainer}>
            {label && <Text style={[styles.fieldLabelText]}>{label}</Text>}
            <View style={styles.datepicker}>

                <DatePicker
                    modal
                    mode={'date'}
                    open={open}
                    date={date ? new Date(date) : new Date()}
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
    datepicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        paddingHorizontal: 10,
        minHeight: Platform.OS == 'ios' ? 55 : 50,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderColor: '#777777',
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: '#CCC',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    inputContainer: {
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
    },
    fieldLabelText: {
        marginLeft: 4,
        marginBottom: 4,
        fontSize: Platform.OS == 'ios' ? 14 : 12,
        color: Colors.ACCENTS_UNION_BLUE,
        fontFamily: 'Montserrat-SemiBold'
    },
})