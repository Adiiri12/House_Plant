import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../../contexts/PlantContext';
import { NavigationScreens } from '../../common/navigation';
import { useHouseholdStorage } from '../../firebase/HouseholdProvider';
import { usePlantStorage } from '../../firebase/PlantProvider';
import PlantCard from '../../components/Card/PlantCard';
import _ from 'lodash';

const MyPlantsPage = ({ navigation }) => {
    // const { households } = useHouseholdStorage();
    // const { plants } = usePlantStorage();
    const { state } = useContext(PlantContext);

    // const [currentHousehold, setCurrentHousehold] = useState(
    //     households && !_.isEmpty(households) ? households[0] : null
    // );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(NavigationScreens.AddPlant.name)}
                >
                    <MaterialCommunityIcons
                        name='arrow-up-bold-box-outline'
                        color='#62BD69'
                        size={30}
                    />
                </TouchableOpacity>
            ),
        });
    }, []);

    // if (!households || _.isEmpty(households)) {
    //     return (
    //         <View>
    //             <Text>No Households</Text>
    //         </View>
    //     );
    // }

    // if (!plants || _.isEmpty(plants)) {
    //     return (
    //         <View>
    //             <Text>No Plants</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            {/* <Select
                buttonTitle={currentHousehold.name}
                data={households}
                titleRenderer={(item) => item.name}
                onSelect={(item, i) => setCurrentHousehold(item)}
            /> */}
            {/* <FlatList
                data={plants.filter((plant) => plant.householdID === currentHousehold.id)}
                keyExtractor={(element) => element.id.toString()}
                renderItem={({ item }) => <PlantCard plant={item} />}
            /> */}
            <FlatList
                data={state}
                numColumns={2}
                keyExtractor={(element) => element.id.toString()}
                renderItem={({ item }) => <PlantCard plant={item} navigation={navigation} />
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
