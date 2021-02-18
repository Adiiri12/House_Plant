import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../auth/AuthProvider';
import Page from '../Page';
import { Button } from 'react-native-elements'
import { useTheme } from 'react-navigation';

const ProfilePage = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

    const { currentUser, signOut } = useAuth();

    return (
        <Page>
			<View style={styles.container}>
				<Text style={styles.email}>Signed in as:</Text>
				<Text>{currentUser?.email}</Text>
			</View>
			<View style={styles.padded}>
				<Button title='Sign Out' onPress={() => signOut && signOut()} type='outline' />
			</View>
        </Page>
    );
};

const useStyles = (theme) => StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	padded: {
		padding: 20
	},
	email: {
		fontSize: 20,
		fontWeight: 'bold',
	}
})

export default ProfilePage;
