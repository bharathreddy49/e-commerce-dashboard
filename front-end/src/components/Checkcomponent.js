//import react from 'react'
import { Navigate, Outlet} from 'react-router-dom'
// Both will check that they both will check if user is Logged in then user can visit that page if not directed to sign up
const Checkcomponent= ()=>{
    const auth = localStorage.getItem('user');
    
    return auth?<Outlet /> :<Navigate to="signup" />
}

export default  Checkcomponent;