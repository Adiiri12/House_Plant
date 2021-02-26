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



const SearchCard = ({search,navigation }) => {

    //const { state, remove } = useContext(PlantContext);
    //onst { Updating } = useContext(PlantContext);
    //const half = plant.description ? plant.description.substring(0, 100) : '';
    //const dateS = new Date();
    //console.log(plant.lastWatered.toUTCString())
   
    return (
        <View style={styles.card}>
            <Card style={styles.card}>
                <Card.Content>
                    <ImageBackground
                        source={{ uri: search.image_url }}
                        style={styles.cardImage}
                        resizeMode='contain'
                    />
                    <Title style={styles.text}>{search.common_name}</Title>
                    <Paragraph style={{ fontSize: 13, padding: 5, marginLeft: -5 }}>
                        <Text>Also called</Text>
                        {search.scientific_name}
                        <Text>Is a species of the {search.genus}</Text>
                    </Paragraph>
                </Card.Content>
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

export default SearchCard;
