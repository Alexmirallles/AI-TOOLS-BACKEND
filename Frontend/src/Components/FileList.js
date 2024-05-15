import React, { useState, useEffect } from 'react';
import { Card, Table, Tooltip, Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

export default function FileList() {
  const [Files,setFiles]=useState([])

  const [visible, setVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch data from your API here
    // Replace the following with your actual API endpoint
    
    fetch('https://aiapis.onrender.com/api/files/')
      .then((response) => response.json())
      .then((data) => {
        const refineddata = data.map(item => {
          // Extract the filename from the URL
          const filename = item.name.substring(item.name.lastIndexOf('/') + 1);
          return { ...item, name: filename };
        });
        setFiles(refineddata);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => (
        <div className="d-flex text-left w-[598px]">
          <span>{name}</span>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => (
        <div className="text-left">
          <span>{date} </span>
        </div>
      ),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Action',
      render: (_, elm) => (
        <div className="text-left">
          <Tooltip title="View">
            <Button
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => showFileProfile(elm)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              className="mr-6"
              icon={<DeleteOutlined />}
              onClick={() => deleteFile(elm.id)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const showFileProfile = (File) => {
    setSelectedFile(File);
    setVisible(true);
  };

  const deleteFile = (FileId) => {
    // Make an API call to delete the File with the given FileId
    // Replace the following with your actual API endpoint
    fetch(`https://aiapis.onrender.com/api/delete/${FileId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the Files state after successful deletion
        setFiles((prevFiles) => prevFiles.filter((File) => File.id !== FileId));
      })
      .catch((error) => console.error('Error deleting File:', error));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Card style={{ padding: '0px' }}>
        <div className="table-responsive">
          <Table
            style={{height:'50%' }}
            columns={tableColumns}
            dataSource={Files}
            rowKey="id"

          />
        </div>
      </Card>

      <Modal
        title="File"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedFile && (
          <div>
            <p>{selectedFile.name}</p>
      
            {/* Add other File details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
}
