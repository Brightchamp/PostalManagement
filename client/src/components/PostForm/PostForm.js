import { useState } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const PostForm = (props)=>{

    cosnt [post,setPost] = useState({
        recieverName : '',
        recievedDate : new Date(),
        deliveryService : '',
        serialNumber : 1
    })

    const updatePost = (e)=>{

        setPost(oldPost=>({
            ...oldPost,
            [e.target.name]:e.target.value
        }))
    }

    return(
        <form className="PostForm" onSubmit={()=>props.onSubmit(post)}>
            <div className="formControl">
                <label className="key">Reciever Name</label>
                <input type='text' name="recieverName" value={post.recieverName} onChange={updatePost}/>
            </div>
            <div className="formControl">
                <label className="key">Recieved Name</label>
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
        </form>
    )

}

export default PostForm;