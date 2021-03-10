import { firestore, auth } from './firebase';

export const getHouseholds = async (email) => {
    return (
        await firestore.collection('Households').where('users', 'array-contains', email).get()
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

export const inviteUserToHousehold = async (householdID, email) => {
    const household = await getHouseholdByID(householdID);
    return await firestore
        .collection('Households')
        .doc(householdID)
        .update({ users: [...household.users, email] });
};

export const removeUserFromHousehold = async (householdID, email) => {
    const household = await getHouseholdByID(householdID);
    const users = household.users.filter((value) => value != email);
    return await firestore.collection('Households').doc(householdID).update({ users });
};

export const deleteHousehold = (householdID) => {
    return firestore.collection('Households').doc(householdID).delete();
};
