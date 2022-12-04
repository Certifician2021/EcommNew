import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { errorNotification, successNotification } from '../utils/notification';
import {ToastContainer} from 'react-toastify'


function SignUp() {
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
          .required('Full Name is required')
          .min(6, 'Fullname must be at least 6 characters')
          .max(20, 'Fullname must not exceed 20 characters'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        mobileNo:Yup.string().required('No. is required')
           .min(10, 'Mobile No. must have 10 digits')
           .max(12, 'Mobile No. must be 10 digits'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      });

      const logInValidationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters')
      });

      const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
      } = useForm({
        resolver:yupResolver(logInValidationSchema),
      });

      const onSubmit = async data => {
        const resp = await axios.post('/api/users',{
            fullName:data.fullName,
            username:data.email,
            password:data.password,
            mobileNo:data.mobileNo
        })
        console.log(resp)
        if(resp.data.success){
            successNotification("Successfully Registered!! Please try logging In",{autoClose:2000})
        }else{
            console.log("hello")
            errorNotification("Something went wrong",{autoClose:2000})
        }
      };

      const onLogInSubmit = async(data) => {
        let resp = await axios.post(`/api/login`, {
            username:data.email,
            password:data.password
        });

        console.log(resp)
    
        if (resp.data.success == true) {
          let data = resp.data;
          auth.setToken(data.accessToken);
          auth.setRole(data.role);
          auth.LoggedIn(true)
          successNotification("Successfully Logged In")
          if (data.role === "Admin") {
            navigate(`/app/admin`);
          } else {
            auth.setUserInfo(data.userInfo)
            navigate("/");
          }
        } else {
          errorNotification(resp.data.message);
        }     
     }

  return (
    <div style={{display:"flex",padding:"20px"}}>
    <Form key={1} onSubmit={handleSubmit2(onLogInSubmit)} className="w-50" style={{margin:"10px"}}>
        <h2>Log In</h2>
      <Form.Group className="mb-3" controlId="formBasicLogInEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register2("email")} name="email" type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <p style={{color:"red"}}>{errors2.email?.message}</p>

      <Form.Group  className="mb-3" controlId="formBasicLogInPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register2("password")} name="password" type="password" placeholder="Password" />
      </Form.Group>
      <p style={{color:"red"}}>{errors2.password?.message}</p>
      <span>Forget your password? <span style={{color:"blue",cursor:"pointer"}}>Click here</span></span><br/><br/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>


    <Form key={2} onSubmit={handleSubmit(onSubmit)} className="w-50"  style={{margin:"10px"}}>
        <h2>
           Registration
        </h2>
        <span style={{fontSize:"18px",fontWeight:"650",color:"gray"}}>Create a new account now</span>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control {...register("fullName")} name="fullName" type="text" placeholder="Enter name" />
      </Form.Group>
      <p style={{color:"red"}}>{errors.fullName?.message}</p>

      <Form.Group className="mb-3" controlId="formBasicRegisterEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control {...register("email")} name="email" type="text" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <p style={{color:"red"}}>{errors.email?.message}</p>

      <Form.Group  name="no" className="mb-3" controlId="formBasicNo">
        <Form.Label>Mobile No.</Form.Label>
        <Form.Control {...register("mobileNo")} type="number" placeholder="Enter number" />
      </Form.Group>
      <p style={{color:"red"}}>{errors.mobileNo?.message}</p>

      <Form.Group name="password" className="mb-3" controlId="formBasicRegisterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password")} type="password" placeholder="Password" />
      </Form.Group>
      <p style={{color:"red"}}>{errors.password?.message}</p>

      <Form.Group name="confirmPassword" className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
      </Form.Group>
      <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>
      <small style={{fontWeight:"800"}}>Already have an account?<span style={{color:"blue"}}> Log In</span> </small><br/><br/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <ToastContainer />
    </div>
    
  )
}

export default SignUp