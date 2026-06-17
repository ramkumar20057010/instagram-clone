import { useEffect, useState } from "react";
import axios from "axios";

function Post(props) {
    const [sPost,setSpost] = useState(null);
    const [likes, setLikes] = useState(props.likes);
    const [likestate, setState] = useState(true);
    const [comment, setComment] = useState("");
    const [shcomment, setShComment] = useState(false);
    const [newComment,setNewComment] = useState(null);
    const [run,setRun] = useState(true);
    const style = {
        display: shcomment == true ? "block" : "none"
    }
    useEffect(() =>{
        axios.get(`http://localhost:3000/posts/${props.id}`)
        .then((data) =>{
            setSpost(data.data);
        })
        .catch((er) =>{
            console.log(er);
        })
    },[run])
    function like() {
        setState(!likestate);
        if (likestate) {
            setLikes(likes + 1);
        }
        else {
            setLikes(likes - 1);
        }
    }
    function showComments() {
        setShComment(!shcomment);
    }
    function commentValue(ev){
        setComment(ev.target.value);
        console.log(comment);
        setNewComment({
            user:"Osaragi_447",
            comment:comment
        });
    }
    const addComment = async () =>{
        axios.put(`http://localhost:3000/posts/${props.id}`,{
            ...sPost,comments:[...sPost.comments,newComment]
        })
        .then(() =>{
            console.log("comment added...");
            alert("comment added...");
            setRun(!run);
        })
        .catch((er) =>{
            console.log(er);
        })
    }
    return (
        <div className="post">
            <div className="postprofile">
                <div className="postprofileimg">
                    <img src={props.profile_pic} />
                    <h3>{props.username}</h3>
                </div>
                <button>Follow</button>
            </div>
            <img src={props.image} className="postimg" />
            <div className="postlikes">
                <li><i className="ri-poker-hearts-line" onClick={() => like()}></i>{likes}</li>
                <li><i className="ri-chat-3-line" onClick={showComments}></i> {props.comments.length}</li>
                <li><i className="ri-send-ins-fill"></i></li>
            </div>
            <p>{props.caption}</p>
            <div className="comments" style={style}>
                <h2>Comments</h2>
                {
                    sPost? (
                        sPost.comments.map((p) =>
                            <div className="commentsec" key={p.user}>
                                <h3>@{p.user}</h3>
                                <p>{p.comment}</p>
                            </div>
                        ))
                        : (
                            <p>No comments in this post</p>
                        )
                }
                <input type="text" placeholder="Add your Comment..." value={comment} onChange={commentValue} /><br /><br />
                <button onClick={addComment}>Add Comment</button>
            </div>

        </div>);
}

export default Post;