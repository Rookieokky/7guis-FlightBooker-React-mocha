import React from 'react';
import expect from 'expect';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';

import FlightBooker from '../src/FlightBooker';


describe('FlightBooker', () => {

  it('displays the assigned initial date initially', () => {
      const component = renderIntoDocument(
        <FlightBooker
          initialFromDate={ new Date(2016, 0, 1) }
          initialToDate={ new Date(2016, 0, 1) } />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[0].value).toBe('01.01.2016');
      expect(inputs[1].value).toBe('01.01.2016');
  });

  it('disables the Return Date textfield when "one-way-flight" is selected', () => {
      const component = renderIntoDocument(
        <FlightBooker
          initialFromDate={ new Date(2016, 0, 1) }
          initialToDate={ new Date(2016, 0, 1) } />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs[1].disabled).toBe(true);
  });

  it('disables the Book button when the combobox has the value "return-flight" and the return date is strictly before the start date', ()=>{
    const component = renderIntoDocument(
      <FlightBooker
          initialFromDate={ new Date(2016, 0, 2) }
          initialToDate={ new Date(2016, 0, 1) } />
    );
    const combo = scryRenderedDOMComponentsWithTag(component, 'select')[0];
    combo.value = 'return-flight';
    Simulate.change(combo);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].disabled).toBe(true);
  });

});
