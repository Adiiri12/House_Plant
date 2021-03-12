import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../../contexts/PlantContext';
import { NavigationScreens } from '../../common/navigation';
import { useHouseholdStorage } from '../../firebase/HouseholdProvider';
import { getPlants, usePlantStorage } from '../../firebase/PlantProvider';
import PlantCard from '../../components/Card/PlantCard';
import _ from 'lodash';
import { Alert } from 'react-native';
import { RefreshControl } from 'react-native';
import { Button } from 'react-native-elements';

const MyPlantsPage = ({ navigation, route }) => {
    const { householdID } = route.params;
    const [plants, setPlants] = useState([]);
    const [loadingPlants, setLoadingPlants] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(NavigationScreens.AddPlant.name, { householdID })
                    }
                >
                    <MaterialCommunityIcons
                        name='arrow-up-bold-box-outline'
                        color='#62BD69'
                        size={30}
                    />
                </TouchableOpacity>
            ),
        });

        loadPlants();
    }, []);

    const loadPlants = async () => {
        try {
            setLoadingPlants(true);
            const plants = householdID ? await getPlants(householdID) : [];
            setPlants(plants);
        } catch (err) {
            Alert.alert(err.message);
        } finally {
            setLoadingPlants(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title='Manage Users'
                type='outline'
                onPress={() => navigation.navigate(NavigationScreens.Invite.name, { householdID })}
                style={{ margin: 5, marginTop: 10, backgroundColor: '#fff' }}
            />
            <FlatList
                data={plants}
                numColumns={2}
                keyExtractor={(element) => element.id.toString()}
                renderItem={({ item }) => (
                    <PlantCard
                        plant={item}
                        navigation={navigation}
                        //onRefresh={() => setLoadingPlants(true)}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={loadingPlants} onRefresh={loadPlants} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flexDirection : "row",

        flex: 1,
        //backgroundColor : "blue"
        borderRadius: 5,
    },
});

export default MyPlantsPage;
