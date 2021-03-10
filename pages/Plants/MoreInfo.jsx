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
  
  console.log(result.data) // this works 


    // for (count; count < images.length; count++) {
    //   console.log(count)
    // }

    // console.log(images)
    
    //console.log(Object.keys(result.data.images.flower).length);
    //console.log(photo)
    return (
      <ScrollView>
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
            <Paragraph>Average Height : {result.data?.specifications?.average_height?.cm  ? result.data?.specifications?.average_height?.cm :'unknown' }</Paragraph>
            <Paragraph>Maximum Height : {result.data?.specifications?.maximum_height?.cm ? result.data?.specifications?.maximum_height?.cm :'unknown' }</Paragraph>
            <Title style = {styles.text}>Growth</Title>
            <Paragraph>Ph Maximum : {result.data?.growth.ph_maximum ? result.data?.growth.ph_maximum:'unknown' }</Paragraph>
            <Paragraph>Ph Minimum : {result.data?.growth.ph_minimum ? result.data?.growth.ph_minimum:'unknown' }</Paragraph>
            <Title style = {styles.text}>More Flower Images</Title>
            <FlatList
            data = {result.data?.images?.flower.slice(0,6)} // and this doesn't
            //extraData={result.data}
            keyExtractor = {e => e.id}
            numColumns = {3}
            renderItem = {({ item  , index}) =>  {
              console.log(item.image_url)
              //console.log('hello')  // there is an array of images availble to view however flatlist is not working
              return(
                <ImageBackground
             source ={{uri :item.image_url}}
             style = {styles.cardImages}
             resizeMode = 'cover'
            />

              )
            }}
          />
            </Card.Content>
          </Card>
        </View>
        </ScrollView>
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
            height : windowHeight,
            padding :1,
            margin : 3,
       },
       cards : {
        //borderWidth : 1,
        borderRadius : 5,
        borderColor : '#000',
        width : windowWidth/1.2,
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
         //flexDirection : 'row',
         //flex : 1,
        // aspectRatio :1,
         marginRight : 8,
         marginBottom : 3,
          width : 120,
          aspectRatio : 1,
          borderWidth:1,
          borderColor : 'grey',
        //backgroundColor : 'grey'
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


