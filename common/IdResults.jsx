import React, {useState , useEffect} from 'react';
import plants from './PlantApi'

export default () =>{
    const [result,setResult] = useState([]);
    const [errorMessage , setErrorMessage] = useState('')
    const getResult = async (id) =>{
        const url = id
        try{
            setErrorMessage('')
            const response = await plants.get('/'+url+'/?', {
                params:{
                    token  : 'lnK6fYLoCXL0tq7E0o3ByRi6JRHNH-CtZxuTlAz4mi4',
                },
             });
           setResult(response.data);
            }catch(e){
            console.log(e);
            //console.log(plants)
            setErrorMessage('Error Something went wrong try again')
       }
   }
   return [getResult, result , errorMessage]
}