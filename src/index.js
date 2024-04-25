import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocketIOContext } from './socketIO/SocketIOContext';

function RootComponent() {
    const [socketIOConnection, setSocketIOConnection] = useState(false);

    return (
        <React.StrictMode>
            <SocketIOContext.Provider value={{ socketIOConnection, setSocketIOConnection }}>
                <App />
            </SocketIOContext.Provider>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);
