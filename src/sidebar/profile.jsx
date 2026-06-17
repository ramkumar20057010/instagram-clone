
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Profile() {
    const [editProfile, setEditProfile] = useState(false);
    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3000/profile")
            .then((data) => {
                setProfile(data.data);

            })
            .catch((er) => {
                console.log(er.message);
            })
            
    }, []);
    useEffect(() => {
        axios.get("http://localhost:3000/followers")
            .then((data) => {
                setFollowers(data.data);
            })
            .catch((er) => {
                console.log(er.message);
            })
    }, [followers]);
    useEffect(() => {
        axios.get("http://localhost:3000/following")
            .then((data) => {
                setFollowing(data.data);
            })
            .catch((er) => {
                console.log(er);
            })
    }, [following])
    function handleProfile(ev) {
        setProfile((prev) => ({
            ...prev, [ev.target.name]: ev.target.value
        }));
        console.log(ev.target.value);
    }

    const showEdit = () => {
        setEditProfile(!editProfile);
    }
    const updateProfile = async (uname, name, about) => {
        const newProfile = {
            username: uname,
            name: name,
            about: about
        }
        axios.put("http://localhost:3000/profile", {
            ...profile, newProfile
        })
            .then((data) => {
                alert("updated....");
            })
            .catch((er) => {
                alert(er.message);
            })
    }
    const showFollowerpg = () => {
        setShowFollowers(!showFollowers);
    }
    const showFollowingpg = () => {
        setShowFollowing(!showFollowing);
    }
    const style = {
        display: editProfile === true ? "block" : "none"
    }
    const stylefollowers = {
        display: showFollowers ? "block" : "none"
    }
    const stylefollowing = {
        display: showFollowing === true ? "block" : "none"
    }

    const removeFollower = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
            .then((resp) => {
                alert("Follower Removed....");
                console.log(resp);
            })
    }
    const unFollow = async (id) => {
        axios.delete(`http://localhost:3000/following/${id}`)
            .then((resp) => {
                alert("Unfollowed...");
                console.log(resp);
            })
            .catch((er) => {
                console.log(er);
            })
    }
    if (!followers || !following) {
        return (
            <></>
        );
    }
    return (
        <section className="secprofile">
            {
                profile ? (
                    <div className="profilepg">
                        <img src={profile.profile_pic} />
                        <div className="profiledetails">
                            <h1>{profile.username}</h1>
                            <h3>{profile.name}</h3>
                            <div className="profilecont">
                                <p onClick={showFollowerpg}>{followers.length}<mark> Followers</mark></p>
                                <p onClick={showFollowingpg}>{following.length}<mark> Following</mark></p>
                            </div>
                            <p>{profile.about}</p>
                            <center><button onClick={showEdit} >Edit Profile</button></center>
                            <div className="editprofile" style={style}>
                                <center>
                                    <label>Edit Username</label>
                                    <input type="text" name="username" value={profile.username} onChange={handleProfile} /><br /><br />
                                    <label>Edit Name</label>
                                    <input type="text" name="namex" value={profile.name} onChange={handleProfile} /><br /><br />
                                    <label>Edit about</label>
                                    <input type="text" name="about" value={profile.about} onChange={handleProfile} /><br /><br />
                                    <button onClick={() => updateProfile(profile.username, profile.name, profile.about)}>Confirm</button>
                                </center>
                            </div>
                        </div>
                        <div className="follow" style={stylefollowers}>
                            <center><button className="cancel" onClick={showFollowerpg} >X</button></center>
                            <div className="followers">
                                {
                                    followers.length > 0 ?
                                        followers.map((f) =>
                                            <div className="follow1" key={f.id}>
                                                <img src={f.profile_pic} />
                                                <h4>{f.username}</h4>
                                                <button onClick={() => removeFollower(f.id)}>Remove</button>
                                            </div>
                                        ) : (
                                            <p>Loading....</p>
                                        )

                                }
                            </div>

                        </div>
                        <div className="follow" style={stylefollowing}>
                            <center><button className="cancel" onClick={showFollowingpg} >X</button></center>
                            <div className="followers">
                                {
                                    following.length > 0 ?
                                        following.map((f) =>
                                            <div className="follow1" key={f.id}>
                                                <img src={f.profile_pic} />
                                                <h4>{f.username}</h4>
                                                <button onClick={() => unFollow(f.id)}>Unfollow</button>
                                            </div>
                                        ) : (
                                            <p>Loading....</p>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
            <p className="about pfabout">About . Help . Press . API . Jobs . Privacy . Terms<br />
                . Location . Language . Meta Verified<br /><br />
                2026 INSTAGRAM FROM META</p>
        </section>
    );
}
export default Profile;