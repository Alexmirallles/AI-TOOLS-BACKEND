import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import 'antd/dist/antd'
import { LoadingOutlined } from '@ant-design/icons';
import {  Spin } from 'antd';

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
        setIsLoading(true)
      if (localStorage.getItem("token")) {
        setIsAuthenticated(true)

      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkUserAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" />;
  }


  return <Outlet />;
};

export default PrivateRoute;
