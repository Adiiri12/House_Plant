import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext,useEffect } from 'react';
import { StyleSheet, Text,View,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Page from '../Page';
import SearchCard from '../../components/Card/SearchCard';
import { FlatList } from 'react-native-gesture-handler';
import useSearchResults from '../../common/SeachResults'








const Search = ({ navigation }) => {
    const[search , setSearch] = useState('rose');
    const [getResult, result , errorMessage] = useSearchResults();

    useEffect(()=>{
        getResult(search);
    },[])
    //console.log(result);  //This works Shows you all the output of the search



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
                 onPress={() => {
                    getResult(search);
                }}
                />
             </View>
             <View
             style = {{flex:1,backgroundColor:'yellow',marginTop:5}} //colour used to see where the flex container are
             >
             <FlatList
                style = {{flex:1,backgroundColor:'yellow'}}
                data={result}
                //numColumns={2}
                keyExtractor={(element) => element.id.toString()}
                renderItem={({ item }) =>  <SearchCard plant={item} navigation={navigation}/>}
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
        padding: 10,
        flexDirection:'row', 
        justifyContent : 'flex-start' ,
        backgroundColor : 'yellow'

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
