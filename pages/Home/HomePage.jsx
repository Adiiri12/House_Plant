import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationTabs } from '../../common/navigation';
import Page from '../Page';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-navigation';

const HomePage = ({ navigation }) => {
    const theme = useTheme();

    return (
        <Page>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationTabs.Plants.name)}>
                    <View style={styles.card}>
                        <Ionicons name='leaf' ios={`ios-leaf`} size={24} color='#62BD69' />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>My Plants</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationTabs.Profile.name)}>
                    <View style={styles.card}>
                        <Ionicons name='person' ios={`ios-person`} size={24} color='#62BD69' />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>My Profile</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <StatusBar style='auto' />
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        alignContent: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
    textContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20,
    },
});

export default HomePage;
