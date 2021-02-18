import * as React from 'react';
import SignUpFormKeys from '../../../forms/SignUpFormKeys';
import SimpleForm from '../SimpleForm';

const SignUpForm = ({ onSubmit }) => (
    <SimpleForm keys={SignUpFormKeys} onSubmit={onSubmit} submitLabel='Sign Up' />
);

export default SignUpForm;
