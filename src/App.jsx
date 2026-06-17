import Sidebar from "./sidebar/sidebar.jsx";
import Feed from "./feed/feed.jsx";
import Suggestion from "./suggestion/suggestion.jsx";

function App() {
  return (
    <>
      <div className="home">
        <Sidebar />
        <p></p>
        <Feed />
        <Suggestion />
      </div>
    </>
  );
}


export default App;