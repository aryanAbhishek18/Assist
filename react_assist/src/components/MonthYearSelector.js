import React from 'react';

function getMonth(index) {
    switch (index) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default: return 'Invalid index!'
    }
}

function getIndex(month) {
    switch (month) {
        case 'January': return 0;
        case 'February': return 1;
        case 'March': return 2;
        case 'April': return 3;
        case 'May': return 4;
        case 'June': return 5;
        case 'July': return 6;
        case 'August': return 7;
        case 'September': return 8;
        case 'October': return 9;
        case 'November': return 10;
        case 'December': return 11;
        default: return -1;
    }
}


class MonthYearSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            month: getMonth(new Date().getMonth()),
            year: new Date().getFullYear()
        };

        this.monthChangeHandler = this.monthChangeHandler.bind(this);
        this.yearChangeHandler = this.yearChangeHandler.bind(this);
        this.submitFrameChange = this.submitFrameChange.bind(this);
    }

    monthChangeHandler(event) {
        this.setState({
            month: event.target.value
        });
    }

    yearChangeHandler(event) {
        this.setState({
            year: Number(event.target.value)
        });
    }

    submitFrameChange() {
        if(this.state.month === 'Select month: ') {
            alert('Select a valid month!');
        }
        else if(this.state.year === 'Select year: ') {
            alert('Select a valid year!');
        }
        else this.props.handleFrameChange(getIndex(this.state.month), this.state.year);
    }

    render(){

        let monthOptions = [<option value='Select month: ' key={0}>Select month: </option>]
        for(let i=1;i<13;i++){
            monthOptions.push(<option value={getMonth(i-1)} key={i}>{getMonth(i-1)}</option>)
        }

        let yearOptions = [<option value='Select year: ' key={0}>Select year: </option>]
        for(let i=2020;i<=(new Date().getFullYear());i++){
            yearOptions.push(<option value={i} key={i}>{i}</option>)
        }

        return (
            <div className="month-year-selector-div container">
                <div className="row">
                    <div className="col-md-2 select-div">
                        <select className="form-control" value={this.state.month} onChange={this.monthChangeHandler}>
                            {monthOptions} 
                        </select>
                    </div>
                    <div className="col-md-2 select-div">
                        <select className="form-control" value={this.state.year} onChange={this.yearChangeHandler}>
                            {yearOptions} 
                        </select>
                    </div>
                    <div className="col-md-2 select-div">
                        <button type="button" className="btn btn-success" onClick={this.submitFrameChange}>Analyse</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default MonthYearSelector;