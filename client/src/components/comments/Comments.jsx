import Comment from "../comment/comment"
import CommentForm from "../commentForm/commentForm"
import "./comments.css"

export default function Comments({data}) {
    return (
    <div class="container">
    <div class="be-comment-block">
	<h1 class="comments-title">Comments</h1>
    {
        data?.comments?data.comments.map(comment =>{
            return <Comment commentId={comment}/>
        }):(<></>)
    }
    </div>
    <CommentForm postId={data.postId}/>
    </div>
    )
}
