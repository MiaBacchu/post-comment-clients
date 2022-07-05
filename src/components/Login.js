import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        fetch('https://desolate-fjord-19956.herokuapp.com/users')
        .then(res=>res.json())
        .then(data=>{
            setUsers(data)
        })
    },[])

    const handleLogin=(e)=>{
        e.preventDefault();
        if (!matchEmail) {
            alert('email does not match please register')
            return;
        }
        if (!matchPass) {
            alert('password does not match')
            return;
        }
        else{
            alert('login successfull')
            fetch(`https://desolate-fjord-19956.herokuapp.com/user/${email}`)
            .then(res=>res.json())
            .then(data=>{
                localStorage.setItem('mySimpleToggle',JSON.stringify(data))
            })
            .then(req=>{window.location.reload()})
            e.target.reset()
        }
    }
    let allEmail=[];
   users.map(user=>allEmail.push(user.email));
   const matchEmail = allEmail.includes(email);
   const user=users.find(item=>item.email===email)
   const matchPass = user?.pass===pass;
    return (
        <div>
            <p className='fs-1'>Login</p>
        <form onSubmit={handleLogin}>
        <input type='email' placeholder='your email' required onChange={(e)=>setEmail(e.currentTarget.value)}/>
        <br />
        <br />
        <input type='password' placeholder='your password' required onChange={(e)=>setPass(e.target.value)}/>
        <br />
        <br />
        <input type='submit' value="Login"/>
        <br />
        <br />
        </form>
        <p>new user? <Link className='text-decoration-none' to='/register'>Register</Link></p>
        </div>
    );
};

export default Login;