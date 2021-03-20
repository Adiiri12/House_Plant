import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationScreens, NavigationTabs } from '../../common/navigation';
import Page from '../Page';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-navigation';
import { getHouseholds } from '../../firebase/HouseholdProvider';
import { Alert } from 'react-native';
import { useAuth } from '../../firebase/AuthProvider';
import { Button } from 'react-native-elements';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';

const ItemView = ({ item }) => {
    return (
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.title}
        </Text>
    );
};

const MyHouseholdsPage = ({ navigation }) => {
    const theme = useTheme();

    const { currentUser } = useAuth();

    const [households, setHouseholds] = useState([]);
    const [loadingHouseholds, setLoadingHouseholds] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButton}>
                    <Button
                        title='New'
                        onPress={() => navigation.navigate(NavigationScreens.AddHousehold.name)}
                        type='clear'
                    />
                </View>
            ),
        });

        loadHouseholds();
    }, []);

    const loadHouseholds = async () => {
        try {
            setLoadingHouseholds(true);

            const households = await getHouseholds(currentUser['email'].toUpperCase());
            setHouseholds(households);
        } catch (err) {
            Alert.alert(err.message);
        } finally {
            setLoadingHouseholds(false);
        }
    };

    const ItemView = ({ item }) => {
        const icon = 'home';
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate(NavigationScreens.Plants.name, {
                        householdID: item.id,
                    })
                }
            >
                <View style={styles.card}>
                    <Ionicons name={icon} ios={`ios-${icon}`} size={24} color='#62BD69' />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Page>
            <View style={styles.container}>
                <FlatList
                    data={households}
                    keyExtractor={(item, index) => index.toString()}
                    enableEmptySections={true}
                    renderItem={ItemView}
                    refreshControl={
                        <RefreshControl refreshing={loadingHouseholds} onRefresh={loadHouseholds} />
                    }
                />
            </View>
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

export default MyHouseholdsPage;
