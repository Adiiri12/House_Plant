import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View,Dimensions,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Animated} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlantContext from '../../contexts/PlantContext';
import { NavigationScreens } from '../../common/navigation';
import WaterIcon from "./PlantsComponent/WaterIcon"
import { Button } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 const MyPlantsPage = ({navigation}) => {
  const {state, remove} = useContext(PlantContext);
  const { water} = useContext(PlantContext);

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
 
  const dateS = new Date()


   return (
   
      <View style = {styles.container}>
            <FlatList
                data = {state}
                numColumns = {2}
				keyExtractor = {(element) =>{ 
					return element.id.toString();
				}}
                  renderItem = {({item}) => {
                      console.log(item.date.toDateString())
                      console.log(dateS.toDateString())
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
                                     <Paragraph style = {{fontSize : 13 ,padding : 5}}>{item.content}</Paragraph>
								</Card.Content>
                                <View style = {styles.icon} >
                                     <TouchableOpacity  onPress={() => {
									    remove(item.id);
								        }}>
                                        <MaterialCommunityIcons name="delete" size={26} color="red"/>
								    </TouchableOpacity>
                                    <TouchableOpacity  onPress={() => {
									    navigation.navigate("editplant",{
                                        id : item.id
                                        });
								    }}>
                                       
                                        <MaterialCommunityIcons  name="tooltip-edit-outline" size={26} color="blue"/>
								    </TouchableOpacity>
                                    <Button
							            title='Plant Watered ?'
                                        titleStyle={{
                                            fontSize : 10
                                        }}
                                        style = {styles.buttonPos}
							            onPress={() => {
							            	if (item.date.toDateString() == dateS.toDateString()) {
									        alert('Plant Already Watered');
								            } else {
									        water(dateS)
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
          height : windowHeight/4,
          //width :windowWidth/6,
          backgroundColor : '#000'
       },
       text : {
         fontWeight : 'bold',
         fontSize : 25,
       },
       icon :{
        //position: 'absolute',
        ///bottom:0,
        //right : 0,
        flexDirection : "row",
        //alignSelf : "flex-start"
        justifyContent: 'space-evenly',
       },
       buttonPos: {
        alignSelf: "flex-end",
    },
    }
);

export default MyPlantsPage;