import React from 'react';
import { Button, Result } from 'antd';


const error = {
     "level": "error",
     "message": "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
     "timestamp": "2024-10-04T04:25:22.141Z" }

const App = () => (
    <Result
        title={error.level}
        subTitle={error.message}
        extra={<h2>{error.timestamp}</h2>}
    />
);
export default App;