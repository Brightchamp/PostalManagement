import axios from "axios";
import { useState,useEffect } from "react";
import DateTimePicker from "react-datetime-picker";

const PostForm = (props)=>{

    const [post,setPost] = useState({
        recieverName : '',
        recievedDate : new Date(),
        deliveryService : '',
        serialNumber : props.serialNumber
    })

    useEffect(()=>{
        setPost(oldPost=>({...oldPost,serialNumber:props.serialNumber}))
    },[props.serialNumber])

    const updatePost = (e)=>{

        setPost(oldPost=>({
            ...oldPost,
            [e.target.name]:e.target.value
        }))
    }

    function formSubmit(e){
        e.preventDefault();
        axios.post(`http://localhost:5000/posts/add`,{...post})
            .then(response =>{
                props.onSubmit(response.data.post);
            })
    }

    return(
        <form className="PostForm" onSubmit={formSubmit}>
            <div className="formControl">
                <label className="key">Reciever Name</label>
                <input type='text' name="recieverName" value={post.recieverName} onChange={updatePost}/>
            </div>
            <div className="formControl">
                <label className="key">Recieved Date</label>
                <DateTimePicker value={post.recievedDate} onChange={(date)=>setPost(oldPost=>({...oldPost, recievedDate:date}))}/>
            </div>
            <div className="formControl">
                <label className="key">Serial Number</label>
                <input type='number' name="serialNumber" value={post.serialNumber} onChange={updatePost}/>
            </div>
            <div className="formControl">
                <label className="key">Delivery Service</label>
                <input type='text' name="deliveryService" value={post.deliveryService} onChange={updatePost}/>
            </div>
            <input type='submit'/>
        </form>
    )

}

export default PostForm;