import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext,useEffect } from 'react';
import { StyleSheet, Text,View,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Page from '../Page';
import SearchCard from '../../components/Card/SearchCard';
import { FlatList } from 'react-native-gesture-handler';
import useSearchResults from '../../common/SeachResults'








const Search = ({ navigation }) => {
    const[search , setSearch] = useState('a');
    const [getResult, result , errorMessage] = useSearchResults();

    useEffect(()=>{
        getResult(search);
    },[])
    console.log(result);



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
             <FlatList
                data={result}
                numColumns={2}
                keyExtractor={(element) => element.id}
                renderItem={({ item }) => console.log(item)}
                // <SearchCard search={item} navigation={navigation}
                // />
                />
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
