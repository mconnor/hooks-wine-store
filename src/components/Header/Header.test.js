import React from 'react';
import {
    render,
    cleanup
} from "@testing-library/react"
import Header from './Header';


afterEach(() => {
    cleanup();
    console.error.mockClear();
});

console.error = jest.fn();


const _title = "fake title";

test('<Header name={_title} />', () => {
    const {debug, getByTestId} = render(<Header name={_title} />)
    expect(getByTestId('title-container').textContent).toBe(_title);
    expect(console.error).not.toHaveBeenCalled(); //
    debug();

})