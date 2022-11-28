
import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";
import { Routes, Route, useNavigate } from 'react-router-dom';

function buttonpress(){
    const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
if(signInButton){
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});
}
if(signUpButton){
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
}
}


function Login(){

    buttonpress();

    const [fnameReg, setFnameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [lnameReg, setLnameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');
    const [emailstatus, setEmailStatus] = useState('');

    const register = () => {


        Axios.post("http://localhost:3002/api/send/registeruser", {
            first_name: fnameReg,
            last_name: lnameReg,
            email: emailReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    const navigate = useNavigate();

    const Loginn = event => {


        event.preventDefault();

        Axios.post("http://localhost:3002/api/get/login", {
            email: email,
            password: password,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            } else{
                setEmailStatus(response.data[0].email);
                navigate('/home');
            }
        });
    };


        return(
<body className="bodylogin">
<div className="container" id="container">
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1 className="h1login">Welcome Back!</h1>
				<p className="paralogin">To keep connected with us please login with your personal info</p>
				<button className='buttonlogin ghost' id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1 className="h1login">Hello, Friend!</h1>
				<p className="paralogin">Enter your personal details and start journey with us</p>
				<button className='buttonlogin ghost' id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
    <div className="form-container sign-up-container">
		<form className="formlogin" action="#">
			<h1 className="h1login">Create Account</h1>
			<span className="spanlogin">or use your email for registration</span>
					<input className="inputlogin" type = 'First Name' name = 'Fname' placeholder = 'First Name' required onChange={(e)=>setFnameReg(e.target.value)}/>
                    <input className="inputlogin" type = 'Last Name' name = 'Lname' placeholder = 'Last Name' required onChange={(e)=>setLnameReg(e.target.value)}/>
                    <input className="inputlogin" type = 'email' name = 'email' placeholder = 'Email' required onChange={(e)=>setEmailReg(e.target.value)}/>
                    <input className="inputlogin" type = 'password' name = 'pwd' placeholder = 'Password' required onChange={(e)=>setPasswordReg(e.target.value)}/>
			<button className="buttonlogin" onClick={register}>Register</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form className="formlogin" action="#">
		<h1 className="wrongep">{loginStatus}</h1>
			<h1 className="h1login">Sign in</h1>
			<span className="spanlogin">or use your account</span>
			<input className="inputlogin" type='email' name='email' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} />
			<input className="inputlogin" type='password' name='pwd' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>
			<button className="buttonlogin" onClick={Loginn}>Login</button>
		</form>
	</div>
</div>
</body>

        )
}



export default Login;