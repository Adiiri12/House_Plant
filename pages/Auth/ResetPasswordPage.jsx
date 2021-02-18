import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../auth/AuthProvider';
import ResetPasswordForm from '../../components/Form/Forms/ResetPasswordForm';
import Page from '../Page';

const ResetPasswordPage = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

    const { resetPassword } = useAuth();

    return (
        <Page>
			<View style={styles.container}>
				<ResetPasswordForm
					onSubmit={(formData) => resetPassword && resetPassword(formData.email)}
				/>
			</View>
        </Page>
    );
};

const useStyles = (theme) => StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignContent: 'center',
		padding: 20,
		backgroundColor: '#fff'
	},
	button: {
		marginTop: 10
	}
});

export default ResetPasswordPage;
