

import Storylist from "./storylist.jsx";
import Postlist from "./postlist.jsx";

function Feed()
{
    return(
        <div className="feed">
            <Storylist />
            <Postlist />
        </div>
    );
}

export default Feed;