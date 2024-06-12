import React, { useState } from 'react';
import { Layout, Menu} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import {
 

  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  NotificationOutlined ,
  TransactionOutlined
} from '@ant-design/icons';
import { message } from 'antd';

const { Content, Sider } = Layout;



const iconNames = [
    'Users',
    'Contents',
    'Groups',
    'Marketplace',
    'Transactions'

];

const routePaths = [
    '/admin/dashboard',
    '/admin/contents',
    '/admin/groups',
    '/admin/marketplaces',
    '/admin/transactions',
];

const items = iconNames.map((name, index) => ({
  key: String(index + 1),
  icon: React.createElement([
    UserOutlined,
    NotificationOutlined,
    TeamOutlined,
    ShopOutlined ,
    TransactionOutlined,
  ][index]),
  label: name,
  path: routePaths[index],
}));

const CustomLayout = ({ children }) => {
  const [collapsed] = useState(true);
  const navigate = useNavigate();



  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (key) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

 


  

  const handleLogout = () => {
    localStorage.clear();
    message.error({ content: 'Successfully Logged out', duration: 4 });
    setTimeout(() => {
        navigate('/admin/auth/login');
    }, 3000);
};

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}  collapsed={true}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: 'black',

        }}
        breakpoint='md'
      >
        <Menu
      theme='transparent'
      style={{ color: 'white', fontSize: 15 ,marginTop:'90px'}}
      mode="inline"
      defaultSelectedKeys={['1']}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          style={{ backgroundColor: hoveredItem === item.key ? '#0F5CA2' : 'transparent' }}
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
        >
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <>
            
            </>

          )}
        </Menu.Item>
      ))}
          

    </Menu>
    <div className="logoutbtn flex gap-3" onClick={handleLogout}>
      <LogoutOutlined style={{ display: collapsed ? 'block' : 'block' }}/>
      <h2 className={`mb-0 ${collapsed ? 'hidden' : ''}`}>Logout</h2>    
    </div>
    
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
  
        <Content style={{  backgroundColor: 'white', overflow: 'initial' }}>
          <div className="site-layout-background" style={{  backgroundColor: 'white' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
