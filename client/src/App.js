import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostList from './components/PostList/PostList';

function useFetch(url,defValue){
  const [data,setdata] = useState(defValue);
  useEffect(()=>{
    axios.get(url)
    .then(response => setdata(response.data));
  },[])
  return data;
}

function App() {

  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:5000/posts`)
    .then(response => setPosts(response.data));
  },[])

  function onCollect(id){
    axios.delete(`http://localhost:5000/posts/delete/${id}`)
    .then(setPosts( oldPosts =>{
      return oldPosts.filter(post=> post._id!==id);
    }));
  }

  return (
    <div className="App">
      <PostList posts={posts} onCollect={onCollect}/>
    </div>
  );
}

export default App;
