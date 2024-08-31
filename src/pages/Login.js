import React from 'react';
import "../styles/RegisterStyle.css";
import { Form ,Input,message} from 'antd'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from "../redux/features/alertSlice"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const onFinishHandler = async(values) => {
    
    try{
        dispatch(showLoading())
        const res= await axios.post('/api/v1/user/login',values)
        window.location.reload()
        dispatch(hideLoading())
         if(res.data.success){
          localStorage.setItem('token', res.data.token)
          message.success('login successful')
          navigate('/')
         }
         else{
          message.error('user not found')
         }
    }
    catch(error){
      dispatch(hideLoading()) 
      console.log(error)
      message.error('something went wrong')

    }
  }
  return (
    <>
    <div className="form-container" >
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login Form</h3>
       
        <Form.Item label="Email" name="email">
          <Input type="email" required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required/>
        </Form.Item>
        <Link to="/Register" className="m-3">Not a user Register here</Link>
        <button className="btn btn-primary" type="submit">Login</button>
      </Form>
    </div>


    </>
  );
};

export default Login