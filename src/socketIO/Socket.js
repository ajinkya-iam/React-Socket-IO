import { io } from 'socket.io-client';
import { useContext, useEffect } from 'react';
import { SocketIOContext } from './SocketIOContext';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = "ws://localhost:8181";
// const URL = "ws://" + window.location.hostname + ":8181";

const URL = "ws://10.129.6.66:5010";

export const socket = io(URL, {
    path: "/ws/socket.io",
    // path: "/api/ws/socket.io",
    autoConnect: false,
});


// Creating a hook that connects to the socket and updates the redux store
export const useSocket = () => {

    const {setSocketIOConnection} = useContext(SocketIOContext);

    // Listen for the "connect" event
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to the socket HERE");
            setSocketIOConnection(true);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from the socket HERE");
            setSocketIOConnection(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        }
    }, []);


    // Connect to the socket
    useEffect(() => {
        if (socket.connected) return;

        socket.connect();
        return () => {
            socket.disconnect();
        }
    }, []);


    return socket;
}