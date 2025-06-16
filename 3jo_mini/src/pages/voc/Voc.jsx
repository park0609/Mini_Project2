import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommonTable from '../../table/CommonTable';
import CommonTableColumn from '../../table/CommonTableColumn';
import CommonTableRow from '../../table/CommonTableRow';

function GetData() {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:5176/Voc').then((response) => {
            setData(response.data);
        })
    }, []);

    const item = (Object.values(data)).map((item) => (
        <CommonTableRow key={item.id}>
            <CommonTableColumn>{item.id}</CommonTableColumn>
            <CommonTableColumn>{item.title}</CommonTableColumn>
            <CommonTableColumn>{item.createAt}</CommonTableColumn>
            <CommonTableColumn>{item.username}</CommonTableColumn>
        </CommonTableRow>
    ));

    return item;
}

function Voc() {
    const item = GetData();

    return (<>
        <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
            {item}
        </CommonTable>
    </>);
}

export default Voc;