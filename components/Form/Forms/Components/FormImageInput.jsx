import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

const FormImageInput = ({ label, onChange, defaultValue }) => {
    return (
        <>
            {/* TODO: Add camera component here */}
            <View style={styles.cameraContainer}></View>
            <Button title={label} />
        </>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default FormImageInput;
