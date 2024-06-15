import React, { useEffect, useState } from 'react';
import { Table,Card } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  // Add more columns as needed
];

const ArticlesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    try {
      const response = await axios.get(`https://dev.avatarsocialapi.com/Api/admin/articles?_start=${start}&_end=${end}&_sort=id&_order=asc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace 'YOUR_ACCESS_TOKEN' with your actual token
        },
      });
      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: parseInt(response.headers['x-total-count'], 10), // Assuming the API returns the total count in this header
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  return (
    <div className='flex justify-center items-center'>
    <Card   >
      <div className="table-responsive p-0">
        <Table 
         columns={columns}
         dataSource={data}
         rowKey="id"
         loading={loading}
         pagination={pagination}
         onChange={handleTableChange}
        />
      </div>
        {/* <UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/> */}
    </Card>
  </div>

  
  );
};

export default ArticlesTable;
