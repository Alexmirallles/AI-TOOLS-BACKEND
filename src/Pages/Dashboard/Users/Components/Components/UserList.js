


import React, { Component } from 'react';
import { Card, Table, Tag, Tooltip, message, Button} from 'antd';
import { EyeOutlined, DeleteOutlined,  EditOutlined,CloseCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import config from '../../../../../config';
import UserView from './UserView';
// import CustomLayout from '../../layouts/Customlayout';







export class UserList extends Component {
  state = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
  };

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.user_id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };



  componentDidMount() {
    this.loadUserData();
  }



  loadUserData = async () => {

    const token=localStorage.getItem('token')
    try {


      const Chatlogs_fetch = await  fetch(`${config.apiUrl}/users`, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const chatlogs = await Chatlogs_fetch.json();

      // Assuming 'users' is the property you want to set in your state
      this.setState({
        users: chatlogs,
	
      });

     
      


    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };





  render() {
    const { users, userProfileVisible, selectedUser } = this.state;
    

    const tableColumns = [
		{
			title: 'User ID',
			dataIndex: 'id',
			render:  id => (
				<div className="d-flex text-left">
					<span>{id}</span>
				</div>
			)
			
		},

        {
			title: 'Username',
			dataIndex: 'alias',
			render:  alias => (
				<div className="d-flex text-left">
					<span>{alias}</span>
				</div>
			)
			
		},

		{
			title: 'Registration Date',
			dataIndex: 'registration_date',
			render: registration_date => (
				<div className='text-left'>
					<span >{registration_date} </span>	
				</div>
				),
			sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
		},

        {
			title: 'Last Login',
			dataIndex: 'last_login',
			render: last_login => (
				<div className='text-left'>
					<span >{last_login} </span>	
				</div>
				),
			sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
		},
        {
			title: 'Status (Active/Banned)',
			dataIndex: 'active',
			render: active => (
                active===1 ? (
                    <div className='text-left'>
                         <Tag color="cyan"> 
                         Active
                        </Tag>
                    </div>
                  ) : (
                        <Tag color="red"> 
                        Banned
                        </Tag>
                  )
				),
		
		},
		{
            title: 'Premium Member Yes/No',
            dataIndex: 'is_verified',
            render: is_verified => (
              is_verified===1 ? (
                <div className='text-left'>
                    <Tag color="cyan"> 
                            Yes
                    </Tag>
                </div>
              ) : (
                
                <Tag color="magenta"> 
                    No
                </Tag>
      
              )
            ),
          }
,          
        {
			title: 'Total Log',
			dataIndex: 'total_log',
			render:  total_log => (
				<div className="d-flex text-left">
					<span>{total_log}</span>
				</div>
			)
			
		},

		{
			title: 'Action',
	
			render: (_, elm) => (
				<div className='text-left gap-1 w-40'>
                                        
					<Tooltip title="Ban">
						<Button className="mr-2" icon={<CloseCircleOutlined />}  size="small"/>
					</Tooltip>

					<Tooltip title="View">
						<Button className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
					</Tooltip>

                    <Tooltip title="Edit">
						<Button className="mr-2" icon={<EditOutlined />}  size="small"/>
					</Tooltip>

					<Tooltip title="Delete">
						<Button  danger className='mr-6'  icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
					</Tooltip>

				</div>
			)
		}
	];
   

    return (
     

          <Card  className='h-screen' >
            <div className="table-responsive p-0">
              <Table columns={tableColumns} dataSource={users} rowKey="id" />
            </div>
			        <UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
          </Card>
     
    );
  }
}

export default UserList;
