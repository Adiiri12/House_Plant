import React, { useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, View } from 'react-native';

const FormDateInput = ({ label, onChange, defaultValue }) => {
    return (
        <View>
            <DateTimePicker
                testID='dateTimePicker'
                value={defaultValue}
                mode={'date'}
                is24Hour={true}
                display='default'
                onChange={(event, selectedDate) => onChange(selectedDate)}
            />
        </View>
    );
};

export default FormDateInput;
