import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Utils/ApiRoute';

export const Login = () => {
  const validate = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"), 
  });

  const Navigate = useNavigate();

  const SubmitHandler = async (data) => {
    try {
      let response = await axios.post(`${API}/api/users/signin`, data);
      console.log(response);
      
      if (response.data.status) {
        
        
        // Store token and username in local storage
        window.localStorage.setItem('token', response.data.user_token);
        window.localStorage.setItem('username',response.data.data.username);

        if (response.data.data.isAdmin){
          console.log(response.data.data.isAdmin);
          toast.success('Admin Logged In Successfully');
          Navigate('/admin-dashboard');
        } else if(!response.data.data.isAdmin){
          toast.success('Student Logged In Successfully');
          Navigate('/student-dashboard');
        }
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please check it");
    }
  };

  return (
    <>
      <div className='container-fluid main-form'>
      <div className='row justify-content-center'>
        <div className='col-sm-12 text-center'>
          <h1 className='text-white'>Student MarkList</h1>
        </div>
        <Formik 
          initialValues={{ email:'', password:''}}
          validationSchema={validate}
          onSubmit={(values) => {
            SubmitHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <div className='m-5'>
              <Form className='form-group'>
                <h2 className='text-center'>SIGN IN</h2>
                <label className='m-2'>Email</label>
                <Field name="email" type="email" className="input-value  ml-4" placeholder="Enter the Email" required />
                {errors.email && touched.email ? (<div className='error'>{errors.email}</div>) : null}

                <label className='m-2'>Password</label>
                <Field name="password" type="password" className="input-value  ml-4" placeholder="Enter the Password" required />
                {errors.password && touched.password ? (<div className='error'>{errors.password}</div>) : null}
                <div>
                 <p className='text-right'><a href="/forgot" className='error'>Forgot Password? </a></p>

                </div>
                
               

                <div className='text-center'>
                  <button type="submit" className='btn btn-success'>LOGIN</button>
                </div>
                <div>
                 <p className='m-2'>New User? <a href="/signup" className='success'>Register Here </a></p>
                </div>

                
              </Form>
             
            </div>
            
          )}
          
        </Formik>
        <div className='bg-success text-white user-credit text-center m-5'>
                <p>Admin and User Credetionals</p>
                <p><b> For Admin</b>:
                 <p>Email:admin@21gmail.com</p>
                 <p>Password:123456</p>
                
                </p> 
                <p><b> For Student </b>:
                 <p>Email:arun21@gmail.com</p>
                 <p>Password:123456</p>
                 
                
                </p> 
        </div>
        
        
      </div>
      
      
      
      </div>
      
    </>
   
  );
};
