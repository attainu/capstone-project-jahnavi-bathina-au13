import React from "react";
import Posts from "../post/Posts";


const Home = () => {
  return(
    <div>
        <div className="jumbotron">
            <center>
            <h1>Home</h1>
            </center>
   
        </div>
        <div className="container fluid">
        <Posts />
        
        </div>
    </div>

)
}

export default Home;
