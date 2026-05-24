import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();


const UserProvider = ({children}) =>{

const [User, setUser] = useState(null);
const [allUser, setAllUser ] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);


useEffect(()=>{
      const currentUser = async()=>{
        try {
           const res = await axios.get("http://localhost:3000/api/myUser", {
            withCredentials:true,
           }) 
           setUser(res.data)
        } catch (error) {
            console.log("Error of fetching current user", error);
            setError(true)
            setUser(null);
        }

        finally{
            setLoading(false)
        }
        
      } 

      currentUser();
},[])    

useEffect(()=>{
    const fetchAllUser = async()=>{
        try {
            const res = await axios.get("http://localhost:3000/api/allUsers", {
                withCredentials:true,
            })

            setAllUser(res.data);

        } catch (error) {
            
            console.log("error while fetching all users ");
            setError(true)
            setAllUser(null);
        }
    }
    fetchAllUser();
},[]);






return <UserContext.Provider value={{User,setUser,loading,allUser,setAllUser}}>
    {children}
</UserContext.Provider>

}


export default UserProvider;
