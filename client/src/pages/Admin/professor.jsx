import React from 'react';
import { Flex, Tabs } from 'antd';
import { Link, useParams, Outlet } from 'react-router-dom';

const onChange = (key) => {
    console.log(key);
};

const ProfDetails = () => {
    return (
        <h1>lnasjncl</h1>
    )
}
const items = [
    {
        key: '0',
        children: 'dashhhh',
        label: <Link to='/admin'>Dash Board</Link>

    },
    {
        key: '1',
        children: <ProfDetails></ProfDetails>,
        label: <Link to='/admin/professor'>Professor Details</Link>

    },
    {
        key: '2',
        label: <Link to='/admin/student'>Student Details</Link>,
        children: 'student',
    },
    {
        key: '3',
        label: <Link to='/admin/jobs'>Job Details</Link>,
        children: 'jobs',
    },
];
const Prof = () => <Tabs style={{ marginLeft: '30px' }} defaultActiveKey="1" items={items} onChange={onChange} />;
export default Prof;


