import React, { useEffect, useState } from 'react';

const Main = () => {
    const [statuses,setStatuses]=useState();
    console.log(!statuses)
    const [comment,setComment]=useState('');
    const user = JSON.parse(localStorage.getItem('mySimpleToggle'));
    
    useEffect(()=>{
        fetch('https://desolate-fjord-19956.herokuapp.com/status')
        .then(res=>res.json())
        .then(data=>{
            setStatuses(data)
        })
    },[statuses]);

    const handlePost=(id)=>{
        if (!user?.email) {
            alert('you must login first for comment');
            return;
        }
        fetch(`https://desolate-fjord-19956.herokuapp.com/comments/${id}`,{
            method:'PUT',
            headers: {
                'content-type': 'application/json'
              },
            body:JSON.stringify({ name: user.name,comment})
        })
        .then(res=>res.json())
    }
    if (!statuses) {
        return(
            <div>
                <p className='fs-1 fw-bold'>Loading...</p>
                <p className='fs-3'>Please Wait</p>
                <div class="spinner-grow" role="status">
            <span class="visually-hidden"></span>
            </div>
            </div>
        )        
    }
    return (
        <div>
            {statuses.map(status=>
            <div className='bg-light w-75 mx-auto' key={status._id}>
                <p className='text-dark fs-4 mt-5 pt-2 fw-bold'>{status.name}</p>
                <hr></hr>
                <p className='text-dark fs-5 fw-bold'>{status.title}</p>
                <p>{status.description}</p>
                <img className='w-100 pb-3' src={`data:image/png;base64,${status.image}`} alt="this is img"/>
                <div>{status.comments.map(comment=>
                <div>
                <div className='d-flex justify-content-center text-dark pt-3'>
                <p className='text-dark fs-6 fw-bold me-3'>{comment.name} </p>
                <p >{comment.comment}</p>
                </div>
                </div>
                )}</div>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    handlePost(status._id)
                }}>
                <textarea required onChange={(e)=>setComment(e.target.value)} placeholder='write your comment'/>
                    <br />
                <input type="submit" value='comment'/>
                <br />
                <br />
        </form>
            </div>)
            }
        </div>
    );
};

export default Main;