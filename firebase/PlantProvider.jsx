import _ from 'lodash';
import { firestore, storage } from './firebase';

// PLANT DATA DEFINITION:
// name: name of plant
// decsription: description of plant
// lastWater: DateTime/Timestamp of when last watered
// imageURL: URL pointing to image in firebase storage

const imageStore = storage.refFromURL('gs://myhouseplants-development.appspot.com/Images');

const getImageID = (imageURL) => {
    const sections = imageURL.split('/');
    const id = _.last(sections).split('.')[0];

    return id;
};

export const getPlants = async (householdID) => {
    return (
        await firestore.collection('Plants').where('householdID', '==', householdID).get()
    ).docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getPlantByID = async (plantID) => {
    return (await firestore.collection('Plants').doc(plantID).get()).data();
};

export const addPlant = async (plant) => {
    const imageName = getImageID(plant.imageURL);
    const imageResponse = await fetch(plant.imageURL);
    const imageData = await imageResponse.blob();
    const imageTaskSnapshot = await imageStore.child(`${imageName}.jpg`).put(imageData);
    const imageURL = await imageTaskSnapshot.ref.getDownloadURL();
    plant.imageURL = imageURL;

    console.log(plant.imageURL);

    return await firestore.collection('Plants').add(plant);
};

export const updatePlant = (plantID, data) => {
    return firestore.collection('Plants').doc(plantID).update(data);
};

export const deletePlant = (plantID) => {
    return firestore.collection('Plants').doc(plantID).delete();
};
