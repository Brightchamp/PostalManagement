import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostList from './components/PostList/PostList';
import PostForm from './components/PostForm/PostForm';
import DateTimePicker from 'react-datetime-picker'

function useFetch(url,defValue){
  const [data,setdata] = useState(defValue);
  useEffect(()=>{
    axios.get(url)
    .then(response => setdata(response.data));
  },[url])
  return data;
}

function App() {

  const [posts,setPosts] = useState([]);
  const [displayPosts,setDisplayPosts] = useState([]);
  const [serialNumber,setSerialNumber] = useState(1);
  
  useEffect(()=>{
    axios.get(`http://localhost:5000/posts`)
    .then(response => setPosts(response.data.map(obj => {
      return {...obj, recievedDate: new Date(obj.recievedDate)};
    })
    ));
  },[])

  useEffect(()=>console.log(posts),[posts])

  useEffect(()=>{
    const newSerialNumber = posts.reduce((number,post)=>{
      const today = new Date();
      const checkYear = post.recievedDate.getFullYear() === today.getFullYear()
      const checkMonth = post.recievedDate.getMonth() === today.getMonth()
      const checkDate = post.recievedDate.getDate() === today.getDate()

      if(checkDate&&checkMonth&&checkYear) return Math.max(number,post.serialNumber);
      return number;
    },0)
    console.log(newSerialNumber);

    setSerialNumber(newSerialNumber+1);

  },[posts])

  const [filters,setFilters] = useState({
    recieverName : '',
    recievedDate : new Date(),
    deliveryService : '',

  })

  useEffect(()=>{
    setDisplayPosts(posts);
    setDisplayPosts(oldPosts => {
      const newPosts = oldPosts.filter(post=>{
        const checkName = (post.recieverName.toLowerCase().includes(filters.recieverName.toLowerCase()));
        const checkDate = (filters.recievedDate===null) || ((post.recievedDate.getYear()===filters.recievedDate.getYear())&&(post.recievedDate.getMonth()===filters.recievedDate.getMonth())&&(post.recievedDate.getDate()===filters.recievedDate.getDate()));
        // const checkDate = true
        const checkService = (post.deliveryService.toLowerCase().includes(filters.deliveryService.toLowerCase()));
        return (checkName)&&(checkDate)&&(checkService)
      })
      return newPosts.sort((a,b)=>{
        if (a.recievedDate===b.recievedDate) return a.serialNumber<b.serialNumber;
        return a.recievedDate>b.recievedDate;
      });
    })
  },[posts,filters])



  const updateFilters = (updateObj)=>{
    setFilters(oldFilters => {
      return {
        ...oldFilters,
        ...updateObj
      }
    })
  }

  function onCollect(id){
    axios.delete(`http://localhost:5000/posts/delete/${id}`)
    .then(setPosts( oldPosts =>{
      return oldPosts.filter(post=> post._id!==id);
    }));
  }

  function postFormOnSubmit(post){
    setPosts(oldPosts=>{
      oldPosts.unshift(post)
    return oldPosts;
    })
  }

  return (
    <>
      <div className="App">
        <form className='filters'>
          <div className='filterItem'>
            <label className = 'key'>Reciever Name</label>
            <input type='text' className='value' value={filters.recieverName} onChange={e => updateFilters({recieverName : e.target.value})}/>
          </div>
          <div className='filterItem'>
            <label className = 'key'>Recieved Date</label>
            <DateTimePicker value={filters.recievedDate} onChange={date => updateFilters({recievedDate : date})} disableClock/>
          </div>
          <div className='filterItem'>
            <label className = 'key'>Delivery Service</label>
            <input type='text' className='value' value={filters.deliveryService} onChange={e => updateFilters({deliveryService : e.target.value})}/>
          </div>
        </form>
        <PostList  posts={displayPosts} onCollect={onCollect}/>
      </div>

      <PostForm serialNumber={serialNumber} onSubmit = {postFormOnSubmit}/>

    </>
  );
}

export default App;
