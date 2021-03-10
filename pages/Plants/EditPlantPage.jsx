import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import PlantContext from '../../contexts/PlantContext';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Page from '../Page';
import { NavigationScreens } from '../../common/navigation';
import { getHouseholds } from '../../firebase/HouseholdProvider';
import { getPlantByID, updatePlant } from '../../firebase/PlantProvider';
import SimpleForm from '../../components/Form/SimpleForm';
import AddPlantFormKeys from '../../forms/AddPlantFormKeys';

const EditPlantPage = ({ navigation, route }) => {
    const { plantID } = route.params;

    const [plant, setPlant] = useState({});
    const [households, setHouseholds] = useState([]);

    useEffect(() => {
        loadHouseholds();
        loadPlant();
    }, []);

    const loadHouseholds = async () => {
        try {
            const households = await getHouseholds();
            setHouseholds(households);
        } catch (err) {
            Alert.alert(err.message);
        }
    };

    const loadPlant = async () => {
        try {
            const plant = await getPlantByID(plantID);
            setPlant(plant);
        } catch (err) {
            Alert.alert(err.message);
        }
    };

    return (
        <Page>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <SimpleForm
                        keys={AddPlantFormKeys}
                        context={{ households }}
                        onSubmit={async (plant) => await updatePlant(plantID, plant)}
                        initialData={{
                            hosueholdID: plant.householdID,
                            name: plant.name,
                            description: plant.description,
                            imageURL: plant.imageURL,
                            lastWatered: plant.lastWatered,
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
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
});

export default EditPlantPage;
