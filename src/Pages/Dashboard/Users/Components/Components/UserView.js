import React, { Component } from 'react';
import { Avatar, Drawer, Divider,Tag,Button,Tooltip } from 'antd';
import { 
	MobileOutlined, 
	MailOutlined, 
	UserOutlined, 
	CalendarOutlined,

	HeartOutlined,
	HistoryOutlined,
	VerifiedOutlined,
	EyeOutlined, DeleteOutlined , EditOutlined,CloseCircleOutlined
} from '@ant-design/icons';

export class UserView extends Component {
	render() {
		const { data, visible, close} = this.props;
		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				closable={false}
				open={visible}
			>
				<div className="text-center mt-3">
					<Avatar size={80} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAAvLy9xcXHi4uJhYWH7+/vx8fHc3NzCwsL09PTNzc3m5uY6OjrKysqHh4erq6sZGRlXV1fU1NSxsbG6urqlpaXr6+tcXFwdHR0ODg6QkJBGRkaDg4OcnJxra2t6enozMzOWlpYnJydCQkJQUFBU9OwrAAAFXUlEQVR4nO2cbVviOhCGCWKxFZD3IrACov//L54F5NimM2kSITNe+9wf17Sb52oyrwmdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANBGVmTSU7gj5Xj3aoxZf2yepadyF0afpsKb9HRuzqCm78RCekq3ZWnr+8tOelK35IEQaMykLz2vm0EL/CuxkJ7ZreivGYlD6ZkFUAwGjg8yYBSal3QzjCcbvUyvq+5xM6MHPXMSmfGKyB/tOT+Qk6aM6YlD6gkHMiZn/ZoTQ6fkUGOosWrIJ9zaOzw1BhfM0A+BiXuScT7gTNOELJiRPYG5e9HjPMAXw4Y7b8RtFzYSs/eANY7fDKxHGJeh1Cfm7QKNsTfjnh6mMnYb+QhsbDHG2DStkjxPfgKNscKcF3KQxjTKV6DZ1p+jd+JYRoSLRhjDs/F4Ul+6zzk2kvpWJPevPoUhAm1fQDlRdat0E6TQsiPUw9osTT9MoDG1p2fEAG3eIvATGjOvPU4M0FbKCBVo7cRmuK4tapsHK6yn8c3n36WkMHCJrIM/1ed7jT8ry564PNZJ7Q32H7fM/yRFkLe/UjOWW+uP2qoYf2IU1ly6lUJpszOdbozCWoPCKrppc4ZR29B0q6+or3NthpSvXbupvqIW1UylhLB45vY2ZeUVVXehzY52ovz9iWpTu/z+508xHTyRCkeVV3xH7iq7Mlz3oYWqz8u+/u2gsyfz9nOFl6Bmqy0pvEJ3YlqprtLOdPeWqyyRnrmBpVFOVFiqL3Bx0Mx9vPhFB72CizRnJtLTDoHtibrQ6NlZdjEK1YXXLqJc/qj9vXqIMjW/yNB0olLgR/cb+yO7WSzLe7hCZ4CWnXqKO00xTtkqqIFrkV739U5RULAKFciftSirC2KopuhG9VacMCuwHNt1xeOcHpmcwKp3reLdyYqiX/by5cMrNXato5XofUzhQr2z1NYgJ4/EJYc5FkOzrD3qEdd+KuhjZC3nvapY1TSvGoGC+k3AOi3rT/oF7q/yJRzvYoaV3HudFTshfzzDcysurceGvgrbIr0EeEm0v0RIxVy+J+UhsbHUgtJn+bPDrZliw7P16YN7HCsJVTXca+5IurU5GcowyHsN10FvNtxeHPwlKiizzuzg+YtHV1wy+vBVeEwmxMEzUZrat+V6I1+voaO5Ucx3lc113HvNauEX+OnpoPZni/FmM188+R9R87OrZfuL9DJg9rDCZRqNR3Qr7zB+RtlqcdJfFS736+Di5mDK5+1tuzF1AD44u/jA5O10fajL7qeWhmRahYNrCBNUEvvK6tk6mvuCWEqFRSWZWHk3Iorv6iqnsTioUJhZG8azIla3lkemB+VwG8kU5o2ltPLwxbNGADqln2IuJqZTWJIz2LcY1Sey/E/nHOxXTHP7knXMO4dVzbnvciTDcq5nlyJ/ylxF/DV5/T4bOUscVB2toC1qlxh6a3qttZXVe7XD2cvfW5tTW8IU0wdXE3xCj9u+ZyYf09VqOvQshk+ILUyVUhOccPCu4IZCbMZmAJfAzESeCPaBKHNY1maYoLQfecTLj2bftLd7+J+XZZIOVEjlLxgNv/jh/FGInyOf3Aa2esMRP0UTcUktDOn20l3NzAXhjxhx9ikU4SOLh/srlG0RZu0T/DmiV5wTbEPh+7F39xUnRE/WJlEoev4JCqEQCv8RhaK2NO76TyCygeld098LwtehEkTewjlw3G8LBCF9ySLyUrM/8mdI71ynkU7xT0T9jokve2l1Z/LjvfQdVVw6OPG8WR26N+aw2vyqC4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAM/8BF2JADp6XdlIAAAAASUVORK5CYII=" />
					<h3 className="mt-2 mb-0 ">{data?.alias}</h3>
					
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">ACCOUNT DETAILS</h6>
					<p className='mt-2'>
						<UserOutlined />
						<span className="ml-3 text-dark">id: {data?.id}</span>
					</p>

					<p className='mt-2'>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Registration Date:  {data?.registration_date}</span>
					</p>

					<p className='mt-2'>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Last Login Date: {data?.last_login}</span>
					</p>

					<p className='mt-2'>
					<HistoryOutlined />
					<span className="ml-3 text-dark">Total Log: {data?.total_log}</span>
					</p>

					<p className='flex gap-4 mt-2'>
						< HeartOutlined/>
						<span>Status:</span>
						{data?.active===1 ? (
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
							}
					
					</p>

					<p className='flex gap-4 mt-2'>
					<VerifiedOutlined />
					<span>Premium:</span>
						{data?.is_verified ===1? (
								<div className='text-left'>
									<Tag color="cyan"> 
									Yes
									</Tag>
								</div>
							) : (
									<Tag color="red"> 
									No
									</Tag>
							)
							}
					
					</p>


					
			
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.phone}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email? data?.email: '-'}</span>
					</p>

			
				
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">ACTIONS</h6>
					
					<div className='text-left gap-2'>

							
					<Tooltip title="Activity Log">
						<Button className="mr-2" icon={<EyeOutlined />}size="small"/>
					</Tooltip>

					<Tooltip title="Ban">
						<Button className="mr-2" icon={<CloseCircleOutlined />}  size="small"/>
					</Tooltip>


                    <Tooltip title="Edit">
						<Button className="mr-2" icon={<EditOutlined />}  size="small"/>
					</Tooltip>

					<Tooltip title="Delete">
						<Button  danger className='mr-6'  icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(data.id)}} size="small"/>
					</Tooltip>

				</div>
				</div>
			</Drawer>
		)
	}
}

export default UserView
