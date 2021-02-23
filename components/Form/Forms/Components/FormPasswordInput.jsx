import React from 'react';
import { Input } from 'react-native-elements';

const FormPasswordInput = ({ label, onChange }) => {
    return (
        <Input
            label={label}
            onChangeText={onChange}
            textContentType='password'
            autoCompleteType='password'
            secureTextEntry={true}
        />
    );
};

export default FormPasswordInput;
