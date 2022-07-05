import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
     const [match,setMatch]=useState(false);
    const user =JSON.parse(localStorage.getItem('mySimpleToggle'));
    if (user) {
        fetch(`https://desolate-fjord-19956.herokuapp.com/user/${user?.email}`)
            .then(res=>res.json())
            .then(data=>{
            setMatch(data.email===user.email)
            })
    }

    const handleLogOut=()=>{
        localStorage.clear('mySimpleToggle');
        alert('successfully log out')
        window.reload()
   }
    return (
        <div className="d-flex justify-content-evenly bg-primary py-3">
            <Link className="text-decoration-none text-light fs-4" to='/home'>Home</Link>
            <Link className="text-decoration-none text-light fs-4" to='/create'>Create Post</Link>
            <Link className="text-decoration-none text-light fs-4" style={{display: !match ? '' : 'none',}} to='/login'>Log In</Link>
            <Link className="text-decoration-none text-light fs-4" onClick={handleLogOut} style={{display: match ? '' : 'none',}} to='/login'>Log Out</Link>
        </div>
    );
};

export default Header;