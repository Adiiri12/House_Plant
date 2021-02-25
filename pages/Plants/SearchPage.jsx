import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text,View,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Page from '../Page';


const Search = ({ navigation }) => {
    const[search , setSearch] = useState('');
    return (
        <Page>
            <View style = {styles.container}>
              <View style={styles.input}>
                 <TextInput
                    style = {styles.inputbox}
                    placeholder='Title'
                    returnKeyType={'done'}
                    onChangeText={(val) => setSearch(val)}
                />
                <Button
                 title='Search'
                 style = {{marginTop : 5}}
                />
             </View>
            </View>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    input:{
        flex :1, 
        flexDirection:'row', 
        justifyContent : 'flex-start' ,
        //backgroundColor : 'yellow'

    },
    inputbox:{
        borderWidth: 1,
        fontSize: 12,
        borderColor: 'gray',
        padding: 5,
        height: 40,
        width: 300,
        marginRight :8,
        marginTop : 5
    }
});

export default Search;
