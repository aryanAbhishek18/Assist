import React from 'react';
import '../css/Home.css';
import Quote from './Quote';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
            author: ''
        };
    }

    async componentDidMount() {
        try{
            const quotesURL = 'https://type.fit/api/quotes';
            const res = await fetch(quotesURL);
            const quotes = await res.json();
            const randQuote = quotes[Math.floor(Math.random()*quotes.length)];
            
            this.setState({
                quote: randQuote.text,
                author: randQuote.author
            });
        }
        catch(e) {
            alert('There was some error in fetching a quote for you!');
        }
    }

    render() {
        return (
            <div className="container home-div">
                <h2 className="home-greeting-msg">
                    Hey {this.props.name}! What's up?
                </h2>
                <Quote quote={this.state.quote} author={this.state.author}></Quote>
            </div>
        );
    }
}

export default Home;