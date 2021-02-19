import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../../contexts/PlantContext';
import { NavigationScreens } from '../../common/navigation';
import WaterIcon from './PlantsComponent/WaterIcon';
import { Button } from 'react-native-elements';
import { useTheme } from 'react-navigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyPlantsPage = ({ navigation }) => {
    const theme = useTheme();

    const { state, remove } = useContext(PlantContext);
    const { Updating } = useContext(PlantContext);

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

    //let waters = []

    // this for eventually creating a review like system for watering

    const dateS = new Date();

    return (
        <View style={styles.container}>
            <FlatList
                data={state}
                numColumns={2}
                keyExtractor={(element) => {
                    return element.id.toString();
                }}
                renderItem={({ item }) => {
                    console.log("save data is"+item.date.toDateString());
                    console.log( "the date is"+dateS.toDateString());
                    console.log(item)
                    var half = item.content.substring(0,80);
                    return (
                        <View style={styles.card}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <ImageBackground
                                        source={{ uri: item.image }}
                                        style={styles.cardImage}
                                        resizeMode='contain'
                                    />
                                    <Title style={styles.text}>{item.title}</Title>
                                    <Paragraph style={{ fontSize: 13, padding: 5,marginLeft : -5 }}>
                                        {half}<Text style = {{color : 'blue'}}> Read more</Text>
                                    </Paragraph>
                                </Card.Content>
                                <View style={styles.icon}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            remove(item.id);
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name='delete'
                                            size={26}
                                            color='red'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('editplant', {
                                                id: item.id,
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
                                        title='Plant Watered ?'
                                        titleStyle={{
                                            fontSize: 10,
                                        }}
                                        style={styles.buttonPos}
                                        onPress={() => {
                                            if (item.date.toDateString() == dateS.toDateString()) {
                                                alert('Plant Already Watered');
                                            } else {
                                                Updating(item.id,item.title,item.content,item.image,dateS);
                                            }
                                        }}
                                    />
                                </View>
                            </Card>
                        </View>
                    );
                }}
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
        height: windowHeight / 4,
        //width :windowWidth/6,
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
        flexDirection: 'row',
        //flexGrow : 1,
        //justifyContent: 'flex-end'
        justifyContent: 'space-evenly',
    },
    buttonPos: {
        alignSelf: 'flex-end',
    },
});

export default MyPlantsPage;
