import React from 'react';
import { Flex, Tabs } from 'antd';
import {Link, useParams,Outlet} from 'react-router-dom';

import Dashboard from './PageContent/Dashboard';
import Jobscontent from './PageContent/Jobscontent';
import Professorcontent from './PageContent/Professorcontent';
import Studentcontent from './PageContent/Studentcontent'

const onChange = (key) => {
  console.log(key);
};
const items = [
    {
        key: '0',
        // label: 'Professor Details',
        children: <Dashboard/>,
        label: <Link to='/admin'>Dash Board</Link>
    
      },
  {
    key: '1',
    // label: 'Professor Details',
    children: <Professorcontent/>,
    label: <Link to='/admin/professor'>Professor Details</Link>

  },
  {
    key: '2',
    label: <Link to='/admin/student'>Student Details</Link>,
    children: <Studentcontent/>,
  },
  {
    key: '3',
    label: <Link to='/admin/jobs'>Job Details</Link>,
    children: <Jobscontent/>,
  },

];
const Job = () => <Tabs style = {{marginLeft:'30px'  }}defaultActiveKey="3" items={items} onChange={onChange} />;
export default Job;