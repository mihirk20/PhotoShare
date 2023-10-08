import React, { useContext, useState } from "react";
import "./Login.css";
import { LoginContext } from "../../common/components/context";
const Login = () => {
    const loggedin = useContext(LoginContext)
    const [error, setError] = useState(null);
    const [newlogin, setnewlogin] = useState({
        email: "",
        password: ""
    });
    const submitHandler = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: newlogin.email, password: newlogin.password })
            });
            const responseData = await response.json();
            console.log("credentials:", responseData);
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

        setnewlogin(previousValue => {
            if (inputname === "newloginemail") {
                return {
                    email: newValue,
                    password: previousValue.password
                }
            }
            if (inputname === "newloginpassword") {
                return {
                    email: previousValue.email,
                    password: newValue
                }
            }
        })
    }

    return (
        <form className="login-form" onSubmit={submitHandler}>
            <div className="form-control">
                <label>
                    Email
                    <input name="newloginemail"
                        type="email"
                        required
                        onChange={changeHandler} />
                </label>
            </div>
            <div className="form-control">
                <label>
                    Password
                    <input name="newloginpassword"
                        type="password"
                        required
                        onChange={changeHandler} />
                </label>
            </div>
            <div className="form-control">
                <button>Submit</button>
            </div>
        </form>
    )

}
export default Login;