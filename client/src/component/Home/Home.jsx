import React, { useEffect, useState } from 'react';
import './Home.css';
import Create from '../Create/Create';
import axios from 'axios';
import { BsCircleFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";


const Home = () => {
    const [todos,setTodos]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/get').then(result=> setTodos(result.data))
        .catch(err=>console.log(err))

    },[])
    const handleEdit=(id)=>{
        axios.put('http://localhost:3000/update/'+id).then(result=> {
            location.reload()
        })
        .catch(err=>console.log(err))
    }
    const handleDelete=(id)=>{
        axios.delete('http://localhost:3000/delete/'+id).then(result=> {
            location.reload()
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className='home'>
            <h1>To do list</h1>
            <Create/>
            {
                todos.length===0 ?
                <div ><h2 className='val'>No task</h2></div> :
                todos.map((todo)=>(
                    <div className='task'>
                        
                        <div className='checkbox' onClick={()=>handleEdit(todo._id)}> 
                            <div>
                                {
                                    todo.done 
                                    ? <BsCheckCircleFill className='icon'/>
    
                                    : <BsCircleFill className='icon'/>
                                }
                            </div>
                            {todo.task}
                            
                        </div>
                        <div><BsTrashFill className='trash' onClick={()=>handleDelete(todo._id)}/></div>
                        
                    </div>
                    
                ))
            }
        </div>
    );
};

export default Home;