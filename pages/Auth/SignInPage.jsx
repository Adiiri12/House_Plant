import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useTheme } from 'react-navigation';
import { useAuth } from '../../auth/AuthProvider';
import { NavigationScreens } from '../../common/navigation';
import SignInForm from '../../components/Form/Forms/SignInForm';
import Page from '../Page';

const SignInPage = ({ navigation }) => {
	const theme = useTheme();
	const styles = useStyles(theme);

    const { signIn } = useAuth();

    return (
        <Page>
			<View style={styles.container}>
				<SignInForm
					onSubmit={(formData) => signIn && signIn(formData.email, formData.password)}
				/>
				<Button
					style={styles.button}
					title='Sign Up'
					onPress={() => navigation.navigate(NavigationScreens.SignUp.name)}
					type='outline'
				/>
				<Button
				style={styles.button}
					title='Forgot Password?'
					onPress={() => navigation.navigate(NavigationScreens.ResetPassword.name)}
					type='outline'
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

export default SignInPage;
