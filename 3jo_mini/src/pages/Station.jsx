import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetData() {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/toyseven/stations').then((response) => {
            setData(response.data);
        })
    }, []);

    const item = (Object.values(data)).map((item) => (
        <li key={item.stationId}>
            {item.stationName}
        </li>
    ));

    return item;
}

function Station() {
    const item = GetData();
    return (<div><ul>
        {item}</ul></div>);
}

export default Station;