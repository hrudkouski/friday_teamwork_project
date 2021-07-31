import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {store} from '../../m2-bll/store/redux-store';
import {Main} from '../u2-components/Main/Main';
import a from './App.module.css'

const App = () => {
    return (
        <div className={a.app}>
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
