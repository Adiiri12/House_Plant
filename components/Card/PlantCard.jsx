import React, { useEffect, useState } from 'react';
import PlantContext from '../../contexts/PlantContext';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button, Divider } from 'react-native-elements';
import { NavigationScreens } from '../../common/navigation';
import { Alert } from 'react-native';
import { deletePlant, updatePlant } from '../../firebase/PlantProvider';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

const PlantCard = ({ plant, navigation, onRefresh }) => {
    const today = new Date().toDateString();
    // useEffect(() => {
    //     if (isSameDay(new Date(plant.lastWatered), new Date(today))) {
    //         setWater(true)
    //     }
    //     console.log(water)
    //     console.log(plant.lastWatered)
    //     console.log(today)
    //     console.log(plant)
    // }, []);
    
    const handleUpdateWatered = async () => {
        if (isSameDay(new Date(plant.lastWatered), new Date(today))) {
            Alert.alert(
                'Already Watered',
                'This plant has already been watered today. Still continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await updatePlant(plant.id, {
                                lastWatered: today,
                            });
                        },
                    },
                ]
            );
        } else {
            await updatePlant(plant.id, {
                lastWatered: today,
            });
        }

        //onRefresh();
    };

    const handleDelete = async () => {
        Alert.alert('Delete Plant', 'Are you sure you want to delete this plant?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    await deletePlant(plant.id);
                },
            },
        ]);
        //onRefresh();
    };

    return (
        <View style={styles.card}>
            <Card style={styles.card}>
                <Card.Content>
                    <ImageBackground
                        source={{ uri: plant.imageURL }}
                        style={styles.imageCard}
                        resizeMode='contain'
                        imageStyle={styles.cardImage}
                        onLoadEnd={plant.imageURL}
                    />
                    <Title style={styles.text}>{plant.name}</Title>
                    <Paragraph style={{ fontSize: 13, padding: 5, marginLeft: -5 }}>
                        {plant.description}
                    </Paragraph>
                    <Divider />
                    <Paragraph style={{ fontSize: 13, padding: 5, marginLeft: -5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Last watered</Text>:{' '}
                        {plant.lastWatered  ? plant.lastWatered : 'No data click button'}
                    </Paragraph>
                </Card.Content>
                <View style={styles.icon}>
                    <Button
                        title='Water'
                        icon={
                            <Ionicons
                                name={ 'water'}
                                size='26'
                                color='#abcdef'
                                style={{ marginRight: 10 }}
                            />
                        }
                        type='outline'
                        onPress={handleUpdateWatered}
                        style={styles.cardButton}
                    />
                    <Button
                        title='Edit'
                        icon={
                            <Ionicons
                                name='pencil'
                                size={26}
                                color='#cdcdcd'
                                style={{ marginRight: 10 }}
                            />
                        }
                        type='outline'
                        onPress={() =>
                            navigation.navigate(NavigationScreens.EditPlant.name, {
                                plantID: plant.id,
                            })
                        }
                        style={styles.cardButton}
                    />
                    <Button
                        title='Delete'
                        icon={
                            <Ionicons
                                name='trash'
                                size={26}
                                color='#efabcd'
                                style={{ marginRight: 10 }}
                            />
                        }
                        type='outline'
                        onPress={handleDelete}
                        style={styles.cardButton}
                    />
                </View>
            </Card>
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
    cards: {
        flex: 1,
        //backgroundColor : 'yellow',
        //justifyContent :'center',
        //flexDirection : 'row-reverse',
    },
    card: {
        flex: 3,
        padding: 1,
        margin: 3,
    },
    cardButton: {
        margin: 5,
    },
    cardButtonText: {},
    imageCard: {
        aspectRatio: 1.1,
        padding: 5,
    },
    cardImage: {
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        //position: 'absolute',
        ///bottom:0,
        //right : 0,
        flex: 1,
        flexDirection: 'column',
        //flexGrow : 1,
        //justifyContent: 'flex-end'
        justifyContent: 'flex-end',
        // backgroundColor: 'yellow',
        padding: 10,
    },
    buttonPos: {
        alignSelf: 'flex-end',
    },
});

export default PlantCard;
