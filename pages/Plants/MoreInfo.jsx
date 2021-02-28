import React from 'react';
import { StyleSheet, Text, View,Dimensions,ImageBackground } from 'react-native';
import {Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MoreInfo = ({navigation,route}) => {
    const {title,photo,content,year,bibliography} = route.params;
    //console.log(date);
    //var description = content
    console.log(photo)
    return (
        <View styles = {styles.container}>
          <Card style = {styles.card}>
            <ScrollView>
            <ImageBackground
             source ={{uri :photo}}
             style = {styles.cardImage}
             resizeMode = 'stretch'
            />
            <Card.Content>
            <Title style = {styles.text}>{title}</Title>
            <Paragraph>the scientific name of the plant is:{content} and the year found
             was {year} and the bibliography is {bibliography}
            </Paragraph>
            </Card.Content>
            </ScrollView>
          </Card>     
        </View>
    );
}



const styles = StyleSheet.create({
        container:{
          flexDirection : "row",
          justifyContent: 'center',
          alignItems : 'center',
          alignContent : 'center',
          flex : 1,
          flexWrap : "wrap",
          flexGrow : 1


        },
        card : {
            //borderWidth : 1,
            borderRadius : 5,
            borderColor : '#000',
            width : windowWidth,
            height : windowHeight/1.5,
            padding :1,
            margin : 3,
       },
       cardImage :{
          height : windowHeight/3,
          width : windowWidth/1.02,
          backgroundColor : '#000'
       },
       text : {
         fontWeight : 'bold',
         fontSize : 14,
    
        
       },
       icon :{
        position: 'absolute',
        bottom:0,
        right : 0
       },
       
    }
);

export default MoreInfo;


