import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post.jsx";

function Postlist() {
    const [post, setPost] = useState([]);
    const [err, setErr] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then((data) => {

                console.log(data);
                setPost(data.data);
            })
            .catch((er) => {
                setErr(er.message);
                console.log(er.message)
            })
    }, []);
    const mappost =post.map((p) => <Post key={p.id} id={p.id} profile_pic={p.user.profile_pic}
     image={p.image} username={p.user.username} likes={p.likes} caption={p.caption} comments={p.comments} />);
    
    
    if(!post){
        return(
            <>Loading...</>
        );
    }

    return (
        <div className="postlist">
            {mappost}
        </div>
    );
}

export default Postlist;