import React, {useState , useEffect} from 'react';
import plants from './PlantApi'

export default () =>{
    const [result,setResult] = useState([]);
    const [errorMessage , setErrorMessage] = useState('')
    const getResult = async (search) =>{
        try{
            setErrorMessage('')
            const response = await plants.get('/search?', {
                params:{
                    token  : 'lnK6fYLoCXL0tq7E0o3ByRi6JRHNH-CtZxuTlAz4mi4',
                    q : search,
                    limit  :10,

                },
             });
           setResult(response.data.data);
            }catch(e){
            console.log(e);
            setErrorMessage('Error Something went wrong try again')
       }
   }
   return [getResult, result , errorMessage]
}