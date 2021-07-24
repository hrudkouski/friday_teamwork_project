import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {store} from '../../m2-bll/store/redux-store';
import {Main} from '../u2-components/Main/Main';
import './App.css';

// Tim's update

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
