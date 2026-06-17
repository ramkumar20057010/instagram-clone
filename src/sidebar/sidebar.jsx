import m1 from "../assets/insta-name.png";
import m2 from "../assets/osaragi.jpeg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <center>
                <img src={m1} />
            </center>
            <ul className="navbars">
                <li> <i className="ri-home-9-fill move"></i> Home</li>
                <li> <i className="ri-movie-fill move"></i> Reels</li>
                <li> <i className="ri-send-ins-fill move"></i> Messages</li>
                <li> <i className="ri-search-2-line move"></i> Search</li>
                <li> <i className="ri-poker-hearts-line move"></i> Notifications</li>
                <li> <i className="ri-add-box-line move"></i>Create</li>
                <li className="sideprofile" onClick={ () => navigate("/profile") }>
                    <img className="move" src={m2} />
                    Profile
                </li>
            </ul>
            <ul className="more">
                <li> <i className="ri-menu-fill"></i> More</li>
                <li> <i className="ri-threads-line"></i> Threads</li>
            </ul>
        </div>
    );
}

export default Sidebar;