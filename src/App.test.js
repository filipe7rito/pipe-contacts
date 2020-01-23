import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App', () => {
  test('Render App as expected', () => {
    const { asFragment } = renderApp();

    expect(asFragment()).toMatchSnapshot();
  });

  function renderApp() {
    return render(<App></App>);
  }
});
