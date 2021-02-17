import React, {useReducer,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = "plant_storage";

const PlantContext = React.createContext();

const plant = (state,action) =>{
    switch(action.type){
        case 'addPlant':
            return [
                ...state,
                {
                  id : Math.floor(Math.random()*999999),
                  title : action.payload.title,
                  content : action.payload.content,
                  image : action.payload.image,
                  water: action.payload.water
                }
             ];
             case 'Update':
                return state.map((e)=>{
                if(e.id === action.payload.id)
                {
                  return action.payload;
                }
                else{
                   return e;
                }
             });
             case 'Delete':
                return state.filter((e) => e.id !== action.payload.id);
             case 'SaveData':
                try{
                   AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
                }catch(e){
                   console.log(e);
                }finally{
                   return state;
                }
                case 'LoadData':
                    return [
                       ...state,
                       {
                         id :action.payload.id,
                         title : action.payload.title,
                         content : action.payload.content,
                         image : action.payload.image,
                         water : action.payload.water
                       }
                    ];
              default:
          return state;
    };
}

const Myplants = [

]

export const PlantProvider = ({children}) =>{
    const [state,dispatch] = useReducer(plant,Myplants);
    useEffect(() => {
       const loadStorage = async() =>{
          const storage = await AsyncStorage.getItem(STORAGE_KEY);
          if(storage !== null && state.length === 0){
             let initialState = JSON.parse(storage);
             initialState.forEach(element => {
                dispatch({type : 'LoadData' , payload : element});
             });
          }
       }
       loadStorage();
    }, [STORAGE_KEY]);  // Persistant Storage until we move it to external storage 

    const addPlant = (title,content,uri,water,callback) =>{
        dispatch ({type : 'AddEntry', payload : {title,content,image:uri,water}});
        dispatch({type : 'SaveData' });
        if(callback){
           callback();
        }
     };

     const updatePlant = (title,content,uri,water,callback) =>{
        dispatch ({type : 'Update', payload : {title,content,image:uri,water}});
        dispatch({type : 'SaveData' });
        if(callback){
           callback();
        }
     };

     const deletePlant = (id , callback) =>{
        dispatch({type : 'Delete', payload : {id : id}});
        dispatch({type : 'SaveData' });
        if(callback){
            callback();
        }
    };

    return(
        <PlantContext.Provider value = {{
           state:state,
           create : addPlant,
           update : updatePlant,
           remove : deletePlant,
           }}>
         {children}
        </PlantContext.Provider>
  );

};

export default PlantContext; 