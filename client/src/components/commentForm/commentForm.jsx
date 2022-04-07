import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./commentForm.css"

export default function CommentForm({postId}) {
  const {user} =useContext(Context);
  const [desc,setDesc] = useState("");
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(user){
        try{
          const res= await axios.post(`http://localhost:4000/api/comment/post/${postId}`,{
            userId:user._id,
            userName:user.userName,
            desc
          });
        window.location.replace("/post/"+postId);
        }catch(err){
        }
    }
    else{
        window.location.replace("/login");
    }
  }

return (
    <div className="panel">
          <div className="panel-body">
            <textarea className="form-control" rows="2" placeholder="What are you thinking?"
                onChange={e=>setDesc(e.target.value)}
            ></textarea>
            <div className="mt-2">
                <button className="btn btn-sm btn-primary pull-right" type="submit" onClick={handleSubmit}>
                  <i className="fas fa-pencil-alt"></i> Comment
                </button>
            </div>
          </div>
    </div>
)
}