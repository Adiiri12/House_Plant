import * as React from 'react';
import ResetPasswordFormKeys from '../../../forms/ResetPasswordFormKeys';
import SimpleForm from '../SimpleForm';

const ResetPasswordForm = ({ onSubmit }) => (
    <SimpleForm keys={ResetPasswordFormKeys} onSubmit={onSubmit} submitLabel='Reset Password' />
);

export default ResetPasswordForm;
