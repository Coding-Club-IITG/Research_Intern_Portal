import React from 'react';
import { Button, Result } from 'antd';


const server = {
     "level": "error",
     "message": "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
     "timestamp": "2024-10-04T04:25:22.141Z" }

const App = () => (
    <Result
        title={server.level}
        subTitle={server.message}
        extra={<h2>{server.timestamp}</h2>}
    />
);
export default App;