import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../auth/AuthProvider';
import ResetPasswordForm from '../../components/Form/Forms/ResetPasswordForm';
import Page from '../Page';

const ResetPasswordPage = ({ navigation }) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { resetPassword } = useAuth();

    const handleSubmit = async (formData) => {
        resetPassword && (await resetPassword(formData.email));
        Alert.alert(`Email has been sent to ${formData.email}`);
        navigation.goBack();
    };

    return (
        <Page>
            <View style={styles.container}>
                <ResetPasswordForm onSubmit={handleSubmit} />
            </View>
        </Page>
    );
};

const useStyles = (theme) =>
    StyleSheet.create({
        container: {
            justifyContent: 'flex-start',
            alignContent: 'center',
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 5,
        },
        button: {
            marginTop: 10,
        },
    });

export default ResetPasswordPage;
