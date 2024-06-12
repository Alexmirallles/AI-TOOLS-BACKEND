import React from 'react';
import { Button, Form, Input,Alert,message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { motion } from "framer-motion"
import { useAuth } from '../../../hooks/AuthProvider';

export const LoginForm = ()=> {
	

    const { loginAction,error,messagex,loading,success } = useAuth();




	const initialCredential = {
		email: 'versus@socials.com',
		password: 'password'
	}

	const onLogin = values => {
        loginAction(values)

        if (success){
            console.log("trueee")
            message.success('Logged In Succesfully',3)
        }
	};



	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: error ? 1 : 0,
					marginBottom: error ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={messagex}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form" 
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
						{ 
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>

                <Form.Item 
					name="password" 
					label={
						<div className={`{'d-flex justify-content-between w-100 align-items-center'}`}>
							<span>Password</span>
							
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
			
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};



export default LoginForm
