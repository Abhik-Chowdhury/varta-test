import React, { useState, useEffect } from 'react'
import '../css/signup.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { SignUpRoute } from '../utils/AllRoutes';
function SignUp() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState()

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            console.log("in validation", SignUpRoute)
            console.log(username, email, password);
            const { data } = await axios.post(SignUpRoute, {
                username,
                email,
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
        if (password === undefined) {
            toast.error("Password Not Matched",
                toastOption
            );
            return false;
        } else if (username.length < 3) {
            toast.error("User Name Should be more than 3",
                toastOption
            );
            return false;
        } else if (password.length < 8) {
            toast.error("Password Should be equale or greater than 8 characters",
                toastOption
            );
            return false;
        } else if (email === "") {
            toast.error("Email is require",
                toastOption
            );
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="box">
                <span className="borderLine"></span>
                <form onSubmit={(env)=>handleSubmit(env)}>
                    <h2>Sign up Varta</h2>
                    <div className="inputBox">
                        <input type="email"
                            required="required"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)} />
                        <span>User Email</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="text"
                            name='username'
                            required="required"
                            onChange={(e) => setUserName(e.target.value)} />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="password"
                            name='password'
                            required="required"
                            onChange={(e)=>setPassword(e.target.value)} />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className="links">
                        <Link href="/">Have a account. Sign in</Link>
                    </div>
                    <input type="submit" value="Sign up" />
                </form>
            </div>
            <ToastContainer/>
        </>
    )
}

export default SignUp