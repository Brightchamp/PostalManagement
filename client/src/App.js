import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostList from './components/PostList/PostList';
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
  
  useEffect(()=>{
    axios.get(`http://localhost:5000/posts`)
    .then(response => setPosts(response.data.map(obj => {
      return {...obj, recievedDate: new Date(obj.recievedDate)};
    })
    ));
  },[])

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
        const checkDate = (filters.recievedDate===null) || (post.recievedDate.getYear()===filters.recievedDate.getYear())&&(post.recievedDate.getMonth()===filters.recievedDate.getMonth())&&(post.recievedDate.getDate()===filters.recievedDate.getDate());
        // const checkDate = true
        const checkService = (post.deliveryService.toLowerCase().includes(filters.deliveryService.toLowerCase()));
        return (checkName)&&(checkDate)&&(checkService)
      })
      return newPosts;
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

  return (
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
      <PostList posts={displayPosts} onCollect={onCollect}/>
    </div>
  );
}

export default App;
