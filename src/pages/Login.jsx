import React from 'react'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { loginRoute } from '../utils/AllRoutes';
function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", loginRoute)
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOption)
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                toast.success("User Created Sucessfully", toastOption);
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("Password is required",
                toastOption
            );
            return false;
        } else if (username === "") {
            toast.error("username and password required",
                toastOption
            );
            return false;
        } else if (password.length < 8) {
            toast.error("Password Should be equale or greater than 8 characters",
                toastOption
            );
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className="box">
                <span className="borderLine"></span>
                <form onSubmit={handleSubmit}>
                    <h2>Sign in Varta</h2>
                    <div className="inputBox">
                        <input type="text"
                            name='username'
                            required="required"
                            onChange={(e) => handleChange(e)} />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password"
                            name='password'
                            required="required" 
                            onChange={(e) => handleChange(e)}/>
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <Link href="/">Forgot Password</Link>
                        <Link href="/signup">Sign up</Link>
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Login