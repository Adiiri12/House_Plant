import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from 'react-native-elements';

const Select = ({ buttonTitle, data, onSelect, titleRenderer }) => {
    const [visible, setVisible] = useState(false);

    const handleButtonPress = () => {
        setVisible(true);
    };

    const handleSelect = (item, index) => {
        onSelect(item, index);
        setVisible(false);
    };

    return (
        <>
            <Button title={buttonTitle} onPress={handleButtonPress} type='clear' />
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

export default Select;
