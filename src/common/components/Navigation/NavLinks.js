import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import "./NavLinks.css"
import {LoginContext} from "../context"




const NavLinks=()=>{
       const loggedin=useContext(LoginContext);
    return (
        <ul className="navlinks">
            <li> 
                   <NavLink to ="/"exact>Everyone</NavLink>
            </li>
            {loggedin.isloggedin && (
            <li> 
                   <NavLink to ={`/${loggedin.userID}/locations`}>My Locations</NavLink>
            </li>
               )}
               {loggedin.isloggedin &&(
            <li> 
                   <NavLink to ="/locations/new">Add Locations</NavLink>
            </li>
            )}
            {!loggedin.isloggedin &&( 
            <li> 
                   <NavLink to ="/login">Sign In/Up</NavLink>
            </li>
            )}
            {loggedin.isloggedin &&(
              <button onClick={loggedin.logout}>Log Out</button>
            )}
        </ul>
    )
};

export default NavLinks;