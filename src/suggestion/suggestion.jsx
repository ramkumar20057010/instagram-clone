

import { useState, useEffect } from "react";
import axios from "axios";

function Suggestion() {

    const [profile, setProfile] = useState(null);
    const [suggestion, setSuggestion] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/profile")
            .then((data) => {
                setProfile(data.data);
            })
            .catch((er) => {
                console.log(er.message);
            })
        axios.get("http://localhost:3000/suggestions")
            .then((data) => {
                setSuggestion(data.data);

            })
            .catch((er) => {
                console.log(er);
            })
    }, []);
    const Follow = async (p) => {
        axios.post("http://localhost:3000/following",
            { id: p.id, username: p.username, profile_pic:p.profile_pic })
        .then((resp) =>{
            console.log(resp);
            alert("Following",p.username);
        })
        .catch((er) =>{
            console.log(er);
        })
    }
    return (
        < div className="suggestion" >
            {
                profile ? (
                    <div className="suggestprofile">
                        <img src={profile.profile_pic} />
                        <div className="profdetails">
                            <h3>{profile.username}</h3>
                            <h4>{profile.name}</h4>
                        </div>
                        <button>Switch</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
            <div className="suggest">
                <h4>Suggested for you</h4>
                <h4>See all</h4>
            </div>

            <div className="suggestpeople">
                {
                    suggestion.length ? (
                        suggestion.map((s) =>
                            <div className="suggestion1" key={s.id}>
                                <img src={s.profile_pic} />
                                <h4>{s.username}</h4>
                                <button onClick={() => Follow(s)}>Follow</button>
                            </div>
                        )) : (
                        <p>Loading...</p>
                    )
                }
            </div>
            <p className="about">About . Help . Press . API . Jobs . Privacy . Terms<br />
                . Location . Language . Meta Verified<br /><br />
                2026 INSTAGRAM FROM META</p>
        </div >
    );
}

export default Suggestion;