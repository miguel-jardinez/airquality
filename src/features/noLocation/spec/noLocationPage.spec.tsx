import React from 'react';
import { render } from '@testing-library/react';
import { NoLocationPage } from '../noLocationPage';

jest.mock('@lottiefiles/react-lottie-player', () => ({
  Player: () => <div />,
}));

describe('No Location Page', () => {
  test('renders no location message', () => {
    // Arrange
    const { getByText } = render(<NoLocationPage />);

    // Assertion
    expect(getByText('Something wrong')).toBeInTheDocument();
    expect(getByText('Please refresh the page and try again')).toBeInTheDocument();
    expect(getByText('We need access to your location, please allowed and refresh the page')).toBeInTheDocument();
  });
});
