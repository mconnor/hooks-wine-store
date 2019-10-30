import React from 'react';
import { render, cleanup, fireEvent } from  '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import Wine from '../Wine';

afterEach(cleanup);

test('<Wine />', () => {
    const { debug, getByTestId } = render(<Wine />);

    const learnMoreBtn = getByTestId("learn-more-btn");

    // Asserts counter-button is a button
    expect(learnMoreBtn.tagName).toBe('BUTTON');
}
);