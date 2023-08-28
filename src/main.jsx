import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {GlobalStateProvider} from "./context/GlobalStateContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStateProvider>
            <Router>
                <App/>
            </Router>
        </GlobalStateProvider>
    </React.StrictMode>,
)
