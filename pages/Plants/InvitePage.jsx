import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import PlantContext from '../../contexts/PlantContext';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Page from '../Page';
import { NavigationScreens } from '../../common/navigation';
import {
    addHousehold,
    getHouseholdByID,
    inviteUserToHousehold,
    removeUserFromHousehold,
    updateHousehold,
    useHouseholdStorage,
    useStorage,
} from '../../firebase/HouseholdProvider';
import { usePlantStorage } from '../../firebase/PlantProvider';
import SimpleForm from '../../components/Form/SimpleForm';
import { useAuth } from '../../firebase/AuthProvider';
import InviteUserFormKeys from '../../forms/InviteUserFormKeys';
import { alertAsync } from '../../common/AsyncAlert';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { remove } from 'lodash';

const InvitePage = ({ navigation, route }) => {
    const { currentUser } = useAuth();
    const { householdID } = route.params;

    const [household, setHousehold] = useState({});

    useEffect(() => {
        loadHousehold();
    }, []);

    const loadHousehold = async () => {
        const household = await getHouseholdByID(householdID);
        setHousehold(household);
    };

    const handleInvite = async (email) => {
        try {
            await inviteUserToHousehold(householdID, email);
            navigation.goBack();
        } catch (err) {
            await alertAsync(err.message);
        }
    };

    const handleRemove = async (email) => {
        try {
            Alert.alert('Delete Plant', 'Are you sure you want to delete this plant?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await removeUserFromHousehold(householdID, email);
                        navigation.goBack();
                    },
                },
            ]);
        } catch (err) {
            Alert.alert(err.message);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={async () => {
                    await handleRemove(item);
                }}
            >
                <View style={styles.card}>
                    <Ionicons name='trash' size={24} color='#efabcd' />
                    <View style={styles.textContainer}>
                        <Text style={styles.cardText}>{item}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Page>
            <View style={styles.container}>
                <SimpleForm
                    keys={InviteUserFormKeys}
                    onSubmit={async ({ email }) => handleInvite(email)}
                    submitLabel='Invite'
                />
            </View>
            {household.users && (
                <View style={{ paddingTop: 5 }}>
                    <FlatList
                        data={household.users}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ItemView}
                    />
                </View>
            )}
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        marginVertical: 5,
    },
    itemContainer: {
        //flex : 1,
        //backgroundColor : 'yellow',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        marginRight: 2,
        height: 17.5,
        marginTop: 30,
    },
    buttonPos: {
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        fontSize: 12,
        borderColor: 'gray',
        padding: 10,
        height: 40,
        width: 300,
        marginBottom: 15,
        marginTop: 9,
    },
    inputMulti: {
        borderWidth: 1,
        fontSize: 12,
        borderColor: 'gray',
        padding: 10,
        height: 60,
        width: 300,
        marginBottom: 12,
        marginTop: 4,
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
    cardText: {
        fontWeight: 'bold',
    },
    textContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20,
    },
});

export default InvitePage;
