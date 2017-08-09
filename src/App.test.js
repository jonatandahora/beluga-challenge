import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

  it('renders App Component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
