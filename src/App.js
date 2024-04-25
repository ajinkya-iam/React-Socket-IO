import { useContext, useEffect, useState } from 'react';
import { socket, useSocket } from './socketIO/Socket';
import { SocketIOContext } from './socketIO/SocketIOContext';

function App() {

    const [status, setStatus] = useState(null);
    const [sendmsg, setSendMsg] = useState(null);
    const [msg, setMsg] = useState(null);
    const [epcData, setEpcData] = useState([]);
    const { socketIOConnection, setSocketIOConnection } = useContext(SocketIOContext);
    const [currentCount, setCurrentCount] = useState(0);

    const sc = useSocket();

    const sendMsg = () => {
        console.log("Send message : " + sendmsg);
        socket.emit("redis", sendmsg ? sendmsg : "Hello Word");
    }

    useEffect(() => {

        socket.on("redis_data", (data) => {

            console.log(data);

            setStatus(data?.msg.type)

            const receivedData = data?.msg?.data?.epcs

            if (receivedData.type === "SCAN_DATA") {
                renderData(receivedData)
            }

        })

        return () => {
            socket.off("redis_data");
        };
    }, [])

    const renderData = (data) => {
        data.map((item) => (
            setEpcData(prev => [
                ...prev,
                {
                    epc: item.epc,
                    count: 1
                }
            ])
        ))
    }

    useEffect(() => {
        setCurrentCount(epcData.length)
    }, [epcData])

    const onCreateSession = () => {

    }

    const onStartScanning = () => {

    }

    const onPauseScanning = () => {

    }

    const onStopScanning = () => {

    }

    const columns = [
        {
            title: "EPC",
            dataIndex: "epc",
            key: "epc",
            width: '20%'
        },
        {
            title: "Count",
            dataIndex: "count",
            key: "count",
            width: '20%'
        },
    ]

    return (
        <div className='p-10'>

            <div className='flex justify-between'>
                <h1 className='text-xl underline'>Socket IO</h1>
                <h6>{status}</h6>
                <h6>Socket Status : <span className='underline'>{socketIOConnection ? "Connected" : "Disconnected"}</span></h6>
            </div>


            <div className='flex justify-around mt-12'>
                <button className='ml-3 bg-slate-600 p-2 text-white rounded-md hover:bg-slate-400' onClick={() => onCreateSession()}>Create Session</button>
                <button className='ml-3 bg-green-600 p-2 text-white rounded-md hover:bg-green-400' onClick={() => onStartScanning()}>Start Scanning</button>
                <button className='ml-3 bg-gray-400 p-2 text-white rounded-md hover:bg-gray-200' onClick={() => onPauseScanning()}>Pause Scanning</button>
                <button className='ml-3 bg-red-600 p-2 text-white rounded-md hover:bg-red-400' onClick={() => onStopScanning()}>Stop Scanning</button>
            </div>

            <div className='mt-4 text-center'>
                <input className='border p-2 mt-4' type="text" onChange={(e) => setSendMsg(e.target.value)} placeholder='Send a message' />
                <button className='ml-3 bg-red-600 p-2 text-white rounded-md hover:bg-red-400' onClick={() => sendMsg()}>Send Msg</button>
            </div>

            <h6 className='text-[200px] text-center'>{currentCount}</h6>

        </div>
    );
}

export default App;
