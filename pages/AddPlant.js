import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View ,TextInput,Keyboard,TouchableWithoutFeedback} from 'react-native';
import PlantContext from '../context/PlantContext';
import { Button } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddPlants = ({navigation}) =>{
    const {create} = useContext(PlantContext);
    const[title , setTitle] = useState('');
    const[content, setContent] = useState('');
    const[image, setImage] = useState('https://image.shutterstock.com/image-vector/no-image-available-icon-vector-260nw-1323742826.jpg');
    const[water,setWater] = useState('');

    return (
        <KeyboardAwareScrollView
        style = {{flex : 1,backgroundColor : 'white'}}
       >
        <View style = {styles.container}>
            <Text style = {styles.text}>Add</Text>
            <TextInput style = {styles.input} placeholder = "Title"
            returnKeyType={ 'done' }
            onChangeText = {(val) => setTitle(val)}/>
            <Text style = {styles.text}>Content</Text>
            <TextInput style = {styles.inputMulti} placeholder = "Content"
            onChangeText = {(val) => setContent(val)}
            multiline = {true}
            maxLength = {140}
            //numberOfLines = {2}
            keyboardType="default"
            returnKeyType={ 'done' }
            blurOnSubmit={true}
            onSubmitEditing={()=>{Keyboard.dismiss()}}
            ellipsizeMode={'tail'}/>
               <Button
             title = "Add Picture"
             style={styles.Btn}
             onPress = {() => {
                 navigation.navigate('Camera')
             }}
             />
            <TextInput style = {styles.input} placeholder = "image url"
            returnKeyType={ 'done' }
            onChangeText = {(val) => setImage(val)}/>
            <Text style = {styles.text}>Plant watered out of 5</Text>
            <TextInput
             style = {styles.input}
             keyboardType = 'number-pad'
             returnKeyType={ 'done' }
             onChangeText = {(val) => setWater(val.toString())}
             maxLength = {1}
            />
            <View style = {styles.buttonPos}>
            <Button 
                title = 'Sumbit'
                style={styles.Btn}
                onPress = {() => {
                     if(water == "" || water > 5){
                                alert("Water Count cannot be greater than 5 or empty")
                            }
                            else{
                                create(title,content,image,water, () => {navigation.navigate('Plants')})
                            }
                    
                }}
            />
            </View>
           </View>
         </KeyboardAwareScrollView>
    );
};


const styles = StyleSheet.create({
    container : {
        //flex :1,
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent :'center',
        //lexDirection : 'column',

    },
    itemContainer :{
      //flex : 1,
      //backgroundColor : 'yellow',
      justifyContent :'center',

    },
    text :{
        fontSize : 15,
        marginRight : 2,
        height : 17.5,
        marginTop :30,


    },
    buttonPos:
    {
        marginTop :30,
    },
    input: {
        borderWidth : 1,
        fontSize : 12,
        borderColor : 'gray',
        padding : 10,
        height : 40,
        width : 300,
        marginBottom : 15,
        marginTop : 9

    },
    inputMulti: {
        borderWidth : 1,
        fontSize : 12,
        borderColor : 'gray',
        padding : 10,
        height : 60,
        width : 300,
        marginBottom : 12,
        marginTop : 4

    }
});

export default AddPlants;