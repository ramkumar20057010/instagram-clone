import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Story() {
    const { id, total } = useParams();
    const [story, setStory] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/stories/${id}`)
            .then((data) => {
                setStory(data.data);
            })
            .catch((er) => {
                console.log(er);
            })
    }, [id]);
    const style = {
        backgroundImage: story ? `url("${story.image}")` : "white",

    }
    function changeStory(id, total) {
        if (id > 0 && id <= total) {
            navigate(`/story/${id}/${total}`);
        }
        else {
            navigate("/");
        }
    }
    return (
        <div className="viewstory" style={style} >
            {
                story ? (
                    <div className="storydetails">
                        <div className="stuser">
                            <img src={story.user.profile_pic} />
                            <h2>{story.user.username}</h2>
                        </div>
                        <div className="storyimg">
                            <button onClick={() => changeStory(Number(story.id) - 1, Number(total))}><i class="ri-arrow-left-long-line"></i></button>
                            <img src={story.image} />
                            <button onClick={() => changeStory(Number(story.id) + 1, Number(total))}><i class="ri-arrow-right-long-line"></i></button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }

        </div>
    )
}

export default Story;