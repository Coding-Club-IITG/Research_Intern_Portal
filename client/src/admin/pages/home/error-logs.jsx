import React from 'react';
import { Table } from 'antd';
import {ConfigProvider} from 'antd';

const errors = [
    {
        level: "error",
        message: "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
        timestamp: "2024-10-04T04:25:22.141Z"
    },
    {
        level: "error",
        message: "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
        timestamp: "2024-10-04T04:25:22.141Z"
    },
    {
        level: "error",
        message: "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
        timestamp: "2024-10-04T04:25:22.141Z"   
    },
    {
        level: "error",
        message: "Updating student is not succesfull because student with 66f9462a6359af1dedb19b7c does not exisits in database",
        timestamp: "2024-10-04T04:25:22.141Z"
    }
]

const header = [
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
    {
        title: 'Timestamps',
        dataIndex: 'timestamps',
        key: 'timestamps',
    },
]

export default function ErrorLogPage() {
    return (
    <ConfigProvider theme={{token:{colorPrimary:`#1890ff`}}}>
     <Table columns={errors} dataSource={header} />
     </ConfigProvider>
)};