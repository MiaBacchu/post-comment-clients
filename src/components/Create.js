import { useState } from "react";
import React from 'react';

const Create = () => {
    const [title,setTitle]=useState('');
    const [description,setDescriptin]=useState('');
    const [image,setImage]=useState(null);
    const user = JSON.parse(localStorage.getItem('mySimpleToggle'));

    const handlePost=(e)=>{
        e.preventDefault();
        if (!user?.email) {
            alert('you must login first for post');
            return;
        }
        const formData = new FormData();
        formData.append('name',user.name);
        formData.append('title',title);
        formData.append('description',description);
        formData.append('image',image);
        fetch('https://desolate-fjord-19956.herokuapp.com/post-status',{
            method:'POST',
              body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.insertedId) {
                alert('post successfull');
            }
        })
        e.target.reset();
       }
    return (
        <div className='App w-50 mx-auto'>
            <p className="fs-1">create a post</p>
            <form className="d-flex flex-column" onSubmit={handlePost}>
                <input required onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='title'/>
                <br/>
                <br/>
                <textarea required onChange={(e)=>setDescriptin(e.target.value)} type="text" placeholder='description'/>
                <br/>
                <br/>
                <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
                <br/>
                <br/>
                <input type="submit" />
            </form>
        </div>
    );
};

export default Create;