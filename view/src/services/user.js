import axios from 'axios';
import {API_BASE_URL,header} from './constante';


export const login = async (userName,password) =>{ 
  const payload = {
    userName,
    password
  } 
  let response = await axios.post(API_BASE_URL+'/user/login', payload)
  return response;
}

export const checkToken = async () =>{ 
  let response = axios.get(API_BASE_URL+'/user/self',header)
  console.log(header);
  return response;
}