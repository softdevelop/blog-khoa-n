import { useState,useEffect } from "react";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./homepage.css"
import axios from "axios"
import {useLocation} from "react-router";


export default function Homepage() {
  const [posts,setPosts] = useState([]);
  const location =useLocation();
  const [currentPage,setCurrentPage] = useState([]);
  const [totalPage,setTotalPage] = useState([]);
  const index = location.pathname.split('/')[1];

  const {search} = useLocation();
  useEffect(() =>{
    const fetchPosts = async() =>{
      const path=index? `http://localhost:4000/api/post/page/${index}${search}`: `http://localhost:4000/api/post/page/${search}`;
       
      axios.get(path)
      .then(res => {
        setPosts(res.data.posts);
        setCurrentPage(res.data.current);
        setTotalPage(res.data.pages);
      });     
    }
    fetchPosts();
  },[search,index])
  const data={
        posts,
        currentPage,
        totalPage
      }
  return (
      <>
        <Header/>
        <div className="container">
          <div className="input-group rounded mt-4">
              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
          </div>
          <div className="home">
              <Posts data={data}/>
              <Sidebar/>
            </div>
        </div>
        
      </>
  )
}
