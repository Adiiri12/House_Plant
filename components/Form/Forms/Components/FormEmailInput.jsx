import React from 'react';
import { Input } from 'react-native-elements';

const FormEmailInput = ({ label, onChange, defaultValue }) => {
    return (
        <Input
            label={label}
            onChangeText={onChange}
            textContentType='emailAddress'
            autoCompleteType='email'
            defaultValue={defaultValue}
        />
    );
};

export default FormEmailInput;
