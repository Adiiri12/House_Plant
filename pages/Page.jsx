import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Base page/screen
 * @param param0
 */
function Page({ children }) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.view}>{children}</View>
        </View>
    );
}

const useStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            backgroundColor: theme.colors.background,
        },
        view: {
            flex: 1,
            padding: 5,
            backgroundColor: theme.colors.background,
        },
    });

export default Page;
