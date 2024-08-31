import React from "react";
import "../styles/RegisterStyle.css";
import { Form ,Input,message} from "antd"
import {useDispatch} from "react-redux"
import{showLoading,hideLoading} from "../redux/features/alertSlice"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"



const Register = () => {
  const navigate=useNavigate()
     const dispatch= useDispatch()
//form handler
  const onFinishHandler = async (values) => {
  try{

    dispatch(showLoading())
    const res=await axios.post('/api/v1/user/register',values)
    dispatch(hideLoading())
    if(res.data.success){
      message.success('Register successfully')
      navigate('/login')
    }
    else{
     const errormessage= res.data.message || "Already Registered"
      message.error( errormessage)
    }
  }
  catch(error){
    dispatch(hideLoading()) 
    console.error(error)
    message.error('something went wrong')
  }
  }

  return (
    <>
    <div className="form-container" >
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required/>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required/>
        </Form.Item>
        <Link to="/Login" className="m-3">Already user login here</Link>
        <button className="btn btn-primary" type="submit">Register</button>
      </Form>
    </div>


    </>
   
  );
};

export default Register