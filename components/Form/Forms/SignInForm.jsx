import * as React from 'react';
import SignInFormKeys from '../../../forms/SignInFormKeys';
import SimpleForm from '../SimpleForm';

const SignInForm = ({ onSubmit }) => (
    <SimpleForm keys={SignInFormKeys} onSubmit={onSubmit} submitLabel='Sign In' />
);

export default SignInForm;
