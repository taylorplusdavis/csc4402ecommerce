import React from 'react';

class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }


    render(){
        return(
            <div className='Login_container'>
                <form>
                    <input type='email' name='email' placeholder='email...' required onChange/>
                    <input type='password' name='pwd' placeholder='password...' required onChange/>
                    <button onSubmit>Login In</button>
                </form>
            </div>
        )
    }
}

export default Login;