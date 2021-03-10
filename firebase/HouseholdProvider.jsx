import { firestore, getRefData } from './firebase';

export const getHouseholds = async (userID) => {
    return (
        await firestore.collection('Households').where('users', 'array-contains', userID).get()
    ).docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getHouseholdByID = async (householdID) => {
    return (await firestore.collection('Households').doc(householdID).get()).data();
};

export const addHousehold = (household) => {
    return firestore.collection('Households').add(household);
};

export const updateHousehold = (householdID, data) => {
    return firestore.collection('Households').doc(householdID).update(data);
};

export const deleteHousehold = (householdID) => {
    return firestore.collection('Households').doc(householdID).delete();
};
