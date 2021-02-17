import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Dimensions,ImageBackground,TouchableOpacity} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../context/PlantContext';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 const Plants = ({navigation}) => {
  const {state, remove} = useContext(PlantContext);

  useEffect(() => {
    navigation.setOptions({
        headerRight: () =>(
            <TouchableOpacity onPress = {() => navigation.navigate('Add')}>
                 <MaterialCommunityIcons name="arrow-up-bold-box-outline" color={'green'} size={30}
               />
             </TouchableOpacity>
        )

    });
},[]);

   return (

      <View style = {styles.container}>
            <FlatList
          
          data = {state}
          keyExtractor = {(element) =>{ 
              return element.id.toString();
           }
       }

          renderItem = {({item}) => {
            let imageRender = <Text>no image</Text>;
            //console.log(item.image);
            if(item.image !== null || item.image !== ""){
                imageRender = <Card.Cover source={{uri :item.image}} style ={styles.cardImage} />
            }
            console.log(item)
            var half = item.content.substring(0,80);
           return (
               <View>
                       <Card style = {styles.card}>
                            <Card.Content>
                                        <ImageBackground
                                        source ={{uri :item.image}}
                                        style = {styles.cardImage}
                                        resizeMode="contain"
                                        />
                                        <Title style = {styles.text}>{item.title}</Title>
                                        <Paragraph style = {styles.text}>Plant watered: {item.water}</Paragraph>
                            </Card.Content>
                            <TouchableOpacity style = {styles.icon} onPress = {() => {
                                remove(item.id);
                            }}>
                                <MaterialCommunityIcons name = "delete" size = {24} color = "blue"/>
                            </TouchableOpacity>
                       </Card>
                       
               </View>
                     
                   );
               }
           }
       />
    </View>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            //flexDirection : "row",
            alignItems : 'flex-start',
            alignContent : 'center',
            justifyContent :'center',
            flex : 1,
            flexWrap : "wrap"
        },
         cards :{
             flex : 1,
             //backgroundColor : 'yellow',
             //justifyContent :'center',
             //flexDirection : 'row-reverse',
             alignItems : 'center',
             justifyContent :'center',
         },
         card : {
            borderWidth : 1,
            borderRadius : 1,
            borderColor : '#000',
            width : windowWidth,
            height : windowHeight/2,
            padding :1,
            margin : 3,
            backgroundColor : 'white'
       },
       cardImage :{
          height : windowHeight/2.95,
          //width :windowWidth/1.01,
          backgroundColor : '#000'
       },
       text : {
         fontWeight : 'bold',
         fontSize : 10,
    
        
       },
       icon :{
        //position: 'absolute',
        ///bottom:0,
        //right : 0,
        padding:5,
        alignItems : 'flex-end'
       },
         

    }
);

export default Plants;