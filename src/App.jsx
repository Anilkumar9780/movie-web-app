import React from 'react';

//styles
import './css/plugins.css';
import './css/style.css';

// Component
import { Router } from './Router/Router';
import { PopupMessage } from './components';

export const App = () => {

    return (
        <div>
            <Router/>
            <PopupMessage />
        </div>
    );
}


