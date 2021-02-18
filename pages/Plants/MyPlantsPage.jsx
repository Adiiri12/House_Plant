import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Dimensions,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Animated} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../../contexts/PlantContext';
import { NavigationScreens } from '../../common/navigation';
import WaterIcon from "./PlantsComponent/WaterIcon"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 const MyPlantsPage = ({navigation}) => {
  const {state, remove} = useContext(PlantContext);

 	 useEffect(() => {
		navigation.setOptions({
			headerRight: () =>(
				<TouchableOpacity onPress = {() => navigation.navigate(NavigationScreens.AddPlant.name)}>
						<MaterialCommunityIcons name="arrow-up-bold-box-outline" color={'green'} size={30}
					/>
					</TouchableOpacity>
			)

		});
    },[]);

    //let waters = []
    
    // this for eventually creating a review like system for watering
 



   return (
   
      <View style = {styles.container}>
            <FlatList
                data = {state}
                numColumns = {2}
				keyExtractor = {(element) =>{ 
					return element.id.toString();
				}}
                  renderItem = {({item}) => {
					return (
						<View style = {styles.card}>
							<Card  style = {styles.card}> 
								<Card.Content>
									<ImageBackground
										source ={{uri: item.image}}
										style = {styles.cardImage}
										resizeMode="contain"
									/>
									<Title style = {styles.text}>{item.title}</Title>
                                    <Paragraph style = {{flexDirection : "row"}}></Paragraph>
								</Card.Content>
                                <View style = {styles.icon} >
                                     <TouchableOpacity style = {styles.icon} onPress={() => {
									    remove(item.id);
								        }}>
                                        <MaterialCommunityIcons name="delete" size={24} color="red"/>
								    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.icon} onPress={() => {
									    navigation.navigate("editplant",{
                                        id : item.id
                                        });
								    }}>
                                        <MaterialCommunityIcons  name="tooltip-edit-outline" size={24} color="blue"/>
								    </TouchableOpacity>
                                </View>
							</Card>
						</View>
					);
               }}
       		/>
    	</View>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            //flexDirection : "row",
         
            flex : 1,
            //backgroundColor : "blue"
        },
         cards :{
             flex : 1,
             //backgroundColor : 'yellow',
             //justifyContent :'center',
             //flexDirection : 'row-reverse',
         },
         card : {
            //borderWidth : 1,
            //borderRadius : 1,
         //borderColor : '#000',
            flex : 3,
            padding :1,
            margin : 3,
            //backgroundColor : 'white'
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
        flexDirection : "row",
        alignItems : 'flex-end'
       },
    }
);

export default MyPlantsPage;