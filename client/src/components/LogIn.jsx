import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { errorNotification, successNotification } from '../utils/notification';
import {ToastContainer} from 'react-toastify'


export default function LogIn({data,closeModal, setShow, show}) {

    let navigate = useNavigate();


  const handleClose = () => {setShow(false); closeModal()};

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
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver:yupResolver(logInValidationSchema),
  });

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
      handleClose()
      if (data.role === "Admin") {
        navigate(`/app/admin`);
      } else {
        auth.setUserInfo(data.userInfo)
        navigate("/");
        window.location.reload(false)
      }
    } else {
      errorNotification(resp.data.message);
    }     
 }

 const signUpSubmit = () => {
    navigate('/app/signup')
 }
 


  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log-In for continue shopping</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow:"auto"}}>
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
      <span style={{fontSize:"12px",color:"gray",fontWeight:"500"}}>Forget your password? <span style={{color:"blue",cursor:"pointer"}}>Click here</span></span><br/>
      <span style={{fontSize:"12px",color:"gray",fontWeight:"500"}}>Don't have an account? <span onClick={signUpSubmit} style={{color:"blue",cursor:"pointer"}}>Click here</span></span><br/><br/>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}
