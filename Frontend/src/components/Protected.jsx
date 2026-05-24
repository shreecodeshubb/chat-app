import {UserContext} from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom';
import CustomError from './CustomError.jsx';
import { useContext } from 'react';

function Protected({children}) {

const navigate = useNavigate();
  
const {User,loading} = useContext(UserContext);

if(loading) {
  return <h2>Loading.....!</h2>
}


if(!User){
return navigate("/login")
}



return children;
    

  
}

export default Protected