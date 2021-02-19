import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import PlantContext from '../../contexts/PlantContext';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Page from '../Page';
import { NavigationScreens } from '../../common/navigation';

const EditPlantPage = ({ navigation, route }) => {
    const { id } = route.params;
    const dateS = new Date();
    const { state, Updating } = useContext(PlantContext);
    const currentId = state.find((e) => e.id === id);
    const [title, setTitle] = useState(currentId.title);
    const [content, setContent] = useState(currentId.content);
    const [image, setImage] = useState(currentId.image);
    const [date, setDate] = useState(dateS);

    return (
        <Page>
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>Add</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        placeholder='Title'
                        returnKeyType={'done'}
                        onChangeText={(val) => setTitle(val)}
                    />
                    <Text style={styles.text}>Content</Text>
                    <TextInput
                        style={styles.inputMulti}
                        value={content}
                        placeholder='Content'
                        onChangeText={(val) => setContent(val)}
                        multiline={true}
                        maxLength={140}
                        //numberOfLines = {2}
                        keyboardType='default'
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                        ellipsizeMode={'tail'}
                    />
                    <Button
                        title='Add Picture'
                        style={styles.Btn}
                        onPress={() => {
                            navigation.navigate(NavigationScreens.Camera.name);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        value={image}
                        placeholder='image url'
                        returnKeyType={'done'}
                        onChangeText={(val) => setImage(val)}
                    />
                    <Text style={styles.text}>Date Watered</Text>
                    <TextInput style={styles.input} value={dateS.toDateString()} />
                    <View style={styles.buttonPos}>
                        <Button
                            title='Sumbit'
                            style={styles.Btn}
                            onPress={() => {
                                console.log('update');
                                Updating(currentId.id, title, content, image, date, () => {
                                    navigation.navigate(NavigationScreens.Plants.name);
                                });
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Page>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex :1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //lexDirection : 'column',
        borderRadius: 5,
    },
    itemContainer: {
        //flex : 1,
        //backgroundColor : 'yellow',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        marginRight: 2,
        height: 17.5,
        marginTop: 30,
    },
    buttonPos: {
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        fontSize: 12,
        borderColor: 'gray',
        padding: 10,
        height: 40,
        width: 300,
        marginBottom: 15,
        marginTop: 9,
    },
    inputMulti: {
        borderWidth: 1,
        fontSize: 12,
        borderColor: 'gray',
        padding: 10,
        height: 60,
        width: 300,
        marginBottom: 12,
        marginTop: 4,
    },
});

export default EditPlantPage;
