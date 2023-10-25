import React, { useState, useContext } from "react";
import { LoginContext } from "../../common/components/context";
import "./register.css";

const Register = () => {
 const loggedin = useContext(LoginContext);
 const [error, setError] = useState(null);
 const [newuser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
 });

 const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newuser.name,
          email: newuser.email,
          password: newuser.password,
        }),
      });
      const responseData = await response.json();
      console.log("Register page :", responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      loggedin.login(responseData.message._id);
    } catch (err) {
      alert(err.message, () => {
        setError(null);
      });
      setError(err.message);
    }
 };

 const changeHandler = (event) => {
    const inputname = event.target.name;
    const newValue = event.target.value;
   
    setNewUser((previousValue) => {
       if (inputname === "newuser.name") {
         return {
           ...previousValue,
           name: newValue,
         };
       } else if (inputname === "newuser.email") {
         return {
           ...previousValue,
           email: newValue,
         };
       } else if (inputname === "newuser.password") {
         return {
           ...previousValue,
           password: newValue,
         };
       }
    });
 };

 return (
    <form className="login-form" onSubmit={submitHandler}>
          <div className="form-control">
        <label>
          Name
          <input
            name="newuser.name"
            type="text"
            required
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="form-control">
        <label>
          Email
          <input
            name="newuser.email"
            type="email"
            required
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="form-control">
        <label>
          Password
          <input
            name="newuser.password"
            type="password"
            required
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="form-control">
        <button>Submit</button>
      </div>
    </form>
 );
};

export default Register;