import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import StitchIt from './components/StitchIt'

ReactDOM.render(
    <Router>
        <StitchIt />
    </Router>
    , document.getElementById('root'));


