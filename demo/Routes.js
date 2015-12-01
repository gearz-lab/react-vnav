import React from 'react';

import Root from './pages/Root';
import Demo from './pages/Demo.js';

import {Route} from 'react-router';

export default (
    <Route path='/' component={Root}>
        <Route path='/react-vnav/demo.html' component={Demo}/>
    </Route>
)
