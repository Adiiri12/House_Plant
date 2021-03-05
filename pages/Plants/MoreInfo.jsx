import React, { useState, useContext,useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions,ImageBackground } from 'react-native';
import {Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import IdResults from '../../common/IdResults'
import { FlatList } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const MoreInfo = ({navigation,route}) => {
    const {id,title,photo,content,year,bibliography} = route.params;
    //console.log(date);
    //var description = content

    const[num , Num] = useState(id);
    const [getResult, result , errorMessage] = IdResults();
    const [images,setImages] = useState([])
    const count = 0;

    useEffect(()=>{
        getResult(id);
        //console.log
        
        
    },[])
  
  //console.log(result.data?.id) // this works 


    // for (count; count < images.length; count++) {
    //   console.log(count)
    // }

    // console.log(images)
    
    //console.log(Object.keys(result.data.images.flower).length);
    //console.log(photo)
    return (
        <View styles = {styles.container}>
          <Card style = {styles.card}>
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
            <Title style = {styles.text}>Specifications</Title>
            <Paragraph>Average Height : {result.data?.specifications?.average_height?.cm}</Paragraph>
            <Paragraph>Maximum Height : {result.data?.specifications?.maximum_height?.cm}</Paragraph>
            <Title style = {styles.text}>Growth</Title>
            <Paragraph>Ph Maximum : {result.data?.growth.ph_maximum}</Paragraph>
            <Paragraph>Ph Minimum : {result.data?.growth.ph_minimum}</Paragraph>
            </Card.Content>
          </Card>
          <FlatList
            data = {result.data} // and this doesn't
            //extraData={result.data}
            keyExtractor = {e => e.id}
            renderItem = {({ item  , index}) =>  {
              console.log(item?.id)
              console.log('hello')  // there is an array of images availble to view however flatlist is not working
              return(
                <Text>Yo</Text>

              )
            }}
          />
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
          height : windowHeight/3.3,
          width : windowWidth/1.02,
          backgroundColor : '#000'
       },
       cardImages :{
         //flex :1,
         flexDirection : 'row',
         //flex : 1,
         aspectRatio :3,
         borderWidth: 3,
         borderColor : 'grey',
        //backgroundColor : '#000'
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


