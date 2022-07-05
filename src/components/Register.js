import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const Register = () => {
    const [insertedId,setInsertedId]=useState();
    const [users,setUsers]=useState([]);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    useEffect(()=>{
        fetch('https://desolate-fjord-19956.herokuapp.com/users')
        .then(res=>res.json())
        .then(data=>{
            setUsers(data)
        })
    },[insertedId])

   const handleRegister=(e)=>{
    e.preventDefault()
    if (error) {
        alert('email are already used please login');
        return;
    }
    fetch('https://desolate-fjord-19956.herokuapp.com/registration',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ name, email, pass })
    })
    .then(res=>res.json())
    .then(data=>{
        setInsertedId(data)
        if (data.insertedId) {
            alert('registration successfull')
            e.target.reset()
        }
    })
   }
   let allEmail=[];
   users.map(user=>allEmail.push(user.email));
   const error = allEmail.includes(email);
    return (
        <div>
            <p className='fs-1'>registration</p>
        <form onSubmit={handleRegister}>
        <input type='text' required onChange={(e)=>setName(e.currentTarget.value)} placeholder="your name"/>
        <br />
        <br />
        <input type='email' required onChange={(e)=>setEmail(e.currentTarget.value)} placeholder="your email"/>
        <br />
        <br />
        <input type='password' required onChange={(e)=>setPass(e.target.value)} placeholder="password"/>
        <br />
        <br />
        <input type='submit' value='register'/>
        <br />
        <br />
        </form>
        <p>already register? <Link className='text-decoration-none' to='/login'>Login</Link></p>
        </div>
    );
};

export default Register;