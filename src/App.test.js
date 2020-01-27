import { render } from '@testing-library/react';
import React from 'react';
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
