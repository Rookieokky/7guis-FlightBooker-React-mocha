import React, { PropTypes } from 'react';
import {toShortDate, fromShortDate} from './dateUtils';

const propTypes = {
  initialFromDate: PropTypes.instanceOf(Date),
  initialToDate: PropTypes.instanceOf(Date)
};

const defaultProps = {
  initialFromDate: new Date(2016, 0, 1),
  initialToDate: new Date(2016, 0, 1)
};

const ONE_WAY_FLIGHT = 'one-way-flight';
const RETURN_FLIGHT = 'return-flight';

class FlightBooker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.initialFromDate,
      toDate: this.props.initialToDate,
      flightType: ONE_WAY_FLIGHT
    };
  }

  bookFlight() {
  }

  fromDateChanged(e) {
    const fromDate = fromShortDate(e.target.value);
    if(fromDate){
      this.setState({
        fromDate: fromDate
      });
    }
  }

  toDateChanged(e) {
    const toDate = fromShortDate(e.target.value);
    if(toDate) {
      this.setState({
        toDate: toDate
      });
    }
  }

  flightTypeChanged(e) {
    this.setState({
      flightType: e.target.value
    });
  }

  toDateIsDisabled(){
    return this.state.flightType === ONE_WAY_FLIGHT;
  }

  bookActionIsDisabled(){
    return this.state.flightType === RETURN_FLIGHT && this.state.toDate < this.state.fromDate;
  }

  render() {
    return (
    	<div style={ {width: '200px'} }>
        <select
          size="1"
          style={ {width: '100%'} }
          select={ this.state.flightType }
          onChange={ (e)=>{this.flightTypeChanged(e)} }>
          <option value={ ONE_WAY_FLIGHT }>One way flight</option>
          <option value={ RETURN_FLIGHT }>Return flight</option>
        </select>
    		<input
          type="text"
          style={ {width: '100%'} }
          value={ toShortDate(this.state.fromDate) }
          onChange={ (e)=>{this.fromDateChanged(e)} }
          placeholder="dd.mm.yyyy" />
        <input
          type="text"
          style={ {width: '100%'} }
          value={ toShortDate(this.state.toDate) }
          onChange={ (e)=>{this.toDateChanged(e)} }
          disabled={ this.toDateIsDisabled.call(this) }
          placeholder="dd.mm.yyyy" />
    		<button
          onClick={ (e)=>{this.bookFlight()} }
          style={ {width: '100%'} }
          disabled={ this.bookActionIsDisabled.call(this) }>
          Book
        </button>
    	</div>
    );
  }
}

FlightBooker.propTypes = propTypes;
FlightBooker.defaultProps = defaultProps;

export default FlightBooker;
