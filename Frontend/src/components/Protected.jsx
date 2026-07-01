import { UserContext } from '../context/context.js';
import { Navigate } from 'react-router-dom';
import CustomError from './CustomError.jsx';
import { useContext } from 'react';
import Loading from "../components/Loading.jsx"

function Protected({children}) {
  
const {user,loading} = useContext(UserContext);

if(loading) {
  return <Loading/>
}

console.log(user)

if(!user){
  return  <Navigate to="/login"  />
}


return children;
    

  
}

export default Protected