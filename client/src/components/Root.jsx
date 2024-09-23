import React from 'react';
import {Link, useParams,Outlet} from 'react-router-dom';
import { HomeOutlined, UserOutlined, VideoCameraOutlined ,CheckSquareOutlined,SearchOutlined,CompassOutlined,DownOutlined,CheckCircleOutlined,BellOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Button } from "antd";
import Home from '../pages/Home/Home';

const { Header, Content, Footer, Sider } = Layout;
const items =  [
  {
    key: '1',
    icon: <HomeOutlined/>,
    label: 'Home',
    link: <Link to='/home'>Home</Link>
  },
  {
    key: '2',
    icon: <UserOutlined/>,
    label: 'Profile',
  },
  {
    key: '3',
    icon: <VideoCameraOutlined/>,
    label: 'Jobs',
  },
  {
    key: '4',
    icon: <CheckSquareOutlined/> ,
    label:'Applied',
  },
  {
    key: '5',
    icon: <CompassOutlined/>,
    label:'Discover',
  }
];

const Root= () => {
  const params=useParams();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>

        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items}>
        {(item) => (
            <Menu.Item key={item.key}>
              {item.link || item.label}
            </Menu.Item>
            )}
        </Menu>

      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign:'right'
          }}>

          <Button title='Search' size='medium' shape='circle' icon={<SearchOutlined/>} style={{margin:'3px'}}/>  
          
          <Button title='Notifications' size='medium' shape='circle' icon={<BellOutlined/>} style={{margin:'3px'}}/>  

        <div style={{
          display:'inline',
          borderRadius:'3px',
          border:'solid',
          borderColor:'grey',
          borderWidth:'1px',
          cursor:'hover',
          margin:'5px',
        }}>
          <CheckCircleOutlined style={{ margin: '5px' }}/>
          Open to offers
          <DownOutlined style={{ margin: '5px' }}/>
        </div>

        <Button type='dashed' size='medium' shape='round' icon={<><UserOutlined/> <DownOutlined/></>}/>

        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}>
          <Outlet/>
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default Root;