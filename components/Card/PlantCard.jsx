import React, { useContext, useEffect, useState } from 'react';
import PlantContext from '../../contexts/PlantContext'
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import { NavigationScreens } from '../../common/navigation';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const PlantCard = ({ plant,navigation }) => {

    const { state, remove } = useContext(PlantContext);
    const { Updating } = useContext(PlantContext);
    //const half = plant.description ? plant.description.substring(0, 100) : '';
    const dateS = new Date();
    console.log(new Date(plant.lastWatered).toDateString())
    console.log(plant.imageURL);
   
    return (
        <View style={styles.card}>
            <Card style={styles.card}>
                <Card.Content>
                    <ImageBackground
                        source={{ uri: plant.imageURL }}
                        style={styles.cardImage}
                        resizeMode='contain'
                    />
                    <Title style={styles.text}>{plant.name}</Title>
                    <Paragraph style={{ fontSize: 13, padding: 5, marginLeft: -5 }}>
                        {plant.description}
                    </Paragraph>
                </Card.Content>
                <View style={styles.icon}>
                    <TouchableOpacity
                        onPress={() => {
                            remove(plant.id);
                        }}
                    >
                        <MaterialCommunityIcons name='delete' size={26} color='red' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(NavigationScreens.EditPlant.name, {
                                id: plant.id,
                            });
                        }}
                    >
                        <MaterialCommunityIcons
                            name='tooltip-edit-outline'
                            size={26}
                            color='blue'
                        />
                    </TouchableOpacity>
                    <Button
                        title='Plant Watered?'
                        titleStyle={{
                            fontSize: 10,
                        }}
                        style={styles.buttonPos}
                        onPress={() => {
                            if (new Date(plant.lastWatered).toDateString() == dateS.toDateString()) {
                                alert('Plant Already Watered');
                            } else {
                                Updating(plant.id, plant.name, plant.description, plant.imageURL, dateS);
                            }
                        }}
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
        //borderWidth : 1,
        //borderRadius : 1,
        //borderColor : '#000',
        flex: 3,
        padding: 1,
        margin: 3,
        //backgroundColor : 'white'
    },
    cardImage: {
        aspectRatio: 1.1,
        borderWidth: 3,
        backgroundColor: '#000',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    icon: {
        //position: 'absolute',
        ///bottom:0,
        //right : 0,
        flex : 1,
        flexDirection : 'row',
        //flexGrow : 1,
        //justifyContent: 'flex-end'
        justifyContent: 'space-evenly',
        //backgroundColor : 'yellow',
    },
    buttonPos: {
        alignSelf: 'flex-end',
        
    },
});

export default PlantCard;
