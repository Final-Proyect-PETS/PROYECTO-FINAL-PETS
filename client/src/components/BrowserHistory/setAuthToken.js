import axios from 'axios';


export const  setAuthToken  =  token =>  {
    console.log(token)
    if (token) {
        axios.defaults.headers.common["token"] = `${token}`;
        
    }
    else
        delete axios.defaults.headers.common["token"];
}