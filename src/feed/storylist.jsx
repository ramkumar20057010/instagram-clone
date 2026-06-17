import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Storylist() {
    const [stories, setStories] = useState([]);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/stories")
            .then((data) => {
                setStories(data.data);
            })
            .catch((er) => {
                setErr(er);
                console.log(er);
            })
    });
    return (
        <div className="storylist">
            {
                stories.length > 0 ? (
                    stories.map((s) =>
                        <div className="story" key={s.id} onClick={() =>(navigate(`/story/${s.id}/${stories.length}`))}>
                            <div className="story1">
                                <img src={s.user.profile_pic} />
                                <p>{s.user.username}</p>
                            </div>
                        </div>
                    )) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}

export default Storylist;