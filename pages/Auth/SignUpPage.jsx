import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-navigation';
import { useAuth } from '../../firebase/AuthProvider';
import SignUpForm from '../../components/Form//Forms/SignUpForm';
import Page from '../Page';

const SignUpPage = () => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { signUp } = useAuth();

    return (
        <Page>
            <View style={styles.container}>
                <SignUpForm
                    onSubmit={(formData) => signUp && signUp(formData.email, formData.password)}
                />
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

export default SignUpPage;
