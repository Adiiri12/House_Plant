import { Alert } from "react-native";

export const alertAsync = async (title, message) => new Promise((resolve) => {
	Alert.alert(
		title,
		message,
		[
			{
				text: 'ok',
				onPress: () => {
					resolve('YES');
				},
			},
		],
		{ cancelable: false },
	);
});

export const confirmAsync = async (title, message, onConfirm, onCancel) => new Promise((resolve) => {
	Alert.prompt(
		title,
		message,
		[
			{
				text: 'Cancel',
				onPress: () => {
					resolve(onConfirm);
				},
			},
			{
				text: 'ok',
				onPress: () => {
					resolve(onConfirm);
				},
			},
		],
		{ cancelable: false },
	);
});