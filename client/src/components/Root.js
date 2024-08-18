import React from 'react';
import { HomeOutlined, UserOutlined, VideoCameraOutlined ,CheckSquareOutlined,SearchOutlined,CompassOutlined,DownOutlined,CheckCircleOutlined,BellOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const items =  [
  {
    key: '1',
    icon: <HomeOutlined/>,
    label: 'Home',
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
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign:'right'
          }}
        >

        <div style={{display:'inline',borderRadius:'9px',border: '2px solid blue',borderColor:'blue',}}>
            <SearchOutlined style={{ margin: '5px' }}/>
          </div>
          
        <div style={{
          display:'inline',
          borderRadius:'9px',
          borderColor:'blue',
          }}>
        <div style={{
          display:'inline',
          borderRadius:'9px',
          borderColor:'blue',
          }}>
          <BellOutlined style={{ margin: '5px' }}/>
        </div>
          <CheckCircleOutlined style={{ margin: '5px' }}/>
          Open to offers
          <DownOutlined style={{ margin: '5px' }}/>
        </div>

        <UserOutlined style={{ margin: '5px' }}/>
        <DownOutlined style={{ margin: '5px' }}/>
 
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Root;