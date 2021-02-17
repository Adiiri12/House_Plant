import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View ,TextInput,Keyboard,TouchableWithoutFeedback} from 'react-native';
import PlantContext from '../context/PlantContext';

const AddPlants = ({navigation}) =>{
    const {create} = useContext(PlantContext);
    const[title , setTitle] = useState('');
    const[content, setContent] = useState('');
    const[image, setImage] = useState('https://image.shutterstock.com/image-vector/no-image-available-icon-vector-260nw-1323742826.jpg');
    const[watet,setWater] = useState('');

    return(
        <KeyboardAwareScrollView
        style = {{flex : 1,backgroundColor : 'white'}}
       >
        <View>
            <Text>Add Items</Text>
        </View>
      </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})

export default AddPlants;