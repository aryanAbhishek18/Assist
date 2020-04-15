import React from 'react';
import '../css/Home.css';

function Home(props) {
    return (
        <div className="container home-div">
            <h2 className="home-greeting-msg">
                Hey {props.name}! What's up?
            </h2>
        </div>
    );
}

export default Home;