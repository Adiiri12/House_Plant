import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import FormTextInput from './FormTextInput';

const FormSelect = ({ label, data, onChange, titleRenderer }) => {
    const [visible, setVisible] = useState(false);

    const handleButtonPress = () => {
        setVisible(true);
    };

    const handleSelect = (item, index) => {
        onChange(item, index);
        setVisible(false);
    };

    return (
        <>
            <Button title={label} onPress={handleButtonPress} />
            <BottomSheet isVisible={visible}>
                {data.map((item, index) => (
                    <ListItem key={index} onPress={() => handleSelect(item, index)}>
                        <ListItem.Content>
                            <ListItem.Title>{titleRenderer(item)}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </>
    );
};

export default FormSelect;
