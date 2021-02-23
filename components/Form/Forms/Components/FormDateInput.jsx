import React from 'react';
import { Input } from 'react-native-elements';

const FormDateInput = ({ label, onChange, defaultValue }) => {
    return <Input label={label} onChangeText={onChange} defaultValue={defaultValue} />;
};

export default FormDateInput;
