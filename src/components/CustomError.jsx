import "./error.css";
import { Link } from "react-router-dom";
function CustomError() {
  return (
    <div className='error'>
        <h1>Something went wrong!! try again</h1>
           <Link to="/"><h4>Go to Register Page </h4></Link> 
                <h3>Or</h3>
                <Link to="/login"><h4>Go to login</h4></Link>
    </div>
  )
}

export default CustomError