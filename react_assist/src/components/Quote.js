import React from 'react';
import '../css/Quote.css';

function Quote(props) {
    return (
        <div className="quote-div">
            Here is a quote for you: 
            <div>
                <h4><em>"{props.quote}"</em></h4>
                <span>- {props.author}</span>
            </div>
        </div>
    )
}

export default Quote;