import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import PlantContext from '../../contexts/PlantContext';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Page from '../Page';
import { NavigationScreens } from '../../common/navigation';
import { useHouseholdStorage, useStorage } from '../../firebase/HouseholdProvider';
import { usePlantStorage } from '../../firebase/PlantProvider';
import SimpleForm from '../../components/Form/SimpleForm';
import AddPlantFormKeys from '../../forms/AddPlantFormKeys';

const EditPlantPage = ({ navigation, route }) => {
    const { id } = route.params;
    const dateS = new Date();
    const { state, Updating } = useContext(PlantContext);
    const currentId = state.find((e) => e.id === id);

    return (
        <Page>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <SimpleForm
                        keys={AddPlantFormKeys}
                        // context={{ households }}p
                        onSubmit={({
                            name: name,
                            description: description,
                            imageURL: imageURL,
                            lastWatered: lastWatered,
                        }) => Updating(currentId.id,name, description, imageURL, lastWatered,()=>{
                            navigation.navigate(NavigationScreens.Plants.name);  
                        })}
                        initialData={{ 
                            name: currentId.name,
                            description: currentId.description,
                            imageURL: currentId.imageURL,
                            lastWatered: currentId.lastWatered
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
